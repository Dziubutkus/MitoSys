const { BN, constants, time, shouldFail } = require('openzeppelin-test-helpers');

const dai = artifacts.require('dai');
const MitoSys = artifacts.require('Mitosys.sol');
const RToken = artifacts.require('RToken.sol');
const AllocationStrategy = artifacts.require('IAllocationStrategy.sol');

const allocationStrategyAddress = "0x152b48c07322d56EcdeAdDF780a2c09b57b11F07";

const BigNumber = web3.BigNumber;

require('chai').use(require('chai-bignumber')(BigNumber)).should();

contract('dai', accounts => {
    const owner = accounts[0];
    const Alice = accounts[1];
    const Bob = accounts[2];
    const _name = 'dai stable coin';
    const _symbol = 'dai';
    const _decimals = 3;

    const NFTPrice = 1;

    const metadata = "metadata";

    before(async function () {
        this.FT = await dai.new(_name, _symbol, _decimals);
        this.NFT = await MitoSys.new(NFTPrice, this.FT.address);
        this.allocationStrategy = await AllocationStrategy.new(allocationStrategyAddress);
        this.rtoken = await RToken.new(this.allocationStrategy.address);
    });

    describe('FT attributes', function() {
        it('has the correct name', async function() {
            const name = await this.FT.name();
            name.should.equal(_name);
        });

        it('has the correct symbol', async function() {
            const symbol = await this.FT.symbol();
            symbol.should.equal(_symbol);
        });

        it("should mint 1000 dai coins", async function() {
           await this.FT.mint(owner, 100000);
           var supply = (await this.FT.totalSupply()).toNumber();
           supply.should.equal(100000);
        });

        it("should transfer to \"players\"", async function() {
            await this.FT.transfer(Alice, 15000);
            await this.FT.transfer(Bob, 15000);
            var balanceAlice = (await this.FT.balanceOf(Alice)).toNumber();
            var balanceBob = (await this.FT.balanceOf(Bob)).toNumber();
            balanceAlice.should.equal(15000);
            balanceBob.should.equal(15000);
         });

         it("should burn 100 dai coins", async function() {
            this.FT.burn(100);
            var supply = (await this.FT.totalSupply()).toNumber();
            supply.should.equal(99900);
         });

         it("should forge NFT", async function() {
            await this.FT.approve(this.NFT.address, 1200, {from: Alice});
            let allow = await this.FT.allowance(Alice, this.NFT.address);
            console.warn(allow.toString())
            console.log(await this.FT.allowance(Alice, this.NFT.address) >= NFTPrice);
            console.log(await this.NFT.forge_NFT({from: Alice}));
            // var supply = (await this.FT.totalSupply()).toNumber();
            // supply.should.equal(900);
         });

    })
})
