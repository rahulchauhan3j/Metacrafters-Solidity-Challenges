module.exports.default = async (hre) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const args = []
  const storageAndMemory = await deploy("StorageAndMemory", {
    from: deployer,
    args: args,
    log: true,
  })

  log("StorageAndMemory Contract Deployed")
  log("----------------------------------")
}
