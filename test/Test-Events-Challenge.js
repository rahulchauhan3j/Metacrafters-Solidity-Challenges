const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { assert, expect, AssertionError } = require("chai")
const { ethers } = require("hardhat")
const { getNamedAccounts, deployments } = hre
const { deploy, log, get } = deployments

describe("Events Challenge", async function () {
  async function deployEventsChallengeFixture() {
    const EventsChallenge = await ethers.getContractFactory("EventsChallenge")
    const fundsInitial = ethers.utils.parseEther("1")
    const eventsChallenge = await EventsChallenge.deploy({
      value: fundsInitial,
    })
    const txReciept = await eventsChallenge.deployed()
    return { txReciept, eventsChallenge, fundsInitial }
  }

  it("Test Constructor Event", async function () {
    const { deployer } = await getNamedAccounts()

    const { txReciept, eventsChallenge, fundsInitial } = await loadFixture(
      deployEventsChallengeFixture
    )
    const ownerContract = await eventsChallenge.totalFunds()
    const eventFilter = txReciept.filters.contractCreated()
    const events = await eventsChallenge.queryFilter(eventFilter, "latest")

    assert.equal(events[0].args[0], deployer)
    assert.equal(events[0].args[1].toString(), fundsInitial.toString())
  })

  it("Test Change Owner Event ", async function () {
    const { user } = await getNamedAccounts()
    const { eventsChallenge } = await loadFixture(deployEventsChallengeFixture)

    const ownerChanged = await eventsChallenge.changeOwner(user)

    const txOwnerChanged = await ownerChanged.wait()

    assert.equal(txOwnerChanged.events[0].args[0], user)
    assert.equal(txOwnerChanged.events[0].args[1], "Owner Changed")
  })

  it("Test Recieve Fund Event", async function () {
    const { deployer } = await getNamedAccounts()
    const { eventsChallenge } = await loadFixture(deployEventsChallengeFixture)

    const amountAdded = ethers.utils.parseEther("1")
    const fundRecieved = await eventsChallenge.recieveFunds({
      value: amountAdded,
    })

    const txFundRecieved = await fundRecieved.wait()

    assert.equal(txFundRecieved.events[0].args[0], deployer)
    assert.equal(
      txFundRecieved.events[0].args[1].toString(),
      amountAdded.toString()
    )
  })

  it("Test Release Fund Event", async function () {
    const { deployer } = await getNamedAccounts()
    const { eventsChallenge } = await loadFixture(deployEventsChallengeFixture)

    const totalFunds = await eventsChallenge.totalFunds()
    const fundsReleased = await eventsChallenge.releaseFunds()
    const txfundsReleased = await fundsReleased.wait()

    assert.equal(txfundsReleased.events[0].args[0], deployer)
    assert.equal(
      txfundsReleased.events[0].args[1].toString(),
      totalFunds.toString()
    )
  })
})
