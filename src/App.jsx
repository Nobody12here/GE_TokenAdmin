import { useState, useEffect } from "react";
import { useWeb3 } from "./components/connetWallet";
import CustomAppBar from "./components/Header";
import erc20ABI from "./contracts/erc20.json";
import rewardABI from "./contracts/reward.json";
import "./App.css";
import {
  GE_TOKEN_ADDRESS,
  REWARD_CONTRACT_ADDRESS,
} from "./constants";

function App() {

  const { web3, connectMetamask, connectTrustWallet } = useWeb3();
  const [tokenContract, setTokenContract] = useState(null);
  const [RewardContract, setRewardContract] = useState(null);
  const [address, setAddress] = useState("");
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [tokensToAdd,setTokensToAdd] = useState(0);
  
  //Load the token contract and the reward smart contract when web3 is loaded
  useEffect(() => {
    async function loadData() {
      if (web3) {
        // Load token contract and wallet address
        try {
          const walletAddress = await web3.eth.getAccounts();
          setAddress(walletAddress[0]);
          const tokenContract = await new web3.eth.Contract(
            erc20ABI,
            GE_TOKEN_ADDRESS,
          );

          const RewardContract = await new web3.eth.Contract(
            rewardABI,
            REWARD_CONTRACT_ADDRESS,
          );
          setTokenContract(tokenContract);
          setRewardContract(RewardContract);
          console.log(RewardContract)
          //checking if wallet is connected
          if (walletAddress[0]) {
            setIsMetamaskConnected(true);
          }
        } catch (error) {
          alert("Error while loading Data\nTry Again");
          console.log(error);
        }
      }
    }
    loadData();
  }, [web3]);

  async function handleTokenAdd(event,tokenAmount){
    const amount = (parseInt(tokenAmount) * 10**18).toString();
    const allowance = await tokenContract.methods.allowance(address,REWARD_CONTRACT_ADDRESS).call()
    console.log(allowance)
    if( allowance < tokenAmount){
      //first approve some tokens
      await tokenContract.methods.approve(REWARD_CONTRACT_ADDRESS,tokenAmount).send({from:address});
    }
    await RewardContract.methods.depositGETokens(amount).send({from:address});
    alert("Tokens transfered!")
  }
  return (
    <>
    <CustomAppBar isMetamaskConnected={isMetamaskConnected} />
    <div className="container">
      <input
        className="input-field"
        type="number"
        name="token-amount"
        onChange={(event) => {
          setTokensToAdd(event.target.value);
        }}
        placeholder="Enter GE tokens "
      />
      <button
        className="add-button"
        onClick={(event) => {
          handleTokenAdd(event, tokensToAdd);
        }}
      >
        Add tokens
      </button>
    </div>
  </>
  );
}

export default App;