import React from 'react';
import Web3 from 'web3';
import ConnectedAccounts from './ConnectedAccounts';

const NavBar = () => {
    const accounts = ConnectedAccounts();
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            try {
                await window.ethereum.request({method: 'eth_requestAccounts'});
            } catch (e) {
                console.error(e);
            }
        }
    }

    async function fetchToken() {
        const res = await fetch(`/api/nonce?address=${accounts[0]}`);
        return await res.json();
    }

    async function checkIfInPreSaleList() {
        const jsonToken = await fetchToken();
        const web3 = new Web3(window.ethereum);
        const signature = await web3.eth.personal.sign(jsonToken.message, accounts[0]);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                authentication: {tmpToken: jsonToken.tmpToken, signature: signature}
            }),
        };
        const res = await fetch('/api/is-selected', requestOptions);
        const preSaleNFTJson = await res.json();
        console.log(preSaleNFTJson);
    }

    return (
        <div>
            {/* left side */}
            <div>Facebook</div>
            <div>Twitter</div>
            <div>Email</div>

            {/* right side */}
            <div>About</div>
            <div>Mint</div>
            <div>Team</div>

            {/* connect */}
            {isConnected ? (
                <button onClick={checkIfInPreSaleList}>Check if in presale</button>
            ) : (
                <button onClick={connectAccount}>Connect</button>
            )}
        </div>
    )
};

export default NavBar;