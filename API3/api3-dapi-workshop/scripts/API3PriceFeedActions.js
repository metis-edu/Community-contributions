// scripts/setProxyAddress.js
const hre = require("hardhat");

async function main() {
  // Define the deployed contract address and proxy address
  const deployedContractAddress = "0x2892e6683ED481CE3c2eD8A7581C91841D1c8235"; // replace with your contract address
  const proxyAddress = "0x5b0AFa44F19e20b95FeB16353Fa55B4600e858fc"; // replace with the actual proxy address from the API3 market

  // Attach to the deployed contract
  const API3PriceFeed = await hre.ethers.getContractFactory("API3PriceFeed");
  const api3PriceFeed = await API3PriceFeed.attach(deployedContractAddress);

  // Call the setProxyAddress function
  const tx = await api3PriceFeed.setProxyAddress(proxyAddress);
  await tx.wait(); // wait for the transaction to be mined

  console.log("setProxyAddress transaction successful:", tx.hash);

  // Call the readDataFeed function to get the latest price and timestamp
  try {
    const [price, timestamp] = await api3PriceFeed.readDataFeed();
    console.log("Latest Price:", price.toString());
    console.log("Timestamp:", timestamp.toString());
  } catch (error) {
    console.error("Error reading data feed:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
