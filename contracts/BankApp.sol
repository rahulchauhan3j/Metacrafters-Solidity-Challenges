//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract BankApp {
  mapping(address => uint256) userAccount;
  mapping(address => bool) userExists;

  function createAccount() public returns (bool) {
    require(userExists[msg.sender] == false, "Account Already Exists");
    userAccount[msg.sender] = 0;
    userExists[msg.sender] = true;
    return true;
  }

  function accountExists() public view returns (bool) {
    return userExists[msg.sender];
  }

  function accountBalance() public view returns (uint256) {
    require(userExists[msg.sender] == true, "Account doesnt exist");
    return userAccount[msg.sender];
  }

  function deposit() public payable {
    require(userExists[msg.sender] == true, "Account doesnt exist");
    userAccount[msg.sender] += msg.value;
  }

  function withdraw(uint256 withdrawAmount) public {
    require(userExists[msg.sender] == true, "Account doesnt exist");
    require(userAccount[msg.sender] > withdrawAmount, "Insufficent Funds");
    userAccount[msg.sender] -= withdrawAmount;
    (bool success, ) = payable(msg.sender).call{value: withdrawAmount}("");
    if (!success) {
      revert("Transfer Failed");
    }
  }

  function transfer(address reciever, uint256 amount) public {
    require(userExists[msg.sender] == true, "Account doesnt exist");
    require(userAccount[msg.sender] > amount, "Insufficent Funds");
    (bool success, ) = payable(reciever).call{value: amount}("");
    if (!success) {
      revert("Transfer Failed");
    }
  }
}
