// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// As specified in the challenge 4 events have been created and they are tested using javascript (see test folder Test-Events-Challenge.js)
contract EventsChallenge {
  uint256 public totalFunds;
  address public owner;

  event contractCreated(address indexed _owner, uint256 _funds); // Event for constructor
  event ownerChanged(address indexed _owner, string message); // Event for the function which assigns a new owner
  event fundsRecieved(address indexed _from, uint256 _amount); // Event for Fund Recieved
  event fundsReleased(address indexed _from, uint256 _amount); // Event for Fund Release
  error notOwner();

  constructor() payable {
    owner = msg.sender;
    totalFunds += msg.value;
    emit contractCreated(owner, msg.value); // Event emitted
  }

  function changeOwner(address _newOwner) external {
    if (msg.sender != owner) {
      revert notOwner();
    }
    owner = _newOwner;
    emit ownerChanged(_newOwner, "Owner Changed"); // Event emitted
  }

  function recieveFunds() external payable {
    emit fundsRecieved(msg.sender, msg.value); // Event emitted
  }

  function releaseFunds() external payable {
    if (msg.sender != owner) {
      revert notOwner();
    }
    totalFunds = 0;
    uint256 balanceToBeReleased = address(this).balance;
    (bool success, ) = payable(msg.sender).call{value: address(this).balance}(
      ""
    );

    require(success, "transfer failed");
    emit fundsReleased(msg.sender, balanceToBeReleased); // Event emitted
  }
}
