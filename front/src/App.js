import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Web3 from 'web3';
// Import contract
import Customers from "./contracts/Customers.json";



class App extends Component {

  componentDidMount = async () => {
    const web3 = new Web3(Web3.givenProvider)

    const accounts = await web3.eth.getAccounts()

    //Instantiate the polyToken smart contract
    //***TODO: Grab deployed contract address from commandline */
    const tutorialInstance = new web3.eth.Contract(Customers.abi, '0xC388ae2279d542450a4187918c35D9053f89b95b')
    // console.log(accounts, tutorialInstance)
    //Get account's POLY balance
    console.log(tutorialInstance)
    // const ttBalance = await tutorialInstance.methods.balanceOf(accounts[0]).call()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
