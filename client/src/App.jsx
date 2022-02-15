import React, { useEffect, useState } from "react";
import "./styles/App.css";
// ethers allows the front-end to talk to the contract, metamask connects the smart contract to the website and provides wallet credentials, ethers connects the front-end and the smart contract.
import { ethers } from "ethers";
import collection from "./utils/Collection.json";

// Loader animation
import { Oval } from "react-loader-spinner";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = "https://testnets.opensea.io/collection/mynft-xvorejpked";
const CONTRACT_ADDRESS = "0x288F97db56cE6218454d69294E01C23c8bc6C684";

const App = () => {
  // States
  const [currentAccount, setCurrentAccount] = useState("");
  const [loading, setLoading] = useState(false);

  /////////////////// FUNCTIONS /////////////////////////
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    // Makes sure that metmask is installed. It may or may not have wallet credentials in it.
    if (!ethereum) {
      alert("Please connect to Metamask");
      return;
    } else {
      console.log("Connected to Metamask");
    }
    // Metamask doesn't give wallet credentials to every website, unless it requests it.
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length != 0) {
      const account = accounts[0];
      console.log("Found authorized account: ", account);
      setCurrentAccount(account);
      // When a use enters the website, and already has their account connected and authorized.
      setupEventListener();
    } else {
      console.log("No authorized account found.");
    }
  };

  // Makes metamask provide the wallet credentials to the website, so that the website can make calls to the smart contract on behalf of the user.
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Install and setup metamask first!");
        return;
      }

      // This is request accounts, the one for checkin gif the wallet is connected is just eth_accounts. req_accounts is used when a user logs in for the first time.

      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected the chain", chainId);

      // The chainid of rinkeby is 0x4 and ropsten is 0x3.
      const rinkebyChainId = "0x4";

      //  The request conforms to EIP-695 so it returns the hex value of the network as a string.
      if (chainId !== rinkebyChainId) {
        alert(
          "You are not connected to the Rinkeby Test Network! Things may not work. To fix, create a new account on metamask to use rinkeby test network."
        );
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      // When a user enters the website, and connects the wallet for the first time.
      setupEventListener();
    } catch (err) {
      console.log(err);
    }
  };

  ////////////////////////////// EVENT LISTENER ///////////////////////////////
  const setupEventListener = () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          collection.abi,
          signer
        );
        // We repeat the above steps, coz we need access to the Collection smart contract.

        // Also, the following lines capture the event.
        connectedContract.on("NFTMintedEvent", (from, tokenId) => {
          console.log(from, tokenId.toNumber());
          alert(
            `NFT Successfully Minted!!. It may be blank right now. It can take a max of 10 min to show up on OpenSea as it has to update the metadata. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          );
          console.log(
            `https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          );
        });
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const askContractToMintNFT = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        setLoading(true);
        // Web3 provider, given by ethers. Provider is used to talk to Ethereum nodes. Remember how we were using Alchemy to deploy? Well in this case we use nodes that Metamask provides in the background to send/receive data from our deployed contract.
        const provider = new ethers.providers.Web3Provider(ethereum);
        // The signer is for signing transactions, a way to send ether and pay(as gas).
        const signer = provider.getSigner();

        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          collection.abi,
          signer
        );

        console.log(
          "Minting an NFT takes gas, so make sure you have enough ether/ gwei in your test account"
        );
        let nftTxn = await connectedContract.makeNFT();

        console.log("Mining and minting...please wait.");
        await nftTxn.wait();

        console.log(
          `Mined, verify transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
        setLoading(false);
      } else {
        alert("Metamask is not installed, please do it.");
        return;
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  /////////////////////////////////  RENDER METHODS  ////////////////////////////////////
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const mintNFTBtn = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={askContractToMintNFT}
    >
      Mint NFT
    </button>
  );

  const loader = () => <Oval color="#35aee2" height={80} width={80} />;

  ////////////////////////////// JSX RETURNED ///////////////////////////////////////
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Splash NFT</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {currentAccount === "" ? renderNotConnectedContainer() : mintNFTBtn()}
          <div className="loading-frame">{loading ? loader() : null}</div>
        </div>
        <div className="footer-container">
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`Built with Buildspace`}</a>
          <br />
          <a
            className="footer-text"
            href={OPENSEA_LINK}
            target="_blank"
            rel="noreferrer"
          >{`View my OpenSEA collection`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
