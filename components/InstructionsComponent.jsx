import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { useSigner, useNetwork, useBalance } from 'wagmi';
import { useContractWrite, useContract } from 'wagmi'

import { VotingPower } from "./VotingPower";
import { WinningProposal } from "./WinningProposal";
import { Voting } from "./Voting";
import { Delegate } from "./Delegate";

export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
					Voting dApp
				</h1>
			</header>

			<div className={styles.buttons_container}>
				<PageBody></PageBody>
			</div>
			<div className={styles.footer}>
				Group 1 Cohort 2 Encode Solidity Bootcamp April 2023
			</div>
		</div>
	);
}

// delegate 
// vote
// transfer voting power
// create a form for token request
// check the winner
// check token balance



 

function PageBody(){
	return(
		<div>
			<RequestTokens/><br />
			<div><Delegate/></div><br />
			<div><VotingPower></VotingPower></div> <br />
			<div><Voting/></div> <br />
			<div><WinningProposal></WinningProposal></div> <br />
			<br />
		</div>
	)
}

function WalletInfo(){
		const { data:signer, isError, isLoading} = useSigner();
		const {chain, chains} = useNetwork();
	if(signer) return(
		<>
			<p>Your account address is {signer._address}</p>
			<p>connected to the {chain.name} network</p>
			<button onClick={() => signMessage(signer, "I love potaoes")}> Sign </button>
			<WalletBalance/>
	
		</>
	)
	if(isLoading) return(
		<>
			<p> Wait a while, the wallet is loading</p>
		</>
	)
	return(
		<p> Connect a wallet</p>
	)
}

function signMessage(signer, message) {
		signer.signMessage(message).then(
			(response) => {console.log(response)},
			(error) => {console.error(error)}
	)
}

function WalletBalance(){
	const {data: signer} = useSigner();
	const {data, isError, isLoading} =  useBalance({
			address: signer._address,
		})

		if(isLoading) return <div> Fetching balance....</div>
		if(isError) return <div>Error fetching balance</div>
		return(
		<div>
			Balance: {data?.formatted} {data?.symbol}
		</div>
	)
}

function Profile() {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	
	useEffect(() => {
		setLoading(true);
		fetch('https://random-data-api.com/api/v2/users')
		.then((res) => res.json())
		.then((data) => {
			setData(data);
			setLoading(false);
		});
	}, []);
	
	if (isLoading) return <p>Loading...</p>;
	if (!data) return <p>No profile data</p>;
	
	return (
		<div>
		<h1>{data.username}</h1>
		<p>{data.email}</p>
		</div>
	);
}

function RequestTokens() {
		const { data: signer } = useSigner();
		const [txData, setTxData] = useState(null);
		const [isLoading, setLoading] = useState(false);
		if (txData) return (
			<div>
				<p>Transaction completed!</p>
				<a href={"https://mumbai.polygonscan.com/tx/" + txData.hash} target="_blank">{txData.hash}</a>
			</div>
		)
		if (isLoading) return <p>Requesting tokens to be minted...</p>;
		return (
			<div>
			  <h1>Request tokens to be minted</h1>
			  <button onClick={() => requestTokens(signer, "anything", setLoading, setTxData)}>Request tokens</button>
			</div>
		  );
}

function requestTokens(signer, signature, setLoading, setTxData) {
		setLoading(false);
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ address: signer._address, signature: signature })
		};
		fetch('http://localhost:3001/request-tokens', requestOptions)
			.then(response => response.json())
			.then((data) => {
				setTxData(data);
				setLoading(true);
		});
}