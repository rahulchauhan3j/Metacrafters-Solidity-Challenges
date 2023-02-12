//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/// @title Interface and Abstract Contract Implementation
/// @author Rahul Chauhan
/// @notice This contract is part of challenges from Metacrafters Intermediate Solidity Course.It shows implementation of interface and abstract contracts

interface Math {
  function sum(uint256 _x, uint256 _y) external pure returns (uint256);

  function mul(uint256 _x, uint256 _y) external pure returns (uint256);
}

abstract contract operations {
  function sum(uint256 _x, uint256 _y) external pure returns (uint256) {
    return _x + _y;
  }

  function mul(uint256 _x, uint256 _y) external pure returns (uint256) {
    return _x * _y;
  }

  function sub(uint256 _x, uint256 _y) external pure virtual returns (uint256);
}

contract allOperations is operations {
  function sub(
    uint256 _x,
    uint256 _y
  ) external pure override returns (uint256) {
    return _x - _y;
  }
}

contract action {
  Math ops;

  constructor(address _address) {
    ops = Math(_address);
  }

  function findSum(uint256 _x, uint256 _y) public view returns (uint256) {
    return ops.sum(_x, _y);
  }

  function findProduct(uint256 _x, uint256 _y) public view returns (uint256) {
    return ops.mul(_x, _y);
  }
}
