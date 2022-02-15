const hre = require("hardhat");

// https://app.buildspace.so/projects/CO961ddb5f-f428-4608-9949-a9a2f461eb3f/lessons/LE93061a38-b953-44b2-b22c-3112447e68fa

// Hardhat is to create a virtual block chain, and deploy the contract. OpenZeppelin is a library to create smart contracts. Alchemy is a tool which helps broadcastout contract creation, so it can be picked up by miners. Once it is mined, it can be brodcasted to the blockchain.

// So, when we want to perform an action that changes the blockchain we call it a transaction. For example, sending someone ETH is a transaction because we're changing account balances. Doing something that updates a variable in our contract is also considered a transaction because we're changing data. Minting an NFT is a transaction because we're saving data on the contract.

async function main() {
  // Like a blueprint/class.
  const CollectionFactory = await hre.ethers.getContractFactory("Collection");
  // Creates a local fresh blockchain specifically for this contract, easier to debug. Object of the factory
  const collection = await CollectionFactory.deploy();

  // Wait till the contract is deployed on the blockchain, using fake miners.
  await collection.deployed();

  console.log("Collection deployed to:", collection.address);

  // Call the function to mint the NFT
  let transaction = await collection.makeNFT();
  await transaction.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
