// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "./MyNFT.sol";

contract MyAirdrop {
    address public immutable token;
    bytes32 public immutable merkleRoot;

    mapping(address => bool) private claimed;

    event NFTClaimed(address account);

    constructor(address _token, bytes32 _merkleRoot) {
        token = _token;
        merkleRoot = _merkleRoot;
    }

    function claim(bytes32[] calldata merkleProof) external {
        address account = msg.sender;
        require(!claimed[account], "NFT already claimed.");

        bytes32 node = keccak256(abi.encodePacked(account));
        require(
            MerkleProof.verify(merkleProof, merkleRoot, node),
            "Invalid Merkle proof."
        );

        MyNFT(token).mintNft(account);
        claimed[account] = true;

        emit NFTClaimed(account);
    }
}
