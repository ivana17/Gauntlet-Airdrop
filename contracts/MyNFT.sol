// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 public totalMinted;
    string[3] internal tokenURIs;
    mapping(address => bool) internal minters;
    event MyNFTMinted(address minter, address to);

    constructor() ERC721("MyNFT", "MNF") {
        minters[msg.sender] = true;
        totalMinted = 0;
        
        tokenURIs = [
            "ipfs://bafkreifqdtvm7c4xvp6ln5yg4fxb6pbbah3dylzp7rmpil6lng4dw226w4",
            "ipfs://bafybeicl7zisdevjfdgrsh7jk5unbjirr3ozxaepwue3ar7iaz5254bgfa",
            "ipfs://bafkreifi4muorklcznc6iwcagjqrxcjaerwp3lyjlqsjyyuzbmdchw3ot4"
        ];
    }

    function allowMint(address to) external onlyOwner {
        minters[to] = true;
    }

    function mintNft(address to) public returns (uint256) {
        require(minters[msg.sender], "Invalid minter account.");
        uint256 newId = totalMinted;
        _safeMint(to, newId);
        _setTokenURI(newId, tokenURIs[newId % tokenURIs.length]);
        totalMinted += 1;
        emit MyNFTMinted(msg.sender, to);
        return newId;
    }

    function _burn(uint256 _tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(_tokenId);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(_tokenId);
    }
}
