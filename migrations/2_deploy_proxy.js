const BRegistry = artifacts.require("BRegistry");
const ExchangeProxy = artifacts.require("ExchangeProxy");
const WETH9 = artifacts.require("WETH9");

module.exports = async function(deployer, network, accounts) {
    if (network == 'development' || network == 'coverage') {
        await deployer.deploy(WETH9);
        await deployer.deploy(ExchangeProxy, WETH9.address);
    } else if (network == 'kovan-fork' || network == 'kovan') {
        const WETH = '0xd0A1E359811322d97991E03f863a0C30C2cF029C';
        const BFactory = '0x0728eA2885818759c4adD023C4B234D3e3fDf209';

        const registry = await deployer.deploy(BRegistry, BFactory)
        const proxy = await deployer.deploy(ExchangeProxy, WETH);
        await proxy.setRegistry(BRegistry.address);
    }

    await deployer.deploy(BRegistry, process.env.BFACTORY_ADDRESS)
    const proxy = await deployer.deploy(ExchangeProxy, process.env.WETH_ADDRESS);
    await proxy.setRegistry(BRegistry.address);
}
