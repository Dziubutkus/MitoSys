const Mitosys = artifacts.require("Mitosys");
const dai = artifacts.require("dai");

const NFTPrice = 1;

const name = 'dai stable coin';
const symbol = 'dai';
const decimals = 3;

module.exports = function(deployer) {
  deployer.deploy(Mitosys, NFTPrice);
  deployer.deploy(dai, name, symbol, decimals);
};
