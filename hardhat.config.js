require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

// https://app.buildspace.so/projects/CO961ddb5f-f428-4608-9949-a9a2f461eb3f/lessons/LE8ed42760-6bec-415a-b2bc-4987858c99ad
// Verify hardhat etherscan to verify the smart contract on etherscan and convert from non-readable byte code to actual reliable smart contract information.

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

// We use alchemy to deploy the smart contract to the rinkeby test network, and use hardhat to deploy the smart contract to the local test network and run the smart contract.

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.1",
  etherscan: {
    apiKey: process.env.ETHERS_KEY,
  },
  networks: {
    rinkeby: {
      url: process.env.STAGING_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
