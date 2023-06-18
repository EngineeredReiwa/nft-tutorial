const { ethers } = require("ethers");
const { Network } = require("@ethersproject/networks");

// const matic = {
//     name: "matic",
//     chainId: 137,
//     _defaultProvider: (providers) =>
//         new providers.JsonRpcProvider("https://rpc-mainnet.maticvigil.com/"),
// };

const maticmum = {
    name: "maticmum",
    chainId: 80001,
    _defaultProvider: (providers) =>
        new providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/"),
};

// import those networks where ever you want to use it with getDefaultProvider
const provider = ethers.getDefaultProvider(maticmum);

// Helper method for fetching environment variables from .env
function getEnvVariable(key, defaultValue) {
    if (process.env[key]) {
        return process.env[key];
    }
    if (!defaultValue) {
        throw `${key} is not defined and no default value was provided`;
    }
    return defaultValue;
}

// Helper method for fetching a connection provider to the Ethereum network
function getProvider() {
    const alchemyProvider = new ethers.providers.AlchemyProvider(
        getEnvVariable("NETWORK"),
        getEnvVariable("ALCHEMY_KEY")
    );
    const infuraProvider = new ethers.providers.InfuraProvider(
        getEnvVariable("NETWORK"),
        getEnvVariable("INFURA_KEY")
    );
    return new ethers.providers.FallbackProvider([
        { provider: alchemyProvider, priority: 1 },
        { provider: infuraProvider, priority: 2 },
    ]);

    // return ethers.getDefaultProvider(getEnvVariable("NETWORK", "maticmum"), {
    //     alchemy: getEnvVariable("ALCHEMY_KEY", undefined),
    // });
}

// Helper method for fetching a wallet account using an environment variable for the PK
function getAccount() {
    return new ethers.Wallet(
        getEnvVariable("ACCOUNT_PRIVATE_KEY", undefined),
        getProvider()
    );
}

module.exports = {
    getEnvVariable,
    getProvider,
    getAccount,
};
