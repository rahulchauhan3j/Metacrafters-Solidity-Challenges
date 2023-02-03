module.exports.default = async (hre) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const args = []
  const proxyStoreData = await deploy("proxyStoreData", {
    from: deployer,
    args: args,
    log: true,
  })

  log("proxyStoreData contract deployed")
  log("--------------------------------")
}
