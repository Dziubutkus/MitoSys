const Mitosys = artifacts.require("Mitosys");
const dai = artifacts.require("dai");

const NFTPrice = 1;

const name = 'dai stable coin';
const symbol = 'dai';
const decimals = 3;

module.exports = function(deployer) {
  deployer.deploy(dai, name, symbol, decimals).then(function () {
    return deployer.deploy(Mitosys, NFTPrice, dai.address)});
};
