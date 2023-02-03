// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract StorageAndMemory {
  address public user; // storage variable

  function setUser(address _owner) public {
    user = _owner; //_owner is memory type variable
  }
}
