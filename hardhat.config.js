require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("@nomicfoundation/hardhat-chai-matchers")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
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
