const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

const { getNamedAccounts } = hre

describe("UpgradeableContract Tests", async function () {
  async function deployUpgradeableContractFixtures() {
    const storeDataDeploy = await ethers.getContractFactory("storeData")
    const storeData = await storeDataDeploy.deploy()
    await storeData.deployed()

    const proxyStoreDataDeploy = await ethers.getContractFactory(
      "proxyStoreData"
    )
    const proxyStoreData = await proxyStoreDataDeploy.deploy()
    await proxyStoreData.deployed()

    return { storeData, proxyStoreData }
  }

  it("Data is updated by proxy correctly in the upgradeable contract", async function () {
    const { storeData, proxyStoreData } = await loadFixture(
      deployUpgradeableContractFixtures
    )

    const setContractAddress = await proxyStoreData.setContractAddress(
      storeData.address
    )

    const { deployer } = await getNamedAccounts()

    const firstName = "Rahul"
    const lastName = "Chauhan"
    const updateDataThroughProxy = await proxyStoreData.populateData(
      deployer,
      firstName,
      lastName
    )
    await updateDataThroughProxy.wait()

    const fetchData = await proxyStoreData.data()

    assert.equal(deployer, fetchData.addr)
    assert.equal(firstName, fetchData.FirstName)
    assert.equal(lastName, fetchData.LastName)
  })
})
