// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SaveAddress {
    string ipfsHash;

    function saveHash(string memory x) public {
        ipfsHash = x;
    }
    function getHash(string memory y) public view returns (string memory x) {
        return ipfsHash;
    }
}  