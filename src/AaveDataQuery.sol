// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "./IAaveLendingPool.sol";

contract AaveDataQuery {
    IAaveLendingPool public aaveLendingPool;

    constructor(address _aaveLendingPool) {
        aaveLendingPool = IAaveLendingPool(_aaveLendingPool);
    }

    function getReserveData(
        address _asset
    )
        external
        view
        returns (
            uint256 unbacked,
            uint256 accruedToTreasuryScaled,
            uint256 totalAToken,
            uint256 totalStableDebt,
            uint256 totalVariableDebt,
            uint256 liquidityRate,
            uint256 variableBorrowRate,
            uint256 stableBorrowRate,
            uint256 averageStableBorrowRate,
            uint256 liquidityIndex,
            uint256 variableBorrowIndex,
            uint40 lastUpdateTimestamp
        )
    {
        return aaveLendingPool.getReserveData(_asset);
    }
}
