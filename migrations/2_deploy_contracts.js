const Mitosys = artifacts.require("Mitosys");

const NFTPrice = 1;

module.exports = function(deployer) {
  deployer.deploy(Mitosys, NFTPrice);
};
