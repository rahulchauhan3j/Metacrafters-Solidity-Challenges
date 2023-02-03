module.exports.default = async (hre) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const args = []
  const storeData = await deploy("storeData", {
    from: deployer,
    args: args,
    log: true,
  })

  log("Deployed populateData contract")
  log("------------------------------")
}
