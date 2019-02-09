import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Web3 from 'web3';
// Import contract
import Customers from "./contracts/Customers.json";

import data from './pets.json'



class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      account:null,
      web3:null,
      contract:null,
    }
  }

  componentDidMount = async () => {
    const web3 = new Web3(Web3.givenProvider)

    const accounts = await web3.eth.getAccounts()

    //Instantiate the smart contract
    const contractInstance = new web3.eth.Contract(Customers.abi, '0x99E160adc01ca1E969b846a5897f3cb218A0900C')
    // const contractInstance = new web3.eth.Contract(Customers.abi, '0xE1764A90BC82DdDC5aF86D97d8c657AF672AAc57')
    
    const getOwners = await contractInstance.methods.getCustomers().call();
    const tokenId = 0
    //Get Owners
    const ownerAddress = await contractInstance.methods.getOwner(tokenId).call();
    console.log(getOwners,ownerAddress)
    
    console.log(accounts, contractInstance)
    // //Get Types
    const tokenTypes = await contractInstance.methods.getTypes().call()
    console.log(tokenTypes)

    console.log(Web3.utils.toAscii(tokenTypes[3]))

    this.setState({account:accounts[0],contract:contractInstance})

  }

  handleAdopt = (data)=>{
    // e.preventDefault()
    console.log(data)
    const {contract, account} = this.state
    //Modified to send required ETH
    contract.methods.claim(data.id).send({ value:Web3.utils.toWei('0.003'), from: account, gas: 1000000 })
      .then((result) => {

        console.log(result)

      })

  }

  render() {

    const tableItems = data.map((value, key) =>
      <tr key={value.id}>
        <td>{value.name} {key}</td>
        <td>{value.age}</td>
        <td>{value.breed}</td>
        <td>{value.location}</td>
        <td><img height="100" src={value.picture}/></td>
        <td><button onClick={()=>this.handleAdopt(value)}>Claim</button></td>
      </tr>
    );

    return (
      <div className="App">
        <table>
          <thead>
            <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Breed</th>
            <th>Location</th>
            <th>Photo</th>
            <th>Action</th>
            </tr>
            
          </thead>
          <tbody>
            {tableItems}
          </tbody>
          
        </table>
      </div>
    );
  }
}

export default App;
