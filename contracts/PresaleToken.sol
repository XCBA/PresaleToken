//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PresaleToken is Ownable {
    uint public _ticket_price = 100;
    uint public _ticket_token = 10;
    address _tokenAddr;

    constructor(address tokenAddr) {
        require (tokenAddr != address(0), "Null is impossible");
        _tokenAddr = tokenAddr;
    }

    function getCurrentSupply() external view returns (uint256) {
        return IERC20(_tokenAddr).allowance(_tokenAddr, address(this));
    }
}