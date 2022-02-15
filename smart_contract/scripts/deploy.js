// Fake ETH on test networks, however these are run by real miners, so it mimics the real world.
// We need to use our private key, because deploying a contract is a transaction, and we need to login to the blockchain, to sign and deploy the contract. Username is public key, password is private key.

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

// Sample json objec as tokenURI.
// const data = {
//   name: "Chirag Rao",
//   description: "Please visit my personal portfolio website",
//   image:
//     "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj4KICAgIDxzdHlsZT4uYmFzZSB7IGZpbGw6IHdoaXRlOyBmb250LWZhbWlseTogTGF0bzsgZm9udC1zaXplOiAyMHB4OyB9PC9zdHlsZT4KICAgIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNGRjc2NzYiIC8+CiAgICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgY2xhc3M9ImJhc2UiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPmh0dHBzOi8vd3d3LmNoaXJhZ3Jhby5uZXRsaWZ5LmFwcDwvdGV4dD4KPC9zdmc+",
// };
