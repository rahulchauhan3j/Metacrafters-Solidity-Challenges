// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract storeData {
  struct personData {
    address addr;
    string FirstName;
    string LastName;
  }

  personData public data;

  function populateData(
    address _addr,
    string memory _firstName,
    string memory _lastName
  ) public {
    data = personData(_addr, _firstName, _lastName);
  }
}

contract proxyStoreData {
  struct personData {
    address addr;
    string FirstName;
    string LastName;
  }

  personData public data;

  address public contractAddress;

  function populateData(
    address _addr,
    string memory _firstName,
    string memory _lastName
  ) public {
    (bool success, ) = contractAddress.delegatecall(
      abi.encodeWithSignature(
        "populateData(address,string,string)",
        _addr,
        _firstName,
        _lastName
      )
    );
  }

  function setContractAddress(address _contractAddress) public {
    contractAddress = _contractAddress;
  }
}
