//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {IBNBSPlus} from "./interfaces/IBNBSPlus.sol";
import {AccessContract} from "./interfaces/IAccessContract.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/// @notice Stablecoin BNBS+ contract, which BNBS+ tokens are minted at 1 to 1 ratio when someone deposits the same value in the form of stablecoin like (USDC, DAI, USDT etc.)
contract BNBSPlus is IBNBSPlus, ERC20Burnable, AccessContract {
  constructor() ERC20("BNBS+", "BNBS+") {}

  /// @notice Mint new BNBS+ tokens.
  /// @param to: The address to which they will be sent.
  /// @param amount: The amount to be minted.
  /// @param decimalsOfInput: Decimal of the stablecoin(USDC, DAI, USDT etc.).
  function mint(
    address to,
    uint256 amount,
    uint256 decimalsOfInput
  ) external onlyAvailableContract {
    _mint(to, amount * 10 ** (18 - decimalsOfInput));
  }
}
