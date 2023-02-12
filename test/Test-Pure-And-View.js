const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { getNamedAccounts } = hre
const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("Test View And Pure Contract", function () {
  async function deployViewAndPureFixture() {
    const { deployer } = await getNamedAccounts()
    const viewAndPureContract = await ethers.getContractFactory(
      "ViewAndPure",
      deployer
    )
    const viewAndPure = await viewAndPureContract.deploy()
    await viewAndPure.deployed()

    return { deployer, viewAndPure }
  }

  it("View function works correctly", async function () {
    const { deployer, viewAndPure } = await loadFixture(
      deployViewAndPureFixture
    )

    const view = await viewAndPure.viewFunction()
    assert.equal(view.toString(), (200000).toString())
  })

  it("Pure function works correctly", async function () {
    const { deployer, viewAndPure } = await loadFixture(
      deployViewAndPureFixture
    )

    const input = 500
    const pure = await viewAndPure.pureFunction(input)

    assert.equal(pure, (300000 + input).toString())
  })
})
