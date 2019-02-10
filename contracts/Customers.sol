pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Customers {


    /*** EVENTS ***/
    /// The event emitted (useable by web3) when a token is purchased
    event BoughtToken(address indexed buyer, uint256 tokenId);


    address[16] public customers;

    /// Price set by contract owner for each token in Wei.
    uint256 tokenPrice = 3000000000000000;


    /// The Name of the Pet
    mapping(uint256 => string) tokenPetName;

    mapping(uint256 => uint) tokenPetAge;
    
    mapping(uint256 => string) tokenPetBreed;
    
    mapping(uint256 => string) tokenPetLocation;



    // Claiming a coupon
    function claim(
        uint couponId, 
        string memory tokenPetName_,
        uint tokenPetAge_,
        string memory tokenPetBreed_,
        string memory tokenPetLocation_   
    
    ) public payable returns (uint) {
        require(couponId >= 0 && couponId <= 15, "");

        //Buy adjusting the function to payable then you can require a certain amount of ETH must be spent
        //require(msg.value >= tokenPrice, "Amount of Ether sent too small");
        

        customers[couponId] = msg.sender;
        tokenPetName[couponId] = tokenPetName_;
        tokenPetAge[couponId] = tokenPetAge_;
        tokenPetBreed[couponId] = tokenPetBreed_;
        tokenPetLocation[couponId] = tokenPetLocation_;

        return couponId;
    }







    // Retrieving the adopters
    function getCustomers() public view returns (address[16] memory) {
        return customers;
    }


    // @notice Returns all the relevant information about a specific token
    // @param _couponId The ID of the token of interest
    function getToken(uint256 _couponId)
        external
        view
        returns (		
        uint tokenID_,
        string memory tokenPetName_,
        uint tokenPetAge_,
        string memory tokenPetBreed_,
        string memory tokenPetLocation_

    ) {
        // TODO: Add Token Score to the details returned
        tokenID_ = _couponId;
        tokenPetName_ = tokenPetName[_couponId];
        tokenPetAge_ = tokenPetAge[_couponId];
        tokenPetBreed_ = tokenPetBreed[_couponId];
        tokenPetLocation_ = tokenPetLocation[_couponId];

    }



    function getOwner(uint tokenId) public view returns(address){
        return customers[tokenId];
    } 

}