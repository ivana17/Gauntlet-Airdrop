import { ethers } from 'hardhat';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

describe('MyNFT Airdrop', function () {
  async function deployTokenFixture() {
    const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();

    const MyNFT = await ethers.getContractFactory('MyNFT');
    const myNFT = await MyNFT.deploy();

    const leaves = [addr1, addr2, addr3].map((x) =>
      keccak256(x.address).toString('hex')
    );
    const merkleTree = new MerkleTree(leaves, keccak256, { sort: true });
    const root = merkleTree.getHexRoot();

    const MyAirdrop = await ethers.getContractFactory('MyAirdrop');
    const myAirdrop = await MyAirdrop.deploy(myNFT.address, root);

    await myNFT.allowMint(myAirdrop.address);

    return {
      myNFT,
      owner,
      addr1,
      addr2,
      addr3,
      addr4,
      merkleTree,
      root,
      myAirdrop,
    };
  }

  it('Should allow MyAirdrop contract to mint MyNFT', async function () {
    const { myNFT, myAirdrop, addr1 } = await loadFixture(deployTokenFixture);
    await expect(
      myNFT.connect(myAirdrop.signer).mintNft(addr1.address)
    ).not.to.be.revertedWith('Invalid minter account.');
  });

  it('Should claim MyNFT', async function () {
    const { myAirdrop, addr2, merkleTree } = await loadFixture(
      deployTokenFixture
    );
    const proof = merkleTree.getHexProof(keccak256(addr2.address));
    await expect(myAirdrop.connect(addr2).claim(proof)).not.to.be.revertedWith(
      'Invalid Merkle proof.'
    );
  });

  it("Shouldn't allow random address to claim MyNFT", async function () {
    const { myAirdrop, addr4, merkleTree } = await loadFixture(
      deployTokenFixture
    );
    const proof = merkleTree.getHexProof(keccak256(addr4.address));
    const badProof = proof.slice(0, -1);
    await expect(myAirdrop.connect(addr4).claim(badProof)).to.be.revertedWith(
      'Invalid Merkle proof.'
    );
  });

  it("Shouldn't claim MyNFT with incorrect proof", async function () {
    const { myAirdrop, addr2, merkleTree } = await loadFixture(
      deployTokenFixture
    );
    const proof = merkleTree.getHexProof(keccak256(addr2.address));
    const badProof = proof.slice(0, -1);
    await expect(myAirdrop.connect(addr2).claim(badProof)).to.be.revertedWith(
      'Invalid Merkle proof.'
    );
  });

  it("Shouldn't claim MyNFT more than once", async function () {
    const { myAirdrop, addr3, merkleTree } = await loadFixture(
      deployTokenFixture
    );
    const proof = merkleTree.getHexProof(keccak256(addr3.address));
    await myAirdrop.connect(addr3).claim(proof);
    await expect(myAirdrop.connect(addr3).claim(proof)).to.be.revertedWith(
      'NFT already claimed.'
    );
  });

  it('Should emit NFTClaimed event', async function () {
    const { myAirdrop, addr3, merkleTree } = await loadFixture(
      deployTokenFixture
    );
    const proof = merkleTree.getHexProof(keccak256(addr3.address));
    await expect(myAirdrop.connect(addr3).claim(proof))
      .to.emit(myAirdrop, 'NFTClaimed')
      .withArgs(addr3.address);
  });
});
