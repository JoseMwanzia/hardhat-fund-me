// function deployFunc() {
//     console.log("Hi!");

const { deployContract } = require("@nomicfoundation/hardhat-ethers/types");
const { getNamedAccounts, deployments } = require("hardhat");


// }

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts()
    const chainId  = network.config.chainId
}
