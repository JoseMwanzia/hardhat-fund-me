// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";


library PriceConverter {

    function getPrice(AggregatorV3Interface priceFeed) internal view returns(uint256) {
        // ABI
        // Address 0x694AA1769357215DE4FAC081bf1f309aDC325306
            // AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306); // WE NO LONGER NEED THIS BEACUSE WE SET 'AggregatorV3Interface priceFeed'
            (,int256 price,,,) = priceFeed.latestRoundData(); 
        // ETH in terms of usd
        return uint256(price * 1e18);
    }

    // function getVersion() public view returns(uint256) {
    //     AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
    //     return priceFeed.version();
    // } // IS HERE TO SHOW HOW TO WORK WITH INTERFACES, THEREFORE WE DONT REALLY NEED IT IN OUR CODE BASE

    function getConversionRate(uint256 ethAmount, AggregatorV3Interface priceFeed) internal view returns(uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1*18;
        return ethAmountInUsd;
    }
}