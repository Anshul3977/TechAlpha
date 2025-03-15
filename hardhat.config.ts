import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.7", // Single compiler version since all contracts are aligned
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts: {
        count: 10, // Ensure enough accounts for testing
      },
    },
    zetaTestnet: {
      url: "https://zeta-chain-testnet.drpc.org",
      chainId: 7001,
      accounts: [
        process.env.PRIVATE_KEY || "",      // Deployer
        process.env.PRIVATE_KEY_2 || "",    // User1
        process.env.PRIVATE_KEY_3 || "",    // User2
        process.env.PRIVATE_KEY_4 || "",    // Sepolia user (used as fourth signer)
      ].filter((key) => key !== ""),        // Filter out empty keys
      gas: 6000000,
      gasPrice: 15000000000,
      timeout: 180000, // Increased timeout for ZetaChain Testnet
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/e9f7b7f9e01145a19745498ad06da8ee",
      chainId: 11155111,
      accounts: [
        process.env.PRIVATE_KEY_4 || "",  // Sepolia user
      ].filter((key) => key !== ""),
      gas: 3000000,
      gasPrice: 2000000000,
      timeout: 60000,
    },
  },
};

export default config;const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.7", // Single compiler version since all contracts are aligned
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts: {
        count: 10, // Ensure enough accounts for testing
      },
    },
    zetaTestnet: {
      url: process.env.ZETA_TESTNET_URL || "https://zeta-chain-testnet.drpc.org",
      chainId: 7001,
      accounts: [
        process.env.PRIVATE_KEY || "",      // Deployer
        process.env.PRIVATE_KEY_2 || "",    // User1
        process.env.PRIVATE_KEY_3 || "",    // User2
        process.env.PRIVATE_KEY_4 || "",    // Sepolia user (used as fourth signer)
      ].filter((key) => key !== ""),        // Filter out empty keys
      gas: 6000000,
      gasPrice: 15000000000,
      timeout: 180000, // Increased timeout for ZetaChain Testnet
    },
    sepolia: {
      url: process.env.SEPOLIA_URL || "https://sepolia.infura.io/v3/e9f7b7f9e01145a19745498ad06da8ee",
      chainId: 11155111,
      accounts: [
        process.env.PRIVATE_KEY_4 || "",  // Sepolia user
      ].filter((key) => key !== ""),
      gas: 3000000,
      gasPrice: 2000000000,
      timeout: 60000,
    },
  },
};