const { TOKEN_NAME, TOKEN_SYMBOL } = require("../hardhat-helper.config")

module.exports.default = async (hre) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const args = [TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS]
  const ERC20Token = await deploy("ERC20Token", {
    from: deployer,
    args: args,
    log: true,
  })

  console.log("ERC20 Token Contract Deployed")
  console.log("_____________________________")
}
