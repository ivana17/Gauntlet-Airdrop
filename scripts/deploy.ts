import { ethers } from 'hardhat';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

async function main() {
  const whitelist: string[] = [
    '0xc5f4cfbcc2389528f8d464ef13237773132383f1',
    '0xe834717ecfb5e21cd712d5f41c249e36bb422c88',
    '0xbde8d21cb5b3c8f9b1c1b30214de56804fd9e47e',
    '0xafd01787061442136a8fc3a57bb8a458e8dc983b',
    '0xbd4c9639cb942a1c01f5418492fca0fca9aa1dd9',
    '0x0b3233fe361955d0fb9796d89eeadc834c21f3fc',
    '0x275986f4f52a03a24c926616e53165bc27edf65e',
    '0x233dda0e69dd6ef055f033ee824ff5f9a3bd247b',
    '0x52641a84f69c900f48ae646074b9c674510f1483',
    '0xa120690093dcd21a987c02eeb5f1e0b851b940a5',
    '0x9670565d943d1dce25e842e9666da047c55e1bcf',
    '0xebabce467b8e7f154a35977e26e020aa9eca5b99',
    '0x113cafef1bd8d119ac4af2fd69a35ba9a93939cd',
    '0xad6293a4a535a0fab0e5e659159a9c13ac69a0d9',
    '0x53e9ffb66ba92bbc32c0b8f23e189fd8c75c9a60',
    '0x756934eebd9d245956eb279ffe60bae37783ee48',
    '0x75df968c4e7306dfab9562948f64e905b97ed47c',
    '0xf91c3c481079ed4cb02174bfbbbd7a8569a16fde',
  ];

  const MyNFT = await ethers.getContractFactory('MyNFT');
  const myNFTDeployed = await MyNFT.deploy();
  await myNFTDeployed.deployed();
  console.log(`Deployed MyNFT to address ${myNFTDeployed.address}`);

  const leaves = whitelist.map((x) => keccak256(x).toString('hex'));
  const merkleTree = new MerkleTree(leaves, keccak256, { sort: true });
  const root = merkleTree.getHexRoot();
  console.log(`Merkle root: ${root}`);

  const MyAirdrop = await ethers.getContractFactory('MyAirdrop');
  const myAirdropDeployed = await MyAirdrop.deploy(myNFTDeployed.address, root);
  await myAirdropDeployed.deployed();
  console.log(`Deployed MyAirdrop to address ${myAirdropDeployed.address}`);

  await myNFTDeployed.allowMint(myAirdropDeployed.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
