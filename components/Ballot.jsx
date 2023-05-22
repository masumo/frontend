import * as React from 'react';
import { VotingPower } from "./VotingPower";
import { WinningProposal } from "./WinningProposal";
import { Voting } from "./Voting";
import { Delegate } from "./Delegate";
import Router, { useRouter } from "next/router";


export function Ballot() {
  const router = useRouter();
  return (
    <div>
      <div><Delegate/></div>
      <div><VotingPower></VotingPower></div>
      <div><Voting/></div>
      <div><WinningProposal></WinningProposal></div>
    </div>
  )
}



// async function delegate(signer){
//   setLoading(true);
//   tokenContract.connect(signer).delegate("0xDf6AE824c6121Ab2022199f9b746eC2324Ad7cf2")
//       .then(() => {
//         console.log("Delegation Done!");
//         setLoading(false);
//       }).catch((err) => {
//         console.log(err);
//       });
// }

//   return (
//     <div>
//       <button onClick={async () => await delegate(signer)}>
//         Delegate
//       </button>
//       <p>isLoading: {loading.toString()}</p>
//     </div>
//   )
// }


