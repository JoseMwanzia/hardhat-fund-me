const {networkConfig, developmentChains} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify")


module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts()
    const chainId  = network.config.chainId


    // if chainId is X use address Y
    // if chainId is Z use address A

    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress;
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[network.name]["ethUsdPriceFeed"]
    }
    


    // If the contract doest exist we deploy a minimal version of our local testing.

    // What happens when we want change chains?
    // When going for a localhost or hardhat we want to use a mock
    const fundMe = await deploy('FundMe', {
        from: deployer,
        args: [ethUsdPriceFeedAddress], // Put the price feed address.
        log: true,
        waitConfirmations: networkConfig[11155111].blockConfirmations || 1,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        // Verify
        await verify(fundMe.address, args)
    }

    log("============================")
}

module.exports.tags = ["all", "fundme"]
