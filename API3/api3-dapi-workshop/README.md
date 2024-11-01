# Read and API3 dAPI Price feed to your contract

This project covers two topics.
- How to get your smart contract to read a price feed from a proxy available from  https://market.api3.org/dapis
- How to deploy an adaptor to utilize API3 dAPIs without having to refactor your code if you use another library.

[Video Companion](https://www.youtube.com/watch?v=fkpFUFszA40)

### Files

- `API3PriceFeed.sol` - Base contract setup to receive an API3 price feed
- `OtherOracle.sol` - Simple contract that receives other popular oracles in their native format
- `Adaptor.sol` - The adaptor contract the converts the API3 price feed data to match the format that is required by the other oracle contract.

- `Mock Folders` - Contracts that just return fake data in API3 oracle format and AggregatorV3 format

### How to Execute a Price Feed Read

Deploy the API3PriceFeed.sol contract.  Once deployed, you want to choose the price feed you want to read in your contract by going to https://market.api3.org/dapis

Call the `setProxyAddress` with the address for the price feed.  You can then read the data by calling `readDataFeed`

```
npx hardhat ignition deploy ignition/modules/API3PriceFeed.js --network sepolia
```
You also have the option to verify all deployed contracts after deployment with:
```
npx hardhat ignition verify chain-11155111
```
## Using API3 price oracle with other Oracle formats
### Deploy the other oracle smart contract
You will need to deploy the `OtherOracle` contract using the other oracle setup.  We have it set to default the ETH/USD price feed on Sepolia

```
npx hardhat ignition deploy ignition/modules/OtherOracle.js --network sepolia
```

### How to use the adaptor

Deploy the `Adaptor.sol` contract with the the proxy contract address ([API3 Marketplace](https://market.api3.org/dapis)) that you want it to adapt to the deployed `OtherOracle` contract. For this demo, we are using ETH/USD price feed on Sepolia.

```
npx hardhat ignition deploy ignition/modules/Adaptor.js --network sepolia  
```

Once you have deployed your `Adaptor` contract, you will use that deployed contract address
```
Example:
Deploy#Api3AggregatorAdaptor - 0xBf35d6060d828E573bf10cB0a30D2dab710D5075
```
Input the deployed `Api3AggregatorAdaptor` address onto the `updateOracleSource` function of the `OtherOracle` contract.

Once that is completed, your `OtherOracle` contract will be able to read API3 Price Feeds without a refactor


### Testing

You can test the scenario locally with 
```
npx hardhat test
```
It will take you through the mock tests and show you the flow of setting the adaptor as mentions above and the ability to look a the price feed data intregaton. 

```
it("Reads from API3 Oracle through adapter", async function () {
        const { api3oracle, otherOracle, adaptor, mockDapi, owner } = await loadFixture(deployBefore);
        await otherOracle.updateOracleSource(adaptor.getAddress());
        let { roundId, answer, startedAt, timestamp, answeredInRound } = await otherOracle.getLatestAnswer();
        console.log("Answer: ", answer.toString());
        console.log("Answered in Round: ", answeredInRound.toString());
    });
```

It will console out the original price feed data from the other oracle format and then console log the adjusted format need to be used by the other oracle contract
```
    Other Oracle
Answer:  1000
      ✔ Read Other Oracle
Answer:  100000000000
Answered in Round:  18446744073709562881
      ✔ Reads from API3 Oracle through adapter
```