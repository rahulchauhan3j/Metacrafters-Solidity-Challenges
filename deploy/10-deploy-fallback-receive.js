module.exports.default = async (hre) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const args = []
  const fallbackAndRecieve = await deploy("FallBackAndRecieve", {
    from: deployer,
    args: args,
    log: true,
  })

  log("Contract FallAndRecieve Deployed")
  log("--------------------------------")
}
