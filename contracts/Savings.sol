// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Savus.sol";

contract Savings is Ownable {

    // event Receive
    Savus public savus = Savus(0x5BEddCddAb781d1b01073231A9B6DF5828DDA042);

    mapping (address => uint) etherBalances;
    mapping (address => bool) savusBalances;
    mapping (address => uint) goalAmounts;
    mapping (address => uint) expirations;

    constructor () {}

    function deposit(uint _goalAmount, uint duration) external payable {
        require(goalAmounts[msg.sender] == 0);
        require(_goalAmount > 0);

        goalAmounts[msg.sender] = _goalAmount;
        etherBalances[msg.sender] = msg.value;
        expirations[msg.sender] = block.timestamp + duration;
        savusBalances[msg.sender] = true;

        savus.transfer(msg.sender, 10 ** 18);
    }

    receive() external payable {
        require(goalAmounts[msg.sender] != 0);
        etherBalances[msg.sender] += msg.value;
    }

    function withdrawAll() public{
        require(block.timestamp >= expirations[msg.sender]);
        require(goalAmounts[msg.sender] > 0);
        require(etherBalances[msg.sender] >= goalAmounts[msg.sender]);
        require(savusBalances[msg.sender]);
        require(savus.balanceOf(msg.sender) == 10 ** 18);

        uint balance = etherBalances[msg.sender];
        etherBalances[msg.sender] = 0;
        goalAmounts[msg.sender] = 0;
        savusBalances[msg.sender] = false;
        expirations[msg.sender] = 0;

        savus.burn(msg.sender, savus.balanceOf(msg.sender));
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success);
    }

    function getSavusBalances(address key) public view returns (bool){
        return savusBalances[key];
    }
}
