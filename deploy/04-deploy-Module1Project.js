module.exports.default = async (hre) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const args = []
  const Module1Project = await deploy("Module1Project", {
    from: deployer,
    args: args,
    log: true,
  })
}
