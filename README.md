# Gauntlet NFT Collection Airdrop

### Task 2.1 - Gauntlet NFT Collection

Task is to create an NFT smart contract in Solidity using Hardhat. You don’t need to write any tests. For token URIs, you can use the ones we prepare for you, or you can deploy them yourself.

ipfs://bafkreicbkftsc4s22oxprpvsl5uaaf4cpfks3w4zzvray7jyqjzt4fwyva
ipfs://bafkreifi4muorklcznc6iwcagjqrxcjaerwp3lyjlqsjyyuzbmdchw3ot4
ipfs://bafkreigbim6uegdc2fchseznzq6r6erwj3cw3m6rb5wegbbuspv3ivu4cu
ipfs://bafkreifbpacsnom4lpccogwlgmw6ot74o4e3v2nalththljg7qvrpz662u
ipfs://bafybeicl7zisdevjfdgrsh7jk5unbjirr3ozxaepwue3ar7iaz5254bgfa
ipfs://bafkreifqdtvm7c4xvp6ln5yg4fxb6pbbah3dylzp7rmpil6lng4dw226w4

#### Task Goals:

Learning about ERC-721 Standard

Using OpenZeppelin

Learning about NFT metadata

Learning about IPFS

Learning about Hardhat

Deploy smart contract to Goerli testnet

Verify it on Etherscan

### Task 2.2 - NFT Airdrop campaign

Your task is to use NFT smart contract created in the previous step and to create an NFT airdrop smart contract. Eligible addresses are MVPW Airline Token 0x71bDd3e52B3E4C154cF14f380719152fd00362E7 holders. We will use Uniswap’s Merkle Distributor format. You must create a Merkle Tree with eligible addresses and provide its root to Airdrop smart contract. The user needs to come to your contract and try to “claim” NFT. The Airdrop smart contract must verify if the caller is eligible for a drop.
Use Hardhat for writing tests.

#### Task Goals:

Implement all functionalities using the Checks-Effects-Interactions pattern

Deploy smart contract to Goerli testnet

Write testing scenarios

### Hardhat

Hardhat is the smart contract development framework used for building, testing, and deploying smart contracts. It is extremely popular among developers due to its wide pallet of features and community plugins. Test and scripts are written in JavaScript/TypeScript. We highly recommend using TypeScript.

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
