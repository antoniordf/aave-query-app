// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "forge-std/Script.sol";
import "../src/AaveDataQuery.sol";

contract DeployAaveDataQuery is Script {
    function run() external {
        address aaveContractAddress = 0x3e9708d80f7B3e43118013075F7e95CE3AB31F31; // AAVE contract on the Sepolia Network

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);
        AaveDataQuery aaveDataQuery = new AaveDataQuery(aaveContractAddress);
        console.log("AaveDataQuery deployed at:", address(aaveDataQuery));
        vm.stopBroadcast();
    }
}
