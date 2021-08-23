const BRegistry = artifacts.require("BRegistry");
const ExchangeProxy = artifacts.require("ExchangeProxy");
const WETH9 = artifacts.require("WETH9");

module.exports = async function(deployer, network, accounts) {
    if (network == 'development' || network == 'coverage') {
        await deployer.deploy(WETH9);
        const proxy = await deployer.deploy(ExchangeProxy, WETH9.address);
        await proxy.setRegistry(BRegistry.address);

        deployer.deploy(TTokenFactory);
        const bFactory = deployer.deploy(BFactory);

        await deployer.deploy(BRegistry, bFactory);
        const proxy = await ExchangeProxy.deployed();
        await proxy.setRegistry(BRegistry.address);
    } else {
        await deployer.deploy(BRegistry, process.env.BFACTORY_ADDRESS)
        const proxy = await deployer.deploy(ExchangeProxy, process.env.WETH_ADDRESS);
        await proxy.setRegistry(BRegistry.address);
    }
}
