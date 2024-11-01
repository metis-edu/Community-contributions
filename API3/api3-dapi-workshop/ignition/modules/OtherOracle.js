const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Deploy", (m) => {

  const ETHUSD = "0x3BBe70e2F96c87aEce7F67A2b0178052f62E37fE"; // Chainlink ETH/USD Metis Mainnet

  const DataConsumerV3 = m.contract("DataConsumerV3", [ETHUSD]);

  return { DataConsumerV3 };
});
