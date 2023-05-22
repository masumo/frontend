import * as React from 'react';
import Router, { useRouter } from "next/router";
import { useSigner } from 'wagmi';
import {ethers, Contract} from 'ethers';
import * as tokenJson from '../abi/MyERC20Vote.json';

export function Delegate() {
  const [txData, setTxData] = React.useState(null);
	const [isLoading, setLoading] = React.useState(false);
  const { data:signer} = useSigner();
  const router = useRouter();
  const TOKEN_CONTRACT = "0x86757CC01F8BfA9dB48407147BdD00BDeD177e73";
  const ETHERSCAN_API_KEY = "";
   const provider = new ethers.providers.EtherscanProvider("maticmum", ETHERSCAN_API_KEY);
   //console.log("TOKEN address"+process.env.REACT_APP_TOKEN_CONTRACT);
   const tokenContract = new Contract(TOKEN_CONTRACT, tokenJson.abi, provider);

    return (
      <div>
        <h1>Delegate The Voting Power</h1>
        <button onClick={async () => await delegate(signer, signer._address, tokenContract, setLoading, setTxData)}>
          Delegate
        </button>
        { 
            isLoading? <p>Delegating voting power...</p> : <p></p>
          }
          {
            txData? <p>Delegation is done {txData}</p> : <p></p>
          }
      </div>
    )
    
  }

 async function delegate(signer, address, tokenContract, setLoading, setTxData){
   setLoading(true);
   tokenContract.connect(signer).delegate(address)
       .then(() => {
         setTxData(data);
         setLoading(false);
         console.log("Delegation Done!");
       }).catch((err) => {
         console.log(err);
       });
 }

   
 


 