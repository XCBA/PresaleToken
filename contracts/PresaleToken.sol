//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PresaleToken is Ownable {
    uint public _ticket_price = 100;
    uint public _ticket_token = 10;
    address public _tokenAddr;
    address public USDCAddr = 0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b;

    uint public finishTime;

    constructor(address tokenAddr) {
        require (tokenAddr != address(0), "Null is impossible");
        _tokenAddr = tokenAddr;
        finishTime = block.timestamp + 2 days;
    }

    function getCurrentSupply() external view returns (uint256) {
        return IERC20(_tokenAddr).allowance(owner(), address(this));
    }

    function getLeftSeconds() external view returns (uint256) {
        if (block.timestamp >= finishTime) return 0;
        return finishTime - block.timestamp;
    }

    function buyTicket(uint cnt) external returns (bool) {
        uint total_price = _ticket_price * cnt;

        require(block.timestamp <= finishTime, "Time over");
        require(cnt * _ticket_token <= this.getCurrentSupply(), "Too much ticket");
        require(IERC20(USDCAddr).allowance(msg.sender, address(this)) >= total_price, "Not enough pay");        
        
        IERC20(USDCAddr).transferFrom(msg.sender, address(this), total_price);
        IERC20(_tokenAddr).transferFrom(owner(), address(this), _ticket_token * cnt);
        IERC20(_tokenAddr).transfer(msg.sender, _ticket_token * cnt);
        return true;
    }

    function getBalance() external view returns (uint) {
        return IERC20(USDCAddr).balanceOf(address(this));
    }

    function withDraw(address addr) external onlyOwner {
        IERC20(USDCAddr).transfer(addr, this.getBalance());
    }
}