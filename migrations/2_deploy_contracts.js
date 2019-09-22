const Mitosys = artifacts.require("Mitosys");
const Dai = artifacts.require("dai");
const RToken = artifacts.require("RToken");

const NFTPrice = 1;

const name = 'dai stable coin';
const symbol = 'dai';
const decimals = 3;
const allocationStrategy = "0x152b48c07322d56EcdeAdDF780a2c09b57b11F07";

let RTokenContract;
module.exports = function(deployer) {
  deployer.then(function () {
    return RToken.new(allocationStrategy);
  }).then(function (instance) {
    RTokenContract = instance;
    deployer.deploy(Dai, name, symbol, decimals).then(function () {
      return deployer.deploy(Mitosys, NFTPrice, Dai.address, RTokenContract.address)}).then(function(instance) {
        return instance.mint("0x6B00BCeA93BB4f1624818879D8b096577099cdD3", 100, {from: "0x93A74Cdc15bEEC23fc9208F61e58E215a947D48c"})
    });
  })

};

