import * as React from 'react';
import Router, { useRouter } from "next/router";
import { useSigner } from 'wagmi';
import * as ballotJson from '../abi/TokenizedBallot.json';
import {ethers, Contract} from 'ethers';

export function Voting() {
  const [txData, setTxData] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
  const [errorReason, setError] = React.useState(null);
  
  const { data:signer} = useSigner();
  const router = useRouter();
  
  const BALLOT_CONTRACT = "0xabd444215f3c7c516ea2beF173D85c2464dA3750";
  const ETHERSCAN_API_KEY = "";

   const provider = new ethers.providers.EtherscanProvider("maticmum", ETHERSCAN_API_KEY);
   const ballotContract = new Contract(BALLOT_CONTRACT, ballotJson.abi, provider);

    return (
        <div>
          <h1>Voting</h1>
          <button onClick={async () => await vote(signer, ballotContract, setLoading, setError, setTxData)}>
            Vote
          </button>
        { 
          loading? <p>Voting in Progress...</p> : <p></p>
        }      
        { 
          errorReason? <p>Voting Failed: {errorReason}</p> : <p></p>
        }
        { 
          txData? <p>Voted {txData.hash}</p> : <p></p>
        }    
        </div>
    )  
    
  }


 async function vote(signer, ballotContract, setLoading, setError, setTxData){
   setLoading(true);
   ballotContract.connect(signer).vote(1, ethers.utils.parseUnits("3"))
       .then((data) => {
         setTxData(data);
         setLoading(false);
         console.log("Voting is Done!");
       }).catch((err) => {
        setError(err.reason); 
        setLoading(false);
        console.log(err.reason);
       });
 }

   
 


 