require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
const dotenvenc = require("@chainlink/env-enc");
dotenvenc.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    metissepolia: {
      url: process.env.METIS_SEPOLIA_RPC_URL || "",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
