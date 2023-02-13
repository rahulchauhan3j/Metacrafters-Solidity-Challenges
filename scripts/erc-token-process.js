const { ethers } = require("hardhat")
const { getNamedAccounts } = hre
const { TOKEN_MINTED_AMOUNT } = require("../hardhat-helper.config.js")

async function main() {
  const { deployer, user } = await getNamedAccounts()
  const erc20Token = await ethers.getContract("ERC20Token", deployer)

  const erc20TokenName = await erc20Token.name()
  const erc20TokenSymbol = await erc20Token.symbol()

  console.log(
    `ERC20Token is deployed at address ${erc20Token.address}. Name of Token is ${erc20TokenName} and Symbol is ${erc20TokenSymbol}`
  )

  console.log("------------------------------------------")

  console.log(
    `Lets mint ${TOKEN_MINTED_AMOUNT} tokens for user address ${deployer}`
  )

  const mintToken = await erc20Token.mint(deployer, TOKEN_MINTED_AMOUNT)
  const mintTokenTx = await mintToken.wait()

  console.log("Tokens Minted")
  console.log("------------------------------------------")

  console.log(`Lets transfer ${TOKEN_MINTED_AMOUNT / 2} to ${user}`)

  const transfer = await erc20Token.transfer(user, TOKEN_MINTED_AMOUNT / 2)
  const transferTx = await transfer.wait()

  console.log("Tokens Transferred")
  console.log("-------------------------------------------")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
