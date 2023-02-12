module.exports.default = async (hre) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  let args

  args = []
  const allOperations = await deploy("allOperations", {
    from: deployer,
    args: args,
    log: true,
  })

  args.push(allOperations.address)
  const action = await deploy("action", {
    from: deployer,
    args: args,
    log: true,
  })

  log("allOperations and action contracts deployed")
  log("-------------------------------------------")
}
