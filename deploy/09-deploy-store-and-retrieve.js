module.exports.default = async (hre) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const args = []
  const StoreAndRetrieve = await deploy("StoreAndRetrieve", {
    from: deployer,
    args: args,
    log: true,
  })

  log("Store and Retrieve Deployed")
  log("---------------------------")
}
