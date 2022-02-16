# A website to mint NFT's and deploy them to the Ethereum blockchain.

## Website - https://splash-nft-collection.netlify.app/

#### Verified Smart Contract - https://rinkeby.etherscan.io/address/0x288F97db56cE6218454d69294E01C23c8bc6C684#code

### Commands

- `npx hardhat verify YOUR_CONTRACT_ADDRESS --network rinkeby`
- `npx hardhat run scripts/deploy.js --network rinkeby`
- `npx hardhat run scripts/run.js`

## IMPPPP - Make sure you connect ONLY a RINKEBY Metamask account, OR ELSE it WON'T WORK!

### Please use only Chrome or Firefox with the respective Metamask extension. Also if you are using brave, you need to set up a brave wallet, so things may not work 100%, but it should still work fine.

## Steps to ensure perfect Working:

1. Check out the deployed website in Google Chrome preferably, with the metamask extension installed.
2. Make sure you create an **RINKEBY** test account, and add some etherum to it, using some [faucet](https://faucet.rinkeby.io/) or [here](https://www.rinkebyfaucet.com/).
3. Click on Connect Wallet and connect the metamask wallet with the website.
4. Click on the button to mint NFT's and wait for about a minute.
5. After minting, you get an alert with a link to my OpenSEA collection, where the NFT has been minted.
6. You also get the link to the rinkeby test etherscan website, where this transaction is displayed.
7. Check out the console as well, for additional messages. (If you are a developer).

### Requirements

1. HardHat
2. Ethers
3. Alchemy
4. Metamask
5. OpenZeppelin
6. Rinkeby Test Network
7. Vite (React)
8. EtherScan API - For verifying the smart contract an converting form bytecode to the real Smart contract code.

**Also its recommended to use Google Chrome with the metamask extension installed**
Let's say you want to change your contract. You'd need to do 3 things:

- We need to deploy it again.
- We need to update the contract address on our frontend.
- We need to update the abi file on our frontend.

Because smart contracts are immutable. Redeploying will reset all states and variables, and will be treated as a brand new contract. We'd lose all of our NFT data if we redeploy. Learn more about smart contracts, EVM and bytecode - [https://ethervm.io/](https://ethervm.io/)

#### Remember after deploying, it takes time for opensea or rarible to update metadata. If it still doesn't work or show up after 24 hours, please use Rarible. It is like OpenSEA, but is known to update its metadata faster.

#### https://rinkeby.rarible.com/token/0x288F97db56cE6218454d69294E01C23c8bc6C684:INSERT_TOKEN_ID_HERE
