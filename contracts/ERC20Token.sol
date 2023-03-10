// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title  ERC20 Token Contract from Openzeppelin
/// @author Rahul Chauhan
/// @notice This contract enables creation of ERC20 Tokens
contract ERC20Token is ERC20, ERC20Burnable, Ownable {
  uint8 immutable tokendecimals;

  /// Constructor for ERC20 Token Contract
  /// @param _name  ERC20 Token Name
  /// @param _symbol ERC20 Token Symbol
  /// @param _decimals ERC20 Token Decimal Places
  constructor(
    string memory _name,
    string memory _symbol,
    uint8 _decimals
  ) ERC20(_name, _symbol) {
    tokendecimals = _decimals;
  }

  /// Returns Decimal places for token
  function decimals() public view override returns (uint8) {
    return tokendecimals;
  }

  /// Mints Token
  function mint(address to, uint256 amount) public onlyOwner {
    _mint(to, amount);
  }
}
