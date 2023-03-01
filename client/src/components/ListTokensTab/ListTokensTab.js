import React, {useState} from 'react';
import ConnectedAccounts from '../ConnectedAccounts';
import ConnectedChainId from '../ConnectedChainId';
import NftGrid from '../NftGrid/NftGrid';

const tokensStatusMap = {
    inited: "inited",
    loading: "loading",
    loaded: "loaded",
    error: "error",
}

const ListTokensTab = () => {
    const accounts = ConnectedAccounts();
    const chainId = ConnectedChainId();
    const [tokensData, setTokensData] = useState([]);
    const [tokensStatus, setTokensStatus] = useState(tokensStatusMap.inited);


    async function refreshListTokens() {
        if (window.ethereum) {
            try {
                setTokensStatus(tokensStatusMap.loading);
                const owners = await window.contract.methods.getOwners().call();
                const uris = await window.contract.methods.getTokenURIs().call();
                const tokens = [];
                for (let tokenId = 0; tokenId < owners.length; tokenId++) {
                    if (owners[tokenId].toLowerCase() === accounts[0].toLowerCase()) {
                        const jsonUri = uris[tokenId];
                        const jsonUriHttp = `${process.env.REACT_APP_IPFS_GATEWAY_URL}/${jsonUri.slice(7)}`
                        tokens.push({tokenId, jsonUri, jsonUriHttp});
                    }
                }
                setTokensData(tokens);
                setTokensStatus(tokensStatusMap.loaded);
            } catch (err) {
                setTokensStatus(tokensStatusMap.error);
                console.error('error: ', err);
            }
        }
    }

    return (
        <div>
            <button onClick={refreshListTokens}>-</button>
            {tokensData.length && tokensStatus === tokensStatusMap.loaded ? <NftGrid nftDataArr={tokensData} /> : null}
            {tokensStatus === tokensStatusMap.loading ? "Loading" : null}
        </div>
    );
};

export default ListTokensTab;