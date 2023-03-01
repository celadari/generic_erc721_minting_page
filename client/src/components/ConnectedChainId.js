import {useEffect, useState} from 'react';
import detectEthereumProvider from '@metamask/detect-provider';


const ConnectedChainId = () => {
    const [chainId, setChainId] = useState(1);

    useEffect(() => {
        const getChainId = async () => {
            try {
                setChainId(await window.ethereum.request({ method: 'eth_chainId' }));
            } catch (e) {
                console.error(e);
            }
        }
        getChainId();
    }, []);

    useEffect(() => {
        const listenToChainIdChanged = async () => {
            const provider = await detectEthereumProvider();
            if (provider) {
                window.ethereum.on('chainChanged', chainId => setChainId(chainId));
            } else {
                console.log('Please install metamask');
            }
        };
        listenToChainIdChanged();
    }, []);

    return chainId;
};

export default ConnectedChainId;