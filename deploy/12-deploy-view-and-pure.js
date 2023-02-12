module.exports.default = async (hre) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const args = []
  const viewAndPureContract = await deploy("ViewAndPure", {
    from: deployer,
    args: args,
    log: true,
  })

  log("ViewAndPure Contract Deployed")
  log("-----------------------------")
}
