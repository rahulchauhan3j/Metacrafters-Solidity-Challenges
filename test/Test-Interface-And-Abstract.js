const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { getNamedAccounts } = hre
const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("Test Interface And Abstract Contracts", function () {
  async function deployInterfaceAndAbstractFixtures() {
    const { deployer } = await getNamedAccounts()

    const allOperationsContract = await ethers.getContractFactory(
      "allOperations"
    )
    const allOperations = await allOperationsContract.deploy()
    await allOperations.deployed()
    const actionContract = await ethers.getContractFactory("action")
    const action = await actionContract.deploy(allOperations.address)
    await action.deployed()

    return { deployer, allOperations, action }
  }

  it("action contract (based on interface) works correctly", async function () {
    const { deployer, allOperations, action } = await loadFixture(
      deployInterfaceAndAbstractFixtures
    )

    const x = 20
    const y = 10

    const sumOfXY = await action.findSum(x, y)
    assert.equal(sumOfXY.toString(), (x + y).toString())

    const productOfXY = await action.findProduct(x, y)
    assert.equal(productOfXY.toString(), (x * y).toString())
  })

  it("allOperations (based on abstract contract) works correctly", async function () {
    const { deployer, allOperations, action } = await loadFixture(
      deployInterfaceAndAbstractFixtures
    )

    const x = 30
    const y = 10

    const sumOfXY = await allOperations.sum(x, y)
    assert.equal(sumOfXY.toString(), (x + y).toString())

    const productOfXY = await allOperations.mul(x, y)
    assert.equal(productOfXY.toString(), (x * y).toString())

    const differenceOfXY = await allOperations.sub(x, y)
    assert.equal(differenceOfXY.toString(), (x - y).toString())
  })
})
