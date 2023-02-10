module.exports.default = async (hre) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const args = []
  const bankApp = await deploy("BankApp", {
    from: deployer,
    args: args,
    log: true,
  })
  log("BankApp Contract Deployed")
  log("-------------------------")
}
