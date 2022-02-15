# A website to mint NFT's and deploy them to the Ethereum blockchain.

### https://rinkeby.etherscan.io/address/0x288F97db56cE6218454d69294E01C23c8bc6C684#code

### Commands

`npx hardhat verify YOUR_CONTRACT_ADDRESS --network rinkeby`
`npx hardhat run scripts/deploy.js --network rinkeby`
`npx hardhat run scripts/run.js`

### Requirements

1. HardHat
2. Ethers
3. Alchemy
4. Metamask
5. Rinkeby Test Network

Let's say you want to change your contract. You'd need to do 3 things:

- We need to deploy it again.
- We need to update the contract address on our frontend.
- We need to update the abi file on our frontend.

Because smart contracts are immutable. Redeploying will reset all states and variables, and will be treated as a brand new contract. We'd lose all of our NFT data if we redeploy.

#### Remember after deploying, it takes time for opensea or rarible to update metadata.
