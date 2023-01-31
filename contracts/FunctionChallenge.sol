// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract FunctionChallenge {
  uint256 totalFunds;

  /* A Pure Function */
  function calculateSum(uint256 x, uint256 y) public pure returns (uint256) {
    return x + y;
  }

  /* A View Function */
  function viewFunds() public view returns (uint256) {
    return totalFunds;
  }

  /* A Payable Function */
  function addFunds() public payable {
    totalFunds += msg.value;
  }
}
