import React from 'react';
import ConnectedAccounts from './ConnectedAccounts';
import Web3 from 'web3';


const MintAirDropTab = () => {
    const accounts = ConnectedAccounts();
    const isConnected = Boolean(accounts[0]);

    async function fetchJsonToken() {
        const res = await fetch(`/api/nonce?address=${accounts[0]}`);
        return await res.json();
    }

    async function getVouchers() {
        const jsonToken = await fetchJsonToken();
        const signature = await window.web3.eth.personal.sign(jsonToken.message, accounts[0]);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                authentication: {tmpToken: jsonToken.tmpToken, signature: signature}
            }),
        };
        const res = await fetch('/api/get-vouchers', requestOptions);
        const resJson = await res.json();
        await mintFromVouchers(resJson.vouchers)
    }

    async function mintFromVouchers(vouchers) {
        if (window.ethereum) {
            try {
                for (const voucher of vouchers) {
                    const value = Web3.utils.toWei(voucher.price.toString(), 'wei');
                    const voucherNFT = {tokenId: voucher['token_id'], minPrice: voucher['price'], buyer: accounts[0], uri: voucher['json_uri']};
                    console.log(voucherNFT);
                    console.log(value);
                    await window.contract.methods.safeMint(voucherNFT, voucher.signature).send({ from: accounts[0], value: value });
                }
            } catch (err) {
                console.error('error: ', err);
            }
        }
    }

    return (
        <div><button onClick={getVouchers}>Get Air drop vouchers</button></div>
    );
};

export default MintAirDropTab;