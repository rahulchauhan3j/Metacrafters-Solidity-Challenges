module.exports.default = async (hre) => {
  const { getNamedAccounts, deployments } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const args = []
  const GlobalFunctionsChallenge = await deploy("GlobalFunctionsChallenge", {
    from: deployer,
    args: args,
    log: true,
  })

  log("GlobalFunctionsChallenge contract deployed")
  log("------------------------------------------")
}
