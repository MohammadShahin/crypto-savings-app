const { ethers } = require('hardhat');
const fs = require('fs');

async function mint() {
    const [signer] = await ethers.getSigners();
    let file = fs.readFileSync('../artifacts/contracts/Savus.sol/Savus.json');
    let abi = JSON.parse(file);
    abi = abi.abi;
    const savus = await new ethers.Contract(
        "0x5BEddCddAb781d1b01073231A9B6DF5828DDA042",
        abi,
        signer);
    await savus.mint("0xA6745199cA68bb541E647A4d9B401202378bF0c0", ethers.utils.parseEther("10000"));
    console.log("minted!")
}

mint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });