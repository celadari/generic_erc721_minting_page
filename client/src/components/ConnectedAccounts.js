import {useEffect, useState} from 'react';
import detectEthereumProvider from '@metamask/detect-provider';


const ConnectedAccounts = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const getAccounts = async () => {
            try {
                setAccounts(await window.ethereum.request({ method: 'eth_accounts' }));
            } catch (e) {
                console.error(e);
            }
        }
        getAccounts();
    }, []);

    useEffect(() => {
        const listenToAccountsChanged = async () => {
            const provider = await detectEthereumProvider();
            if (provider) {
                window.ethereum.on('accountsChanged', accounts => setAccounts(accounts));
            } else {
                console.log('Please install metamask');
            }
        };
        listenToAccountsChanged();
    }, []);

    return accounts;
};

export default ConnectedAccounts;