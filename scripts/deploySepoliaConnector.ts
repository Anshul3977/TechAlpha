import { ethers } from "hardhat";

async function main() {
  const predictionMarketAddress = "0xB90A62694A6e49598D305343eC4724c8Ef33EAC7"; // Current PredictionMarket address
  const SepoliaConnector = await ethers.getContractFactory("SepoliaConnector");
  const sepoliaConnector = await SepoliaConnector.deploy(predictionMarketAddress);
  await sepoliaConnector.waitForDeployment();
  console.log("SepoliaConnector deployed to:", await sepoliaConnector.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});