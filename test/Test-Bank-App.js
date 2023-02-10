const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { getNamedAccounts } = hre
const { ethers } = require("hardhat")
const { assert, expect } = require("chai")
const { BaseContract } = require("ethers")

describe("BankApp Tests", async function () {
  async function deployBankAppFixture() {
    const deployer = (await getNamedAccounts()).deployer
    const user = (await getNamedAccounts()).user

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

  it("Account cannot be created if it already exists", async function () {
    const { deployer, user, bankApp } = await loadFixture(deployBankAppFixture)

    const createAccount = await bankApp.createAccount()
    createAccount.wait()

    await expect(bankApp.createAccount()).to.be.revertedWith(
      "Account Already Exists"
    )
  })

  it("Money can be deposited in account", async function () {
    const { deployer, user, bankApp } = await loadFixture(deployBankAppFixture)

    /* Impersonate User */
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [user],
    })

    const initialBalanceOfUser = await ethers.provider.getBalance(user)

    const signer = await ethers.getSigner(user)
    const createAccount = await bankApp.connect(signer).createAccount()
    const createAccountTx = await createAccount.wait()

    const transactionCostToCreateAccount = createAccountTx.gasUsed.mul(
      createAccountTx.effectiveGasPrice
    )

    const depositedAmount = ethers.utils.parseEther("1")
    const depositAmount = await bankApp
      .connect(signer)
      .deposit({ value: depositedAmount })
    const depositAmountTx = await depositAmount.wait()

    const transactionCostToDeposit = depositAmountTx.gasUsed.mul(
      depositAmountTx.effectiveGasPrice
    )

    const finalBalanceOfUser = await ethers.provider.getBalance(user)

    assert.equal(
      finalBalanceOfUser
        .add(transactionCostToDeposit)
        .add(depositedAmount)
        .add(transactionCostToCreateAccount)
        .toString(),
      initialBalanceOfUser.toString()
    )

    const contractBalance = await ethers.provider.getBalance(bankApp.address)

    assert.equal(contractBalance.toString(), depositedAmount.toString())

    await hre.network.provider.request({
      method: "hardhat_stopImpersonatingAccount",
      params: [user],
    })
    /* Stop Impersonating User */
  })

  it("Money Can be withdrawn from account", async function () {
    const { deployer, user, bankApp } = await loadFixture(deployBankAppFixture)

    /* Impersonate User */
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [user],
    })

    const signer = await ethers.getSigner(user)

    const initialBalanceOfUser = await ethers.provider.getBalance(user)

    const createAccount = await bankApp.connect(signer).createAccount()
    const createAccountTx = await createAccount.wait()

    const transactionCostToCreateAccount = createAccountTx.gasUsed.mul(
      createAccountTx.effectiveGasPrice
    )
    const depositAmount = ethers.utils.parseEther("1")
    const deposit = await bankApp
      .connect(signer)
      .deposit({ value: depositAmount })
    const depositTx = await deposit.wait()

    const transactionCostToDeposit = depositTx.gasUsed.mul(
      depositTx.effectiveGasPrice
    )

    const amountToBeWithdrawn = ethers.utils.parseEther("0.5")

    const withdraw = await bankApp.connect(signer).withdraw(amountToBeWithdrawn)
    const withdrawTx = await withdraw.wait()

    const transactionCostToWithdraw = withdrawTx.gasUsed.mul(
      withdrawTx.effectiveGasPrice
    )

    const finalBalanceOfUser = await ethers.provider.getBalance(user)

    assert.equal(
      finalBalanceOfUser
        .add(transactionCostToWithdraw)
        .add(depositAmount)
        .sub(amountToBeWithdrawn)
        .add(transactionCostToDeposit)
        .add(transactionCostToCreateAccount)
        .toString(),
      initialBalanceOfUser.toString()
    )

    await hre.network.provider.request({
      method: "hardhat_stopImpersonatingAccount",
      params: [user],
    })
    /* Stop Impersonating User */
  })

  it("Money can be transferred across accounts", async function () {
    const { deployer, user, bankApp } = await loadFixture(deployBankAppFixture)
    const createAccount1 = await bankApp.createAccount()
    await createAccount1.wait()

    const depositAmount = ethers.utils.parseEther("1")
    const deposit = await bankApp.deposit({ value: depositAmount })

    /* Impersonate User */
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [user],
    })

    const signer = await ethers.getSigner(user)
    const createAccount2 = await bankApp.connect(signer).createAccount()

    await hre.network.provider.request({
      method: "hardhat_stopImpersonatingAccount",
      params: [user],
    })
    /* Stop Impersonating User */

    const initialBalanceOfUser = await ethers.provider.getBalance(user)

    const transferAmount = ethers.utils.parseEther("0.5")
    const transfer = await bankApp.transfer(user, transferAmount)
    const transferTx = await transfer.wait()

    const finalBalanceOfUser = await ethers.provider.getBalance(user)

    assert.equal(
      finalBalanceOfUser.toString(),
      initialBalanceOfUser.add(transferAmount).toString()
    )
  })
})
