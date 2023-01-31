// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/* msg.value, msg.sender,gasleft() is used in this contract as per challenge. Test cases have been written */
contract GlobalFunctionsChallenge {
  address public lastFundedBy;
  uint256 public lastFundValue;
  uint256 public totalFunds;

  error InsufficientFunds();
  event fundsAdded(address _sender, uint256 _amount, uint256 _gasleft);

  function addFunds() public payable {
    if (msg.value == 0) {
      revert InsufficientFunds();
    }

    totalFunds += msg.value;
    lastFundValue = msg.value;
    lastFundedBy = msg.sender;

    emit fundsAdded(msg.sender, lastFundValue, gasleft());
  }
}
