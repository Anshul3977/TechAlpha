import { ethers } from "hardhat";

async function main() {
  const systemContractAddress = "0x91d18e54DAf4F677cB28167158d6F955763F066"; // ZetaChain Testnet SystemContract (from ZetaChain docs)
  const predictionMarketAddress = "0xB482f529b118d21759eB53d94450a20Edeb78344"; // Current PredictionMarket address
  const SepoliaConnector = await ethers.getContractFactory("SepoliaConnector");
  const sepoliaConnector = await SepoliaConnector.deploy(systemContractAddress, predictionMarketAddress);
  await sepoliaConnector.waitForDeployment();
  console.log("SepoliaConnector deployed to:", await sepoliaConnector.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});