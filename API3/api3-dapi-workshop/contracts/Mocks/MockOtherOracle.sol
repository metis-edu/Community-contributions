// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title This is a mock contract to simulate a dAPI Proxy Contract.

interface AggregatorV3Interface {
    function latestRoundData() external view returns (uint80 roundID, int answer, uint startedAt,uint timeStamp, uint80 answeredInRound);
}

contract MockAggregatorV3 is AggregatorV3Interface {
    uint80 public mockRoundID;
    int public mockAnswer;
    uint public mockStartedAt;
    uint public mockTimeStamp;
    uint80 public mockAnsweredInRound;

    constructor() {
        mockRoundID = 1;
        mockAnswer = 1000;
        mockStartedAt = 100;
        mockTimeStamp = 100;
        mockAnsweredInRound = 1;
    }

    function latestRoundData() external view override returns (uint80, int, uint, uint, uint80) {
        return (mockRoundID, mockAnswer, mockStartedAt, mockTimeStamp, mockAnsweredInRound);
    }
}


// contract MockOtherOracle {

//     uint80 public roundID;
//     int public answer;
//     uint public startedAt;
//     uint public timeStamp;
//     uint80 public answeredInRound;

//     function setValues() external {
//         roundID = 1;
//         answer = 100;
//         startedAt = 100;
//         timeStamp = 100;
//         answeredInRound = 100;
//     }

//     function latestRoundData()
//         external
//         view
//         returns (uint80, int, uint, uint, uint80)
//     {
//         return (roundID, answer, startedAt, timeStamp, answeredInRound);
//     }
// }