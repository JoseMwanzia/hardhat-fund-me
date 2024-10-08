require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
    }
  },
  localhost: {
    url: "http://127.0.0.1:8545/",
    // accounts: Thanks to Hardhat
    chainId: 31337,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      11155111: 1,
    },
    user: {
      default: 1,
    },
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: 'MATIC'
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  // solidity: "0.8.7",
  solidity: {
    compilers: [
      {version: "0.8.7"},
      {version: "0.8.0"}
    ]
  }
}
