// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@api3/contracts/api3-server-v1/proxies/interfaces/IProxy.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract API3PriceFeed is Ownable {

    address public proxyAddress;

    constructor(){}

    // Updating the proxy contract address is a security-critical
    // action. In this example, only the owner is allowed to do so.
    // Get your pricefeed at https://market.api3.org/dapis
    function setProxyAddress(address _proxyAddress) public onlyOwner {
        proxyAddress = _proxyAddress;
    }

    function readDataFeed() public view returns (uint256, uint256) {
        (int224 value, uint256 timestamp) = IProxy(proxyAddress).read();
        //convert price to UINT256
        uint256 price = uint224(value);
        return (price, timestamp);
    }
}