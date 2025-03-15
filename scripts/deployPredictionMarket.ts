import { ethers } from "hardhat";

async function main() {
  const mockTokenAddress = "0x894dE66A13414c5F06ec24de238577b3bFEa4EB7";
  const PredictionMarket = await ethers.getContractFactory("PredictionMarket");
  const predictionMarket = await PredictionMarket.deploy(mockTokenAddress);
  await predictionMarket.waitForDeployment();
  console.log("PredictionMarket deployed to:", await predictionMarket.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});