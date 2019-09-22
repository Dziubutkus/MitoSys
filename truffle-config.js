const HDWalletProvider = require('truffle-hdwallet-provider');
// const infuraKey = "fj4jll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */


  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },

    kovan: {
          provider: () => new HDWalletProvider("oblige hungry basic innocent adapt approve bridge potato odor vocal device water", "https://kovan.infura.io/v3/ee1048fe2d44430bab40a1d0374ce6d2"),
          network_id: "42",
          skipDryRun: true
      },
      rinkeby: {
          provider: () => new HDWalletProvider("oblige hungry basic innocent adapt approve bridge potato odor vocal device water", "https://rinkeby.infura.io/v3/ee1048fe2d44430bab40a1d0374ce6d2"),
          network_id: "4",
          skipDryRun: true
      },
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
    }
  },

   plugins: ['oneclick']
}
