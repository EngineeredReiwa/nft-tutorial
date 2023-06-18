/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

/* defined tasks */
require("./scripts/deploy.js");

const { ALCHEMY_KEY, ACCOUNT_PRIVATE_KEY } = process.env;

module.exports = {
    solidity: "0.8.1",
    defaultNetwork: "maticmum",
    networks: {
        hardhat: {},
        rinkeby: {
            url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_KEY}`,
            accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
        },
        goerli: {
            url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_KEY}`,
            accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
            // url: process.env.API_URL,
            // accounts: [`0x${process.env.PRIVATE_KEY}`],
        },
        maticmum: {
            chainId: 80001,
            url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_KEY}`,
            accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
        },
        ethereum: {
            chainId: 1,
            url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
            accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
        },
        // etherscan: {
        //     apiKey: process.env.ETHERSCAN_API_KEY,
        // },
    },
};
