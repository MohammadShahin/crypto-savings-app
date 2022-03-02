// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Savus is ERC20, ERC20Burnable, Ownable {

    address public ownerAddress; 
    address public contractAddress;

    constructor() ERC20("Savus", "SVS") {
        ownerAddress = msg.sender;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function setContractAdress(address _contractAdress) public onlyOwner{
        contractAddress = _contractAdress;
    }

    function burn(address account, uint256 amount) public {
        require(msg.sender == contractAddress || msg.sender == ownerAddress);
        _burn(account, amount);
    }
}
