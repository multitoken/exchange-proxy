const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
    networks: {
        development: {
            host: 'localhost', // Localhost (default: none)
            port: 8545, // Standard Ethereum port (default: none)
            network_id: '*', // Any network (default: none)
            gas: 10000000,
        },
        coverage: {
            host: 'localhost',
            network_id: '*',
            port: 8555,
            gas: 0xfffffffffff,
            gasPrice: 0x01,
        },
        kovan: {
            host: 'localhost',
            port: 8545,
            network_id: 42,
            gasPrice: 10000000000, // 10 gwei
            gas: 6900000,
            from: process.env.ETH_FROM,
        },
        matic: {
            provider: () => new HDWalletProvider([process.env.DEPOYER_PRIVATE_KEY], 'https://youthful-goldstine:popper-exodus-dart-shove-outwit-subtly@nd-980-590-469.p2pify.com'),
            network_id: 137,
            confirmations: 0,
            timeoutBlocks: 200,
            skipDryRun: true,
            disableConfirmationListener: true,
            deploymentPollingInterval: 16000,
            gasPrice: 15000000000, // 15 Gwei
        },
        bsc: {
            provider: () => new HDWalletProvider([process.env.DEPOYER_PRIVATE_KEY], 'https://bsc-dataseed.binance.org'),
            network_id: 56,
            confirmations: 1,
            timeoutBlocks: 200,
            skipDryRun: true,
            gasPrice: 5000000000, // 5 Gwei
            // gas: 6722000,
        },
    },
    // Configure your compilers
    compilers: {
        solc: {
            version: '0.5.12',
            settings: { // See the solidity docs for advice about optimization and evmVersion
                optimizer: {
                    enabled: true,
                    runs: 100,
                },
                evmVersion: 'byzantium',
            },
        },
    },
};
