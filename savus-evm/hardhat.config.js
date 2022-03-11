/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 
require('@nomiclabs/hardhat-waffle')

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
}); 

module.exports = {
solidity: {
  version: "0.8.4",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
},
networks: {
  rinkeby: {
    url: "https://rinkeby.infura.io/v3/47cb6811574c4dbb91040ee2691d758d",
    accounts: [
      ""
    ] // add your Ethereum key here (private key)
  },
}
};
