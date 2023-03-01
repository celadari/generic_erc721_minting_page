import 'react-tabs/style/react-tabs.css';
import Web3 from 'web3';
import NavBar from './components/NavBar';
import MintAirDropTab from './components/MintAirDropTab';
import MintSaleTab from './components/MintSaleTab';
import MintSaleTab from './components/MintSaleTab';
import RevealTab from './components/RevealTab';
import ListTokensTab from './components/ListTokensTab/ListTokensTab';
import './App.css';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import SmartContract from './smart_contract/SmartContract.json';


function App() {

  async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
    }
  }

  async function loadContract() {
      await loadWeb3();
      window.contract = await new window.web3.eth.Contract(SmartContract.abi, process.env.REACT_APP_SMART_CONTRACT_NFT);
  }

  if (typeof window.ethereum !== 'undefined') {
      loadContract();
  }

  return (
      <div className="App">
        <NavBar/>
        <Tabs>
          <TabList>
            {}<Tab>Air Drop Mint</Tab>
            <Tab>Reveal</Tab>
            <Tab>Sale Mint</Tab>
            <Tab>List my NFT</Tab>
          </TabList>

          <TabPanel><MintAirDropTab/></TabPanel>
          <TabPanel><RevealTab/></TabPanel>
          <TabPanel><MintSaleTab/></TabPanel>
          <TabPanel><ListTokensTab/></TabPanel>
        </Tabs>
      </div>);
}

export default App;
