import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-etherscan';
import * as dotenv from 'dotenv';
dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.7',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.GOERLI_PRIVATE_KEY ?? ''],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
