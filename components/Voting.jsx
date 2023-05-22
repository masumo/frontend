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

   async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    let proposalIdx = formData.get('selectedProposal');
    let voteAmount = formData.get('amount');

    await vote(signer, ballotContract, setLoading, setError, setTxData, parseInt(proposalIdx), voteAmount);
    
    
    //console.log(formData.get('selectedProposal')+"  "+formData.get("amount"));
  }

    return (
        <div>
          <h1>Voting</h1>
           
          <form method="post" onSubmit={handleSubmit}>
              Vote: &nbsp;
              <select name="selectedProposal">
                <option value="0">Chcocolate</option>
                <option value="1">Strawberry</option>
                <option value="2">Vanilla</option>
              </select>
              <label>
              &nbsp;  Amount: &nbsp; 
              </label>
              <input name="amount" /> &nbsp; 
              <button type="submit">Vote</button>
          </form>
          
        { 
          loading? <p>Voting in Progress...</p> : <p></p>
        }      
        { 
          errorReason? <p>Voting Failed: {errorReason}</p> : <p></p>
        }
        { 
          txData? <p>Voted at:  <a href={"https://mumbai.polygonscan.com/tx/" + txData.hash} target="_blank">{txData.hash}</a> </p> : <p></p>
        }    
        </div>
    )  
    
  }

  
 async function vote(signer, ballotContract, setLoading, setError, setTxData, propIdx, amount){
   setLoading(true);
   ballotContract.connect(signer).vote(propIdx, ethers.utils.parseUnits(amount))
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

   
 


 