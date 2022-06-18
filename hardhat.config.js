require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

const ALCHEMY_API_KEY = "1ecae8a392624fd09342b2d2526d07a6";
const RINKEBY_PRIVATE_KEY = "6a6791c11b545ee18a38140dec85fd47195b17e4c570942b2b4bd360339ab1d2";

// If you are using MetaMask, be sure to change the chainId to 1337
module.exports = {
  solidity: "0.8.14",
  networks: {
    hardhat: {
      chainId: 31337
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${ALCHEMY_API_KEY}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: '33Y5WCNTV2KVYK7VADA2PK4IMCRUG6ZY38'
  }
};
