const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { ethers } = require("hardhat")
const { getNamedAccounts } = hre
const { assert, expect } = require("chai")

describe("FallBackAndRecieve Tests", function () {
  async function deployFallBackAndRecieveFixture() {
    const { deployer } = await getNamedAccounts()

    const FallBackAndRecieveContract = await ethers.getContractFactory(
      "FallBackAndRecieve",
      deployer
    )
    const FallBackAndRecieve = await FallBackAndRecieveContract.deploy()
    await FallBackAndRecieve.deployed()

    return { deployer, FallBackAndRecieve }
  }

  it("Can Recieve Ethers", async function () {
    const { deployer, FallBackAndRecieve } = await loadFixture(
      deployFallBackAndRecieveFixture
    )

    const signer = await ethers.getSigner()

    const initialContractBalance = await ethers.provider.getBalance(
      FallBackAndRecieve.address
    )

    const amountToBeSentToContract = ethers.utils.parseEther("1")
    const sendEthers = await signer.sendTransaction({
      to: FallBackAndRecieve.address,
      value: amountToBeSentToContract,
    })

    const sendEthersTx = await sendEthers.wait()

    const finalContractBalance = await ethers.provider.getBalance(
      FallBackAndRecieve.address
    )

    assert.equal(
      initialContractBalance.add(amountToBeSentToContract).toString(),
      finalContractBalance.toString()
    )
  })

  it("Can Handle UnRecognized Calls", async function () {
    const { deployer, FallBackAndRecieve } = await loadFixture(
      deployFallBackAndRecieveFixture
    )

    const signer = await ethers.getSigner()

    const amountToBeSentToContract = ethers.utils.parseEther("0")
    await expect(
      signer.sendTransaction({
        to: FallBackAndRecieve.address,
        value: amountToBeSentToContract,
        data: "0x0000",
      })
    ).to.be.revertedWith("Invalid Function")
  })
})
