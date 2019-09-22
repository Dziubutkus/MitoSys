pragma solidity ^0.5.0;
//pragma experimental ABIEncoderV2;

import 'openzeppelin-solidity/contracts/token/ERC20/IERC20.sol';
import "./ERC721.sol";
import "./IRToken.sol";
import "./dai.sol";

contract Mitosys is ERC721 {

	//these are both on rinkeby
	// ERC20 DAI = IERC20(0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa);
	IRToken RToken = IRToken(0x4f3E18CEAbe50E64B37142c9655b3baB44eFF578);
	dai DAI;

	uint256 newTokenIndex = 0;
	mapping (address => uint256) internalDaiBalance;
	mapping (address => uint256) IDfromOwner;
	mapping (uint256 => address) ownerByID;
	//mapping (address => mapping(uint256 => uint256)) NFTCost;
	uint256 NFT_price;

	//set the index to 0 and ensure that its 0
	//set price
	constructor(uint256 _price, address _dai) public
	{
		newTokenIndex = 0;
		NFT_price = _price;
		DAI = dai(_dai);
	}


	//make an NFT, returns the index determined for that NFT
	function forge_NFT() public returns(uint256)
	{
		//require that allowance for Dai is enough
		require(DAI.totalSupply() > 0, "No DAI supply");
		require(DAI.allowance(msg.sender, address(this)) > 0, "No DAI allowance");
		require(DAI.allowance(msg.sender, address(this)) >= NFT_price, "DAI allowance not enough");
		//allow the Rtoken contract to move NFT_price amount of DAI
		//should not fail since we know that we have the allowance to do so
		//needed for calls to "mint"
		// DAI.approve(address(RToken), NFT_price);

		//call "mint" in the Rtoken contract, creating Rtokens for this contract
		// RToken.mint(NFT_price);

		//the user's internal balance is updated to reflect this
		//internalDaiBalance[msg.sender] += NFT_price;

		//an NFT is minted and sent to the user
		//ERC721._mint(msg.sender, newTokenIndex);

		//increment newTokenIndex
		//newTokenIndex++;

		//return
		return newTokenIndex;

	}

	//redeem an NFT
	function melt_NFT(uint256 NFT_ID) public
	{
		//verify that the price of the token is less than or equal to user balance
		require(internalDaiBalance[msg.sender] >= NFT_price);

		//verify that the user burning it owns the tokens
		require(ownerByID[NFT_ID] == msg.sender);

		//attempts to burn tokens. Reverts if token doesn't exist
		_burn(NFT_ID);

		//subtract cost from balance
		//shouldnt rollover since it's been checked to be greater than the NFT_price
		internalDaiBalance[msg.sender] -= NFT_price;

		//send this balance to the user
		sendPrincipal(NFT_price, msg.sender);
	}


	//internal function that redeems the rtokens
	function sendPrincipal(uint256 amount, address dest) internal
	{
		//call redeem in the rtoken contract
		//RToken.redeem(amount);

		//send that DAI
		DAI.transfer(dest, amount);
	}

}
