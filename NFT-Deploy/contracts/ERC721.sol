// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    uint256 private _currentTokenId;

    constructor() ERC721("MyNFT", "MNFT") {}

    function mint(address to) public {
        _currentTokenId++;
        _mint(to, _currentTokenId);
    }
}