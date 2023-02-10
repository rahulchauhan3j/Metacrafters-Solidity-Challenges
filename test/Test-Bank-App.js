const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { getNamedAccounts } = hre
const { ethers } = require("hardhat")
const { assert, expect } = require("chai")
const { BaseContract } = require("ethers")

describe("BankApp Tests", async function () {
  async function deployBankAppFixture() {
    const deployer = (await getNamedAccounts).deployer
    const user = (await getNamedAccounts).user

    const bankAppContract = await ethers.getContractFactory("BankApp")
    const bankApp = await bankAppContract.deploy()
    await bankApp.deployed()

    return { deployer, user, bankApp }
  }

  it("Account can be created Successfully", async function () {
    const { deployer, user, bankApp } = await loadFixture(deployBankAppFixture)
    const createAccount = await bankApp.createAccount()
    await createAccount.wait()

    const accountExists = await bankApp.accountExists()

    const amountDeposited = ethers.utils.parseEther("1")
    const deposit = await bankApp.deposit({ value: amountDeposited })
    await deposit.wait()

    const accountBalance = await bankApp.accountBalance()

    const contractBalance = await ethers.provider.getBalance(bankApp.address)

    assert.equal(accountBalance.toString(), amountDeposited.toString())
    assert.equal(contractBalance.toString(), amountDeposited.toString())
    assert(accountExists)
  })
})
