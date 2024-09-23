// Get funds from users
// withdraw funds
// set a minimum value in USD

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PriceConverter.sol";

contract FundMe {
    using PriceConverter for uint256;

    uint256 public constant MINIMUM_USD = 50 * 1e18;
    address[] public funders;
// 656,355
// 636,417

    mapping(address => uint256) public addressToAmountFunded;

    function fund() public payable {
        // we want to be able to send minimum amount in usd
        // 1. How do we send ether to this contract?
            // inter-changed the values of the require() arguments after importing the PriceConverter liblary
        require(msg.value.getConversionRate()  >= MINIMUM_USD, "Didn't send enough!");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
    }

    address public immutable I_OWNER;

    constructor() {
        I_OWNER = msg.sender;
    }

    function withdraw() public onlyOwner {
        
        for (uint256 fundersIndex = 0; fundersIndex < funders.length; fundersIndex++) 
        {
            address funder = funders[fundersIndex];
            addressToAmountFunded[funder] = 0;
        }
        // reset the array
        funders =  new address[](0);
        // actually withdraw the funds

        // transfer
        // send

        // call
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed!");
    }

    modifier onlyOwner {
        require(msg.sender == I_OWNER, "Sender is not owner!");
        _;
    }
}