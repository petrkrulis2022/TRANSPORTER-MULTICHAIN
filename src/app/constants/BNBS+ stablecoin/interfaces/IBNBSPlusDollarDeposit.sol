pragma solidity ^0.8.18;

interface IBNBSPlus {
  function mint(address to, uint256 amount, uint256 decimalsOfInput) external;
}

interface IWETH {
  function withdraw(uint256 amount) external;
}

interface IBNBSPlusDeposit {
  // Events
  event StakedWEthAndReceivedBNBSPlus(
    address indexed sender,
    uint256 indexed amountOut
  );
  event NewStablecoinAddressAdded(address stablecoinAddress);
  event StablecoinAddressRemoved(address stablecoinAddress);
  event WEthAddressChanged(address oldWEthAddress, address newWEthAddress);
  event REthAddressChanged(address oldREthAddress, address newREthAddress);
  event BNBTestNetDepositAddressChanged(
    address oldBNBTestNetDepositAddress,
    address newBNBTestNetDepositAddress
  );

  /// @notice Sends stablecoin BNBS+ to the sender, swapping stablecoin(USDC, DAI, USDT etc.) to WETH and then staking it in BNBtestnet.
  /// @dev First manually call Stablecoin contract "Approve" function.
  /// @param tokenIn: The address of the stablecoin contract like USDC, DAI, USDT etc.
  /// @param amountIn: The amount in the stablecoin(USDC, DAI, USDT etc.).
  /// @param decimalsOfInput: Decimal of the stablecoin(USDC, DAI, USDT etc.).
  function depositBNBTestNetAndMintBNBSPlus(
    address tokenIn,
    uint256 amountIn,
    uint256 decimalsOfInput
  ) external returns (uint256 amountOut);

  /// @notice Allows the admin to add a new address for the stablecoin.
  /// @param stablecoinAddress: The stablecoin address.
  function addNewStablecoinAddress(address stablecoinAddress) external;

  /// @notice Allows the admin to remove a address for the stablecoin.
  /// @param stablecoinAddress: The stablecoin address.
  function removeStablecoinAddress(address stablecoinAddress) external;

  /// @notice Allows the admin to change the wEth address.
  /// @param newWEthAddress: The new wEth address.
  function setNewWEthAddress(address newWEthAddress) external;

  /// @notice Allows the admin to change the rEth address.
  /// @param newREthAddress: The new rEth address.
  function setNewREthAddress(address newREthAddress) external;

  /// @notice Allows the admin to change the BNBtestnet deposit address.
  /// @param newBNBTestNetDepositAddress: The new BNBtestnet deposit address.
  function setNewBNBTestNetDepositAddress(
    address newBNBTestNetDepositAddress
  ) external;
}
