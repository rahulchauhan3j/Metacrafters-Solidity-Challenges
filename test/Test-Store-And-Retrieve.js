const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { ethers } = require("hardhat")
const { assert, expect } = require("chai")
const { getNamedAccounts } = hre

describe("Test Store and Retrieve", function () {
  async function deployStoreAndRetrieveFixture() {
    const deployer = (await getNamedAccounts()).deployer
    const user = (await getNamedAccounts()).user
    const storeAndRetrieveContract = await ethers.getContractFactory(
      "StoreAndRetrieve",
      deployer
    )
    const storeAndRetrieve = await storeAndRetrieveContract.deploy()
    await storeAndRetrieve.deployed()

    return { deployer, user, storeAndRetrieve }
  }

  it("Can store and rerieve person data", async function () {
    const { deployer, user, storeAndRetrieve } = await loadFixture(
      deployStoreAndRetrieveFixture
    )

    const firstName = "Rahul"
    const lastName = "Chauhan"
    const nationalId = "ADMRC32414E"

    const storePersonData = await storeAndRetrieve.storePersonData(
      user,
      firstName,
      lastName,
      nationalId
    )
    await storePersonData.wait()

    const retrievePersonData = await storeAndRetrieve.retrievePersonData(user)

    assert.equal(retrievePersonData[0], firstName)
    assert.equal(retrievePersonData[1], lastName)
    assert.equal(retrievePersonData[2], nationalId)
  })

  it("Cannot retieve person data if person is not stored", async function () {
    const { deployer, user, storeAndRetrieve } = await loadFixture(
      deployStoreAndRetrieveFixture
    )

    await expect(storeAndRetrieve.retrievePersonData(user)).to.be.revertedWith(
      "Person Does Not Exists"
    )
  })

  it("Can verify a person", async function () {
    const { deployer, user, storeAndRetrieve } = await loadFixture(
      deployStoreAndRetrieveFixture
    )

    const firstName = "Rahul"
    const lastName = "Chauhan"
    const nationalId = "ADMRC32414E"
    const store = await storeAndRetrieve.storePersonData(
      user,
      firstName,
      lastName,
      nationalId
    )
    await store.wait()

    const isVerifiedInitial = await storeAndRetrieve.isVerified(user)

    const verify = await storeAndRetrieve.verifyPerson(user, true)
    await verify.wait()

    const isVerifiedFinal = await storeAndRetrieve.isVerified(user)

    assert.notEqual(isVerifiedFinal, isVerifiedInitial)
  })
})
