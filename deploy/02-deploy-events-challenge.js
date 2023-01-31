const { ethers } = require("hardhat")

module.exports.default = async (hre) => {
  const { getNamedAccounts, deployments } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()

  const args = []
  const EventsChallenge = await deploy("EventsChallenge", {
    from: deployer,
    args: args,
    log: true,
    value: ethers.utils.parseEther("1"),
  })

  log("Events Challenge is Deployed")
  log("----------------------------")
}

module.exports.tags = ["EventsChallenge"]
