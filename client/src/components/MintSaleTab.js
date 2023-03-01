import React, {useState} from 'react';
import Web3 from 'web3';
import ConnectedAccounts from './ConnectedAccounts';

const MintSaleTab = () => {
    const accounts = ConnectedAccounts();
    const [amount, setAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const uri = process.env.REACT_APP_UNREVEALED_TOKEN_URI_NFT;
            const signature = process.env.REACT_APP_UNREVEALED_TOKEN_SIGNATURE_NFT;
            try {
                const value = Web3.utils.toWei((parseFloat(process.env.REACT_APP_TOKEN_PRICE_NFT) * amount).toString(), 'ether');
                await window.contract.methods.safeMint(amount, {uri}, signature).send({ from: accounts[0], value: value, gasLimit: 10 ** 6 });
            } catch (err) {
                console.error('error: ', err);
            }
        }
    }

    function handleDecrement() {
        if (amount <= 1) return;
        setAmount(amount - 1);
    }

    function handleIncrement() {
        if (amount >= 50) return;
        setAmount(amount + 1);
    }

    return (
        <div>
            <h1>Mint Pre Sale</h1>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={amount} onChange={()=>{}}/>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}>Mint now</button>
                </div>
            ) : (
                <p>Connect your wallet to metamask to start minting NFT tokens</p>
            )}
        </div>
    );
};

export default MintSaleTab;