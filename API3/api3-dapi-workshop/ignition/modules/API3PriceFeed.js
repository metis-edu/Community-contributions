const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Deploy", (m) => {

  const API3PriceFeed = m.contract("API3PriceFeed");

  return { API3PriceFeed };
});
