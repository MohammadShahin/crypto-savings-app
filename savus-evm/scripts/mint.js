const { ethers } = require('hardhat');
const fs = require('fs');

async function mint(tokenAddress, to, amount) {
    const [signer] = await ethers.getSigners();
    let file = fs.readFileSync('../artifacts/contracts/Savus.sol/Savus.json');
    let abi = JSON.parse(file);
    abi = abi.abi;
    const savus = new ethers.Contract(
        tokenAddress,
        abi,
        signer);
    await savus.mint(to, ethers.utils.parseEther(amount.toString()));
    console.log("minted!")
}

const savusAddress = "0x2e462F25C1E09f6687d787aE087786d137905BfD"
const savingsAddress = "0x1C0e1eE325b1a7b79777B6Db16993068936185b0";

const amount = 10000;

mint(savusAddress, savingsAddress, amount)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
