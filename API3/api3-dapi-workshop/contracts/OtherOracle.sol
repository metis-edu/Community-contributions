// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract DataConsumerV3 {
    AggregatorV3Interface internal dataFeed;

    constructor(address _priceFeed) {
        dataFeed = AggregatorV3Interface(_priceFeed);
    }

    function updateOracleSource(address _priceFeed) external {
        dataFeed = AggregatorV3Interface(_priceFeed);
    }

    function getLatestAnswer() public view returns (uint80 roundID, int answer, uint startedAt,uint timeStamp, uint80 answeredInRound) {
        (
            roundID,
            answer,
            startedAt,
            timeStamp,
            answeredInRound
        ) = dataFeed.latestRoundData();
        return (roundID, answer, startedAt, timeStamp, answeredInRound);
    }
}