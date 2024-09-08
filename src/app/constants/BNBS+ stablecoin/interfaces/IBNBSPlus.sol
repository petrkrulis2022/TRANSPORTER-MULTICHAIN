//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IBNBSPlus {
  /// @notice Mint new BNBS+ tokens.
  /// @param to: The address to which they will be sent.
  /// @param amount: The amount to be minted.
  /// @param decimalsOfInput: Decimal of the stablecoin(USDC, DAI, USDT etc.).
  function mint(address to, uint256 amount, uint256 decimalsOfInput) external;
}
