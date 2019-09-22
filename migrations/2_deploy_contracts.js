const Mitosys = artifacts.require("Mitosys");

const NFTPrice = 100;

module.exports = function(deployer) {
  deployer.deploy(Mitosys, NFTPrice);
};
