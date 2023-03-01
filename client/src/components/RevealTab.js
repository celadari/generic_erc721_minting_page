import React, {useState} from 'react';
import ConnectedAccounts from './ConnectedAccounts';

const RevealTab = () => {
    const accounts = ConnectedAccounts();
    const isConnected = Boolean(accounts[0]);

    async function fetchTokenProofs() {
        const owners = await window.contract.methods.getOwners().call();
        const uris = await window.contract.methods.getTokenURIs().call();
        const listTokens = [];
        for (let tokenId = 0; tokenId < owners.length; tokenId++) {
            if (uris[tokenId] === process.env.REACT_APP_UNREVEALED_TOKEN_URI_NFT) listTokens.push(tokenId);
        }
        const res = await fetch(`/api/reveal-merkle-proofs?tokenIds=${listTokens}`);
        return await res.json();
    }

    async function retrieveVouchers() {
        const tokenProofs = await fetchTokenProofs();
        const merkleProofs = tokenProofs.map(tokenProof => tokenProof.proof);
        const revealData = tokenProofs.map(tokenProof => ({tokenId: tokenProof.tokenId, uri: tokenProof.jsonUri}));
        await window.contract.methods.reveal(merkleProofs, revealData).send({ from: accounts[0] });
    }

    return (
        <div><button onClick={retrieveVouchers}>Reveal Nfts changed</button></div>
    );
};

export default RevealTab;