// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@api3/contracts/api3-server-v1/proxies/interfaces/IProxy.sol";

contract Api3AggregatorAdaptor {  

   // Updating the proxy address is a security-critical action which is why
   // we have made it immutable.
   address public immutable proxy;

   constructor(address _proxy) {
       proxy = _proxy;
   }
   
   function latestRoundData() external view
   returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    ) {
      int256 unconverteredAnswer;
      (unconverteredAnswer,updatedAt) = readDataFeed(); // API3 Function
      // Match Decimals
      uint256 _value = uint256(unconverteredAnswer) / 10**10;
      answer = int256(_value);
      //Timestamp same as started At
      startedAt = updatedAt;  
      // Mimic Round Data
      roundId = 18446744073709562881;  // Random round data copied from original oracle
      answeredInRound = 18446744073709562881;
    }

   function readDataFeed() public view returns (int224 value, uint256 timestamp)
   {
       (value, timestamp) = IProxy(proxy).read();
   }       

}
