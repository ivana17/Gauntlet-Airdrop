import { ethers } from 'hardhat';
import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { BigNumber } from 'ethers';

describe('MyNFT contract', function () {
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const MyNFT = await ethers.getContractFactory('MyNFT');
    const myNFT = await MyNFT.deploy();

    return { myNFT, owner, addr1, addr2 };
  }

  it("Shouldn't allow addr1 to mint", async function () {
    const { myNFT, addr1 } = await loadFixture(deployTokenFixture);
    await expect(
      myNFT.connect(addr1).mintNft(addr1.address)
    ).to.be.revertedWith('Invalid minter account.');
  });

  it('Should allow addr1 to mint', async function () {
    const { myNFT, addr1 } = await loadFixture(deployTokenFixture);
    await myNFT.allowMint(addr1.address);
    await expect(
      myNFT.connect(addr1).mintNft(addr1.address)
    ).not.to.be.revertedWith('Invalid minter account.');
  });

  it('Should emit MyNFTMinted event', async function () {
    const { myNFT, addr1, addr2 } = await loadFixture(deployTokenFixture);
    await myNFT.allowMint(addr1.address);
    await expect(myNFT.connect(addr1).mintNft(addr2.address))
      .to.emit(myNFT, 'MyNFTMinted')
      .withArgs(addr1.address, addr2.address);
  });

  it('Should increase total supply', async function () {
    const { myNFT, owner } = await loadFixture(deployTokenFixture);
    const totalSupply = (await myNFT.totalMinted()).toNumber();
    await myNFT.mintNft(owner.address);
    expect((await myNFT.totalMinted()).toNumber()).to.gt(totalSupply);
    // await expect(myNFT.totalMinted()).to.equal(1);
  });
});
