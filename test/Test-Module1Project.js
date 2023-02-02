const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { ethers } = require("hardhat")
const { assert, expect } = require("chai")
const { getArgumentForSignature } = require("typechain")
const { getNamedAccounts } = hre

describe("Test Module1Project", async function () {
  async function deployModule1ProjectFixture() {
    const Module1Project = await ethers.getContractFactory("Module1Project")
    const module1Project = await Module1Project.deploy()
    const { deployer, user } = await getNamedAccounts()

    return { module1Project, deployer, user }
  }

  it("Owner is correctly set as deployer by constructor", async function () {
    const { module1Project, deployer, user } = await loadFixture(
      deployModule1ProjectFixture
    )
    const ownerFromContract = await module1Project.owner()

    assert.equal(ownerFromContract, deployer)
  })

  it("Assert statement is correctly executed during play if sum >= 10", async function () {
    const { module1Project, deployer, user } = await loadFixture(
      deployModule1ProjectFixture
    )

    let play, sumfromContract
    for (let i = 0; i < 10; i++) {
      play = await module1Project.play()
      await play.wait()
    }
    await expect(module1Project.play()).to.be.revertedWithPanic
  })

  it("Revert Statement is correctly executed if guess is not correct", async function () {
    const { module1Project, deployer, user } = await loadFixture(
      deployModule1ProjectFixture
    )

    await expect(module1Project.guess(2)).to.be.revertedWithCustomError(
      module1Project,
      "gameLost"
    )
  })

  it("Require statement is correctly executed if calling address is not owner", async function () {
    const { module1Project, deployer, user } = await loadFixture(
      deployModule1ProjectFixture
    )

    /* Impersonate to call reset with "user" instead of owner */

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [user],
    })

    const signer = await ethers.getSigner(user)
    await expect(module1Project.connect(signer).reset()).to.be.revertedWith(
      "Not Owner"
    )

    await hre.network.provider.request({
      method: "hardhat_stopImpersonatingAccount",
      params: [user],
    })
    /******************************************* */
  })
})
