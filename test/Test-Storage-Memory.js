const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { ethers } = require("hardhat")
const { assert, expect } = require("chai")
const {
  isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace")
const { getNamedAccounts } = hre

describe("Test Storage And Memory Contract", async function () {
  async function deployStorageAndMemoryFixture() {
    const storageAndMemoryContractDeploy = await ethers.getContractFactory(
      "StorageAndMemory"
    )
    const storageAndMemoryContract =
      await storageAndMemoryContractDeploy.deploy()

    return { storageAndMemoryContract }
  }

  it("User is correctly set as deployer", async function () {
    const { storageAndMemoryContract } = await loadFixture(
      deployStorageAndMemoryFixture
    )
    const { deployer } = await getNamedAccounts()
    const setUser = await storageAndMemoryContract.setUser(deployer)
    const user = await storageAndMemoryContract.user()
    assert.equal(user, deployer)
  })
})
