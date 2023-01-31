const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { assert, expect } = require("chai")
const { ethers } = require("hardhat")
const { getNamedAccounts } = hre
const {
  isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace")

describe("Test Global Function Challenge", async function () {
  async function deployGlobalFunctionChallengeFixture() {
    const GlobalFunctionsChallengeFactory = await ethers.getContractFactory(
      "GlobalFunctionsChallenge"
    )
    const GlobalFunctionsChallenge =
      await GlobalFunctionsChallengeFactory.deploy()

    return { GlobalFunctionsChallenge }
  }

  it("Test Recieve Funds", async function () {
    const { GlobalFunctionsChallenge } = await loadFixture(
      deployGlobalFunctionChallengeFixture
    )

    const { deployer } = await getNamedAccounts()

    const amountTransferred = ethers.utils.parseEther("2")
    const fundsTransfer = await GlobalFunctionsChallenge.addFunds({
      value: amountTransferred,
    })

    const txFundsTransfer = await fundsTransfer.wait()

    assert.equal(txFundsTransfer.events[0].args[0], deployer)
    assert.equal(
      txFundsTransfer.events[0].args[1].toString(),
      amountTransferred.toString()
    )
    console.log(`Gas Left is ${txFundsTransfer.events[0].args[2].toString()}`)
  })
})
