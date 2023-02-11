//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/// @title A simple contract to store and retrieve person information.
/// @author Rahul Chauhan
/// @notice This is a basic contract created as part of Module 2 assessment of Intermediate Solidity Course of Metacrafters.

contract StoreAndRetrieve {
  /// @dev This is a struct type to store attributes of a person
  struct person {
    string firstName;
    string lastName;
    string nationalId;
    bool verified;
  }

  /// @dev mappings to store address to person relationship.
  mapping(address => person) personData;
  mapping(address => bool) personExists;

  /// @notice This is a function to store person data
  /// @param _address (address of the person being added to storage)
  /// @param _firstName (first name of the person being added to storage)
  /// @param _lastName (last name of the person being added to storage)
  /// @param _nationalId (national id of the person being added to storage)
  function storePersonData(
    address _address,
    string memory _firstName,
    string memory _lastName,
    string memory _nationalId
  ) public {
    personData[_address] = person(_firstName, _lastName, _nationalId, false);
    personExists[_address] = true;
  }

  /// @notice This function retrieves person information based on address supplied
  /// @param _address (address of the person whose information is to be retrieved)
  /// @return firstName of the person
  /// @return lastName of the person
  /// @return nationalId of the person
  function retrievePersonData(
    address _address
  ) public view returns (string memory, string memory, string memory) {
    require(personExists[_address] == true, "Person Does Not Exists");
    return (
      personData[_address].firstName,
      personData[_address].lastName,
      personData[_address].nationalId
    );
  }

  /// @notice This function is used to verify/un-verify a person based on his/her address
  /// @param _address (address of the person to be verified/un-verified)
  /// @param _verified (flag - verify/un-verify)
  function verifyPerson(address _address, bool _verified) public {
    require(personExists[_address] == true, "Person Does Not Exists");
    personData[_address].verified = _verified;
  }

  /// @notice This funtion checks if a person is verified or not
  /// @param _address (address of the person to be checked)
  /// @return boolean flag to confirm if person is verified (true) or un-verified (false)
  function isVerified(address _address) public view returns (bool) {
    require(personExists[_address] == true, "Person Does Not Exists");
    return personData[_address].verified;
  }
}
