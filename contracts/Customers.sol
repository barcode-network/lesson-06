pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Customers {

    //So if I use mappings, I can define each token by its index
    //So in 'customers' mapping I can store who owns the token
    //In 'tokentypes' mapping I can store the type of token

    address[16] public customers; //This is an array of addresses for storing owners of tokens
    string[16] public tokenTypes; //This is an array for storing the token types

    uint256 tokenPrice = 3000000000000000;

    //for a token of index/id  0
    // customers[0] - 0x......
    // tokenTypes[0] - "sword of omens"

    //Structure of each token
    //couponId -
    //tokenType - 
    
    //address is 0x11111,etc

    // Claiming a coupon
    function claim(uint couponId) public payable returns (uint) {
        require(couponId >= 0 && couponId <= 15);
        //Buy adjusting the function to payable then you can require a certain amount of ETH must be spent
        require(msg.value >= tokenPrice, "Amount of Ether sent too small");
        
        customers[couponId] = msg.sender;
        //msg.sender is the address of whoever initiated the transaction
        tokenTypes[couponId] = "Something";

        return couponId;
    }

    function getTypes() public view returns (string[16] memory){
        return tokenTypes;
    }

    // Retrieving the adopters
    function getCustomers() public view returns (address[16] memory) {
        return customers;
    }

    function getOwner(uint tokenId) public view returns(address){
        return customers[tokenId];
    } 

}