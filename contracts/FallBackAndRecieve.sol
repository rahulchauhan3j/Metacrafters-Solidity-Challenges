//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/// @title Contract to show usage of recieve and fallback functions
/// @author Rahul Chauhan
/// @notice This contract handles any unrecognized calls and recieves ethers
contract FallBackAndRecieve {
  event Called(string);

  /// @notice Handles any unrecognized calls
  fallback() external {
    revert("Invalid Function");
  }

  /// @notice Recieves ethers
  receive() external payable {
    emit Called("receive");
  }
}
