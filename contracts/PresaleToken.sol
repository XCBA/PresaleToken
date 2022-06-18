//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PresaleToken is Ownable {
    uint public _ticket_price = 100;
    uint public _ticket_token = 10;
    address public _tokenAddr;
    address public USDCAddr = 0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b;

    constructor(address tokenAddr) {
        require (tokenAddr != address(0), "Null is impossible");
        _tokenAddr = tokenAddr;
    }

    function getCurrentSupply() external view returns (uint256) {
        return IERC20(_tokenAddr).allowance(owner(), address(this));
    }

    function buyTicket(uint cnt) external returns (bool) {
        uint total_price = _ticket_price * cnt;
        IERC20(USDCAddr).transferFrom(msg.sender, address(this), total_price);
        IERC20(_tokenAddr).transferFrom(owner(), address(this), _ticket_token * cnt);
        IERC20(_tokenAddr).transfer(msg.sender, _ticket_token * cnt);
        return true;
    }
}