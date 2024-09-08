//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {IBNBTestNetAccessContract} from "./interfaces/IBNBTestNetAccessContract.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

// Custom errors
error BNBTestNetAccessContract_ZeroAddress();
error BNBTestNetAccessContract_NotHaveAccess(address sender);
error BNBTestNetAccessContract_AlreadyAvailableContractAdded(address availableContract);

/// @notice BNBTestNetAccessContract contract through which it provides access to certain functions.
contract BNBTestNetAccessContract is Ownable2Step, IBNBTestNetAccessContract {
  mapping(address => bool) public availableContracts;

  modifier onlyAvailableContract() {
    if (!availableContracts[msg.sender])
      revert BNBTestNetAccessContract_NotHaveAccess(msg.sender);
    _;
  }

  modifier zeroAddress(address _address) {
    if (_address == address(0)) revert BNBTestNetAccessContract_ZeroAddress();
    _;
  }

  /// @notice Allows the ownable to add a new address for the availableContracts mapping.
  /// @param newContractAddress: The new contract address.
  function addNewAvailableContractAddress(
    address newContractAddress
  ) external zeroAddress(newContractAddress) onlyOwner {
    if (availableContracts[newContractAddress])
      revert BNBTestNetAccessContract_AlreadyAvailableContractAdded(newContractAddress);

    availableContracts[newContractAddress] = true;

    emit NewAvailableContractAddressAdded(newContractAddress);
  }

  /// @notice Allows the ownable to remove a address for the availableContracts mapping.
  /// @param removeContractAddress: The contract address.
  function removeAvailableContractAddress(
    address removeContractAddress
  ) external zeroAddress(removeContractAddress) onlyOwner {
    delete (availableContracts[removeContractAddress]);

    emit AvailableContractAddressRemoved(removeContractAddress);
  }
}
