const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Deploy", (m) => {

  const METISUSD = "0x5b0AFa44F19e20b95FeB16353Fa55B4600e858fc"; // METIS/USD from API3 marketplace

  const Api3AggregatorAdaptor = m.contract("Api3AggregatorAdaptor", [METISUSD]);

  return { Api3AggregatorAdaptor };
});