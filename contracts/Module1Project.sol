// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Smart Contract for Module 1 of MetaCrafters Intermediate Solidity Course
// Requirement - Write a smart contract that implements the
// require(), assert() and revert() statements.

contract Module1Project {
  address public owner;
  uint256 private sum;

  modifier onlyOwner() {
    require(msg.sender == owner, "Not Owner"); // require implemented
    _;
  }

  error gameLost();

  constructor() {
    owner = msg.sender;
  }

  function play() external {
    assert(sum < 10);
    sum++;
  }

  function guess(uint256 _sum) external view returns (string memory) {
    if (sum != _sum) {
      revert gameLost();
    }

    return "You Win!!!";
  }

  function reset() external onlyOwner {
    sum = 0;
  }
}
