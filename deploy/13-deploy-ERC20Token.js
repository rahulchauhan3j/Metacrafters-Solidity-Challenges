const { TOKEN_NAME, TOKEN_SYMBOL } = require("../hardhat-helper.config")
const { verify } = require("../utils/verify")
module.exports = async (hre) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const chainId = network.config.chainId

  const waitBlockConfirmations = chainId == 31337 ? 0 : 6

  const args = [TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS]
  const ERC20Token = await deploy("ERC20Token", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  })

  console.log("ERC20 Token Contract Deployed")
  console.log("_____________________________")

  if (chainId != 31337) {
    await verify(ERC20Token.address, args)
  }
}

module.exports.tags = ["Token"]
