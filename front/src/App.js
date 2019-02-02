import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Web3 from 'web3';
// Import contract
import Customers from "./contracts/Customers.json";

import data from './pets.json'



class App extends Component {

  componentDidMount = async () => {
    const web3 = new Web3(Web3.givenProvider)

    const accounts = await web3.eth.getAccounts()

    //Instantiate the polyToken smart contract
    //***TODO: Grab deployed contract address from commandline */
    const contractInstance = new web3.eth.Contract(Customers.abi, '0x36d32F8a3582De966671dC61dc729E47364F61b4')
    // console.log(accounts, tutorialInstance)
    //Get account's POLY balance
    console.log(accounts, contractInstance)

  }

  render() {

    const tableItems = data.map((value, key) =>
      <tr key={value.id}>
        <td>{value.name}</td>
        <td>{value.age}</td>
        <td>{value.location}</td>
        <td><img height="100" src={value.picture}/></td>
        <td><button>Claim</button></td>
      </tr>
    );

    return (
      <div className="App">
        <table>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Location</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
          {tableItems}
        </table>
      </div>
    );
  }
}

export default App;
