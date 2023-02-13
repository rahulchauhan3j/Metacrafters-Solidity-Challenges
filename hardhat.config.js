require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("@nomicfoundation/hardhat-chai-matchers")
require("dotenv").config()

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://goerli.com"
const GOERLI_PRIVATE_KEY =
  process.env.GOERLI_PRIVATE_KEY || "0c0000000000000000000000000000000000000000"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [GOERLI_PRIVATE_KEY],
      chainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
    user_2: {
      default: 2,
    },
    user_3: {
      default: 3,
    },
  },
}
