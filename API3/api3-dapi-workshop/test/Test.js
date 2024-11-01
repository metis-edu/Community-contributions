const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("dAPI", function () {
  async function deployBefore() {
    // Set the price we are expecting to get from the DAPI
    // For ease I'm making ETH work 1000 USD, you can change this price but will reflect the amount of tokens you recieve
    const price = ethers.parseEther("1000");
    // We get the current time from Hardhat Network
    const timestamp = await time.latest();

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const MockDapi = await ethers.getContractFactory("MockDapiProxy");
    const mockDapi = await MockDapi.deploy();
    await mockDapi.waitForDeployment();

    //Set our mock values for the dAPI to return
    //We can't call oracles on local node, so we are making our own
    await mockDapi.setDapiValues(price, timestamp);

    const API3Oracle = await ethers.getContractFactory("API3PriceFeed");
    const api3oracle = await API3Oracle.deploy();
    await api3oracle.waitForDeployment();

    //Set our mock Proxy address that will return static values
    await api3oracle.setProxyAddress(mockDapi.getAddress());

    const MockOtherOracle = await ethers.getContractFactory("MockAggregatorV3");
    const mockOtherOracle = await MockOtherOracle.deploy();
    await mockOtherOracle.waitForDeployment();

    const OtherOracle = await ethers.getContractFactory("DataConsumerV3");
    const otherOracle = await OtherOracle.deploy(mockOtherOracle.getAddress());
    await otherOracle.waitForDeployment();

    const Adaptor = await ethers.getContractFactory("Api3AggregatorAdaptor");
    const adaptor = await Adaptor.deploy(mockDapi.getAddress());
    await adaptor.waitForDeployment();

    return { api3oracle, otherOracle, adaptor, mockDapi, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { api3oracle, owner } = await loadFixture(deployBefore);
      expect(await api3oracle.owner()).to.equal(owner.address);
    });
  });

  describe("Set Price Feed", function () {
    it("Only we can set the price feed", async function () {
      const { api3oracle, owner, otherAccount } = await loadFixture(deployBefore);
      await expect(
        api3oracle
          .connect(otherAccount)
          .setProxyAddress("0x13d1Ed8c24911d88e6155cE32A66908399C97924")
      ).to.be.revertedWith("Ownable: caller is not the owner");
      await api3oracle.setProxyAddress(
        "0x13d1Ed8c24911d88e6155cE32A66908399C97924"
      );
    });
  });

  describe("Other Oracle", function () {
    it("Read Other Oracle", async function () {
      const { api3oracle, otherOracle, owner } = await loadFixture(deployBefore);
        let { roundId, answer, startedAt, timestamp, answeredInRound } = await otherOracle.getLatestAnswer();
        // console.log("Round ID: ", roundId);
        console.log("Answer: ", answer.toString());
    });

    it("Reads from API3 Oracle through adapter", async function () {
        const { api3oracle, otherOracle, adaptor, mockDapi, owner } = await loadFixture(deployBefore);
        await otherOracle.updateOracleSource(adaptor.getAddress());
        let { roundId, answer, startedAt, timestamp, answeredInRound } = await otherOracle.getLatestAnswer();
        // console.log("Round ID: ", roundId);
        console.log("Answer: ", answer.toString());
        // console.log("Timestamp: ", timestamp.toString());
        console.log("Answered in Round: ", answeredInRound.toString());
    });
  });
  
});
