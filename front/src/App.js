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
      owners:null,
      btext:'Claim',
      tokenList:[
        // {id:0, title:'Token Name', type: 2}
      ]
    }
  }

  componentDidMount = async () => {
    const web3 = new Web3(Web3.givenProvider)

    const accounts = await web3.eth.getAccounts()

    //Instantiate the smart contract
    const contractInstance = new web3.eth.Contract(Customers.abi, '0x7E800d551028bf152f3514F9a52Fff6974f87096')

    console.log("d", contractInstance.methods.getToken(0));

    const getOwners = await contractInstance.methods.getCustomers().call();  

    const tokenId = 0
    //Get Owners
    const ownerAddress = await contractInstance.methods.getOwner(tokenId).call();
    console.log("e", getOwners, ownerAddress)


    console.log("a", accounts, contractInstance)

    this.setState({account:accounts[0],contract:contractInstance,getOwners})

    this.getTokens(web3)


  }

 
  getItemInfo(id){

    const {tokenList} = this.state;

    var status = "Not Owned";
    var token = tokenList.find(element => element.id == id);


    if(token != null)
    {
     
      status = "Owned";
      
    }

    return status;

  }

  handleAdopt = (thisbutton, data)=>{
    // e.preventDefault()
    console.log("b", data)
    const {contract, account, web3} = this.state

    contract.methods.claim(data.id,  data.name, data.age, data.breed, data.location).send({ from: account, gas: 1000000 })
      .then((result) => {

        console.log("c", result);

        this.setState({ btext : "Claimed"  }) 

        this.getTokens(web3)

      })

  }




  getTokens = async (web3) => {

    
    let token_array = []

    const {contract, account} = this.state




    contract.methods.getCustomers().call().then((result) => {

      console.log("f", result)

      for(var i=0;i<result.length;i++){

        if(result[i] != 0){
          var theaddress = result[i];
          var theid = i;
     //     alert(theid);
          contract.methods.getToken(i).call()
          .then((result2)=>{
           //  console.log(result)
            token_array.push(
              {             
                tokenAddress: theaddress, 
                id:result2.tokenID_, 
                tokenPetName: result2.tokenPetName_, 
                tokenPetAge: result2.tokenPetAge_,
                tokenPetBreed: result2.tokenPetBreed_,
                tokenPetLocation: result2. tokenPetLocation_
              })
         //    console.log(token_array)
              console.log("g", result[i]);

            this.setState({ tokenList:token_array })
          }) 


        }


      }

    })
     
    

  }





  render() {

    const {tokenList} = this.state

    const tokenTable =  tokenList.map(function (item) {
     // console.log(item)
      // map the new array to list items
      return <tr><td>{item.id}</td><td>{item.tokenAddress}</td><td>{item.tokenPetName}</td><td>{item.tokenPetAge}</td><td>{item.tokenPetBreed}</td><td>{item.tokenPetLocation}</td></tr>
    })


    const tableItems = data.map((value, key) =>
      <tr>
        <td>{value.id}</td>
        <td>{value.name}</td>
        <td>{value.age}</td>
        <td>{value.breed}</td>
        <td>{value.location}</td>
        <td><img height="100" src={value.picture}/></td>
        <td><button onClick={()=>this.handleAdopt(this, value)}> Claim</button></td>
        <td> {this.getItemInfo(value.id)}</td>
      </tr>
    );

    return (
      <div className="App">

      <h1>Pets</h1>
        <table border="1">
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Breed</th>
            <th>Location</th>
            <th>Photo</th>
            <th>Action</th>
            <th>Status</th>
          </thead>
          {tableItems}
        </table>

        <br/><br/>

        <h1>Coupons</h1>

        <table border="1">
          <thead>
            <th>ID</th>
            <th>Address</th>
            <th>Name</th>
            <th>Age</th>
            <th>Breed</th>
            <th>Location</th>
            {/* <th>Status</th> */}
          </thead>
          {tokenTable}
        </table>


 


      </div>
    );
  }
}

export default App;
