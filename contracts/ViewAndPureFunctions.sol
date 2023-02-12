//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/// @title Function to demonstrate usage of view and pure functions
/// @author Rahul Chauhan
/// @notice This contract is created as part challenge for Metacrafters Solidity Course
contract ViewAndPure {
  uint256 funds = 200000;
  uint256 constant expectedFunds = 300000;
  uint256 immutable fundsToDonate;

  constructor() {
    fundsToDonate = 100000;
  }

  /// View Function can just view data from blockchain. Not write anything.
  function viewFunction() public view returns (uint256) {
    return funds;
  }

  /// Pure function cannot read or write on blockchain. However reading "constant" values is an exception. See
  /// that I am reading expectedFunds which is a constant
  function pureFunction(uint256 x) public pure returns (uint256) {
    return x + expectedFunds;
  }
}
