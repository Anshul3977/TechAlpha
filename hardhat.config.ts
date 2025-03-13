import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    zetaTestnet: {
      url: "https://zeta-chain-testnet.drpc.org",
      chainId: 7001,
      accounts: [
        process.env.PRIVATE_KEY || "",      // Deployer
        process.env.PRIVATE_KEY_2 || "",    // User1
        process.env.PRIVATE_KEY_3 || "",    // User2
      ].filter((key) => key !== ""),        // Filter out empty keys
      gas: 6000000,
      gasPrice: 15000000000,
      timeout: 120000,
    },
  },
};

export default config;