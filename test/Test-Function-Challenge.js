const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { assert, expect } = require("chai")
const { ethers } = require("hardhat")

describe("Function Challenge", function () {
  async function deployFunctionChallengeFixture() {
    const FunctionChallenge = await ethers.getContractFactory(
      "FunctionChallenge"
    )
    const functionChallenge = await FunctionChallenge.deploy()

    return { functionChallenge }
  }

  describe("Test calculateSum", function () {
    it("should correctly calculate sum", async function () {
      const { functionChallenge } = await loadFixture(
        deployFunctionChallengeFixture
      )
      const x = 2
      const y = 3
      const sum = await functionChallenge.calculateSum(x, y)
      assert.equal(x + y, sum)
    })
  })
  describe("Test viewFunds", function () {
    it("should correctly show funds", async function () {
      const { functionChallenge } = await loadFixture(
        deployFunctionChallengeFixture
      )
      const funds = await functionChallenge.viewFunds()
      assert.equal(funds, 0)
    })
  })

  describe("Test Fund Transfer", function () {
    it("should correctly add funds", async function () {
      const { functionChallenge } = await loadFixture(
        deployFunctionChallengeFixture
      )
      const fundsToBeAdded = ethers.utils.parseEther("1")
      const fundsAdded = await functionChallenge.addFunds({
        value: fundsToBeAdded,
      })

      const fundsPresent = await functionChallenge.viewFunds()
      assert.equal(fundsToBeAdded.toString(), fundsPresent.toString())
    })
  })
})
