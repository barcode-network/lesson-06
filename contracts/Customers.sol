pragma solidity ^0.5.0;

contract Customers {

    address[16] public customers;

    // Claiming a coupon
    function claim(uint couponId) public returns (uint) {
        require(couponId >= 0 && couponId <= 15);

        customers[couponId] = msg.sender;

        return couponId;
    }

    // Retrieving the adopters
    function getCustomers() public view returns (address[16] memory) {
        return customers;
    }

}