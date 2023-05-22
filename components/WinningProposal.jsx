import * as React from 'react';
import Router, { useRouter } from "next/router";

export function WinningProposal() {
    const [txData, setTxData] = React.useState(null);
	const [isLoading, setLoading] = React.useState(false);
    const router = useRouter();

    return (
        <div>
          <h1>Check The Winner</h1>
          <button onClick={() => requestWinner(setLoading, setTxData)}>Winner</button>
          { 
            isLoading? <p>Requesting the winner...</p> : <p></p>
          }
          {
            txData? <p>The winner is {txData}</p> : <p></p>
          }
        </div>
    );
    
  }

function requestWinner(setLoading, setTxData) {
    setTxData(null);
    setLoading(true);
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch('http://localhost:3001/winner-name', requestOptions)
        .then(response => response.json())
        .then((data) => {
            setTxData(data);
            setLoading(false);
    });
}

 