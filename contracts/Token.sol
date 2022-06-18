//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.0;

// We import this library to be able to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// This is the main building block for smart contracts.
contract Token is ERC20 {
    uint256 initialSupply = 1000000_000000_000000_000000;

    constructor() ERC20("Oliver618", "OLE") {
        _mint(msg.sender, initialSupply);
    }
}