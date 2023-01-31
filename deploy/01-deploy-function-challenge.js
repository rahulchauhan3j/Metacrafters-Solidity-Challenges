module.exports.default = async (hre) => {
  const { getNamedAccounts, deployments } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()

  const args = []
  const functionChallenge = await deploy("FunctionChallenge", {
    from: deployer,
    args: args,
    log: true,
  })
  log("Function Challenge Contract Deployed")
  log("------------------------------------")
}

module.exports.tags = ["FunctionChallenge"]
