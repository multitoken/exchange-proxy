const BRegistry = artifacts.require("BRegistry");
const ExchangeProxy = artifacts.require("ExchangeProxy");
const WETH9 = artifacts.require("WETH9");

module.exports = async function(deployer, network, accounts) {
    if (network == 'kovan-fork' || network == 'kovan') {
        const BFactory = '0x336a59d26F33283eE2A66417c9f763E27e111820';
        const registry = await deployer.deploy(BRegistry, BFactory)
        const proxy = await ExchangeProxy.deployed();
        await proxy.setRegistry(BRegistry.address);
    }
}
