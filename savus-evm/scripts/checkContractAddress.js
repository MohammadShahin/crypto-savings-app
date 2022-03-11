const { ethers } = require('hardhat');
const fs = require('fs');

async function checkContractAddress(tokenAddress, contractAddress) {
    const [signer] = await ethers.getSigners();
    let file = fs.readFileSync('../artifacts/contracts/Savus.sol/Savus.json');
    let abi = JSON.parse(file);
    abi = abi.abi;
    const savus = new ethers.Contract(
        tokenAddress,
        abi,
        signer);
    const _contractAddress = await savus.contractAddress();
    if (_contractAddress === contractAddress){
        console.log("The addresses match!")
    }
    else{
        console.log("The addresses don't match!")
    }
}

const savusAddress = "0xd76FB414c2EFFa74FFCDFC73D8d07927763EaA18"
const savingsAddress = "0xc275066477A1f5F15E581f14fb81C9c4f98CDC96";

checkContractAddress(savusAddress, savingsAddress)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });