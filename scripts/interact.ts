import { ethers } from "hardhat";

// MockERC20 ABI
const mockTokenABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "symbol", "type": "string" },
      { "internalType": "uint256", "name": "initialSupply", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "allowance", "type": "uint256" },
      { "internalType": "uint256", "name": "needed", "type": "uint256" }
    ],
    "name": "ERC20InsufficientAllowance",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "sender", "type": "address" },
      { "internalType": "uint256", "name": "balance", "type": "uint256" },
      { "internalType": "uint256", "name": "needed", "type": "uint256" }
    ],
    "name": "ERC20InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "approver", "type": "address" }
    ],
    "name": "ERC20InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "receiver", "type": "address" }
    ],
    "name": "ERC20InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "sender", "type": "address" }
    ],
    "name": "ERC20InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "name": "ERC20InvalidSpender",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "spender", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "name": "balanceOf",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      { "internalType": "uint8", "name": "", "type": "uint8" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "from", "type": "address" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "transferFrom",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// PredictionMarket ABI
const predictionMarketABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "_zetaToken", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "marketId", "type": "uint256" },
      { "indexed": false, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "outcomeIndex", "type": "uint256" }
    ],
    "name": "BetPlaced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "marketId", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "question", "type": "string" },
      { "indexed": false, "internalType": "string[]", "name": "outcomes", "type": "string[]" },
      { "indexed": false, "internalType": "uint256", "name": "resolutionTime", "type": "uint256" }
    ],
    "name": "MarketCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "marketId", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "winningOutcome", "type": "uint256" }
    ],
    "name": "MarketResolved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "BET_FEE",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_question", "type": "string" },
      { "internalType": "string[]", "name": "_outcomes", "type": "string[]" },
      { "internalType": "uint256", "name": "_resolutionTime", "type": "uint256" }
    ],
    "name": "createMarket",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_marketId", "type": "uint256" }
    ],
    "name": "getOutcomesLength",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "marketBets",
    "outputs": [
      { "internalType": "address", "name": "user", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "outcomeIndex", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "marketCount",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "markets",
    "outputs": [
      { "internalType": "string", "name": "question", "type": "string" },
      { "internalType": "uint256", "name": "resolutionTime", "type": "uint256" },
      { "internalType": "bool", "name": "resolved", "type": "bool" },
      { "internalType": "uint256", "name": "winningOutcome", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_marketId", "type": "uint256" },
      { "internalType": "uint256", "name": "_outcomeIndex", "type": "uint256" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" }
    ],
    "name": "placeBet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_marketId", "type": "uint256" },
      { "internalType": "uint256", "name": "winningOutcome", "type": "uint256" }
    ],
    "name": "resolveMarket",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "zetaToken",
    "outputs": [
      { "internalType": "contract IERC20", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Utility function to add a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  // Get multiple signers (deployer, user1, user2)
  const signers = await ethers.getSigners();
  if (signers.length < 3) {
    throw new Error(`Expected at least 3 signers, but got ${signers.length}. Please configure Hardhat with more accounts or fund additional addresses.`);
  }
  const [deployer, user1, user2] = signers;
  console.log("Deployer account:", deployer.address);
  console.log("User1 account:", user1.address);
  console.log("User2 account:", user2.address);

  // Check deployer ZETA balance (for gas fees)
  const zetaBalance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer ZETA balance:", ethers.formatEther(zetaBalance), "ZETA");

  // Connect to MockERC20
  const mockTokenAddress = "0x894dE66A13414c5F06ec24de238577b3bFEa4EB7";
  const mockToken = new ethers.Contract(mockTokenAddress, mockTokenABI, deployer);

  // Query MockERC20
  const totalSupply = await mockToken.totalSupply();
  console.log("Mock Token total supply:", ethers.formatEther(totalSupply), "MZETA");

  // Check balances for all users
  let deployerBalance = await mockToken.balanceOf(deployer.address);
  let user1Balance = await mockToken.balanceOf(user1.address);
  let user2Balance = await mockToken.balanceOf(user2.address);
  console.log("Deployer Mock Token balance:", ethers.formatEther(deployerBalance), "MZETA");
  console.log("User1 Mock Token balance:", ethers.formatEther(user1Balance), "MZETA");
  console.log("User2 Mock Token balance:", ethers.formatEther(user2Balance), "MZETA");

  // Transfer MZETA to user1 and user2 if they don't have enough
  const requiredAmount = ethers.parseEther("10.01"); // 10 MZETA bet + 0.01 fee
  if (user1Balance < requiredAmount) {
    const transferAmount = ethers.parseEther("20");
    const transferTx = await mockToken.transfer(user1.address, transferAmount);
    await transferTx.wait();
    console.log(`Transferred ${ethers.formatEther(transferAmount)} MZETA to User1`);
    user1Balance = await mockToken.balanceOf(user1.address);
    console.log("User1 new balance:", ethers.formatEther(user1Balance), "MZETA");
  }
  if (user2Balance < requiredAmount) {
    const transferAmount = ethers.parseEther("20");
    const transferTx = await mockToken.transfer(user2.address, transferAmount);
    await transferTx.wait();
    console.log(`Transferred ${ethers.formatEther(transferAmount)} MZETA to User2`);
    user2Balance = await mockToken.balanceOf(user2.address);
    console.log("User2 new balance:", ethers.formatEther(user2Balance), "MZETA");
  }

  // Connect to PredictionMarket
  const predictionMarketAddress = "0xB482f529b118d21759eB53d94450a20Edeb78344";
  const predictionMarket = new ethers.Contract(predictionMarketAddress, predictionMarketABI, deployer);

  // Verify zetaToken address in PredictionMarket
  const zetaTokenAddress = await predictionMarket.zetaToken();
  console.log("PredictionMarket zetaToken address:", zetaTokenAddress);
  console.log("Matches MockERC20 address:", zetaTokenAddress.toLowerCase() === mockTokenAddress.toLowerCase());

  // Check and handle insufficient balance for deployer
  const betAmount = ethers.parseEther("10"); // Bet 10 MZETA
  const betFee = await predictionMarket.BET_FEE(); // 0.01 ether (10^16 wei)
  const totalAmount = betAmount + BigInt(betFee); // Total: 10.01 MZETA
  deployerBalance = await mockToken.balanceOf(deployer.address);
  if (deployerBalance < totalAmount) {
    throw new Error(
      `Insufficient balance for deployer: ${ethers.formatEther(deployerBalance)} MZETA. Required: ${ethers.formatEther(totalAmount)} MZETA. ` +
      `Please fund the account ${deployer.address} with additional MZETA tokens using a faucet or another account.`
    );
  }

  // Check current market count
  const initialMarketCount = await predictionMarket.marketCount();
  console.log("Initial market count:", initialMarketCount.toString());

  // Create a new market with d/acc topic
  const question = "Will AGI be achieved by 2030?"; // d/acc topic: AI safety
  const outcomes = ["Yes", "No"];
  const latestBlock = await ethers.provider.getBlock("latest");
  if (!latestBlock) {
    throw new Error("Failed to fetch the latest block");
  }
  const currentTimestamp = latestBlock.timestamp;
  const resolutionTimeOffset = 300; // Increased to 5 minutes (300 seconds) for testnet reliability
  const resolutionTime = currentTimestamp + resolutionTimeOffset;
  console.log("Creating market with:");
  console.log("Question:", question);
  console.log("Outcomes:", outcomes);
  console.log("Current Block Timestamp:", currentTimestamp);
  console.log("Resolution Time:", resolutionTime);

  const createMarketTx = await predictionMarket.createMarket(question, outcomes, resolutionTime);
  const createMarketReceipt = await createMarketTx.wait();
  console.log("Market creation transaction hash:", createMarketTx.hash);
  console.log("Market creation status:", createMarketReceipt.status === 1 ? "Success" : "Failed");

  // Parse all events from the transaction receipt
  console.log("Parsing transaction logs...");
  const predictionMarketLogs = createMarketReceipt.logs.filter(
    (log) => log.address.toLowerCase() === predictionMarketAddress.toLowerCase()
  );
  const allEvents = predictionMarketLogs.map((log, index) => {
    try {
      const parsedLog = predictionMarket.interface.parseLog(log);
      return { index, parsedLog };
    } catch (e) {
      console.error(`Error parsing log at index ${index}:`, e);
      return null;
    }
  });

  // Log all parsed events for debugging
  console.log("All parsed events:", allEvents.filter((e) => e !== null).map((e) => ({
    index: e!.index,
    name: e!.parsedLog.name,
    args: e!.parsedLog.args,
  })));

  // Find the MarketCreated event
  const marketCreatedEvent = allEvents.find((event) => event && event.parsedLog.name === "MarketCreated")?.parsedLog;

  if (marketCreatedEvent) {
    console.log("MarketCreated event emitted:", {
      marketId: marketCreatedEvent.args.marketId.toString(),
      question: marketCreatedEvent.args.question,
      outcomes: marketCreatedEvent.args.outcomes,
      resolutionTime: marketCreatedEvent.args.resolutionTime.toString(),
    });
  } else {
    console.log("MarketCreated event not found!");
  }

  // Verify market count increased
  const newMarketCount = await predictionMarket.marketCount();
  console.log("New market count:", newMarketCount.toString());

  // Use the marketId from the MarketCreated event
  let marketId;
  if (marketCreatedEvent) {
    marketId = marketCreatedEvent.args.marketId.toString();
  } else {
    marketId = (initialMarketCount).toString(); // Fallback to initial count if event is missing
  }
  console.log("Using marketId:", marketId);

  // Get market details
  const marketDetails = await predictionMarket.markets(marketId);
  console.log("Market details:", {
    question: marketDetails.question,
    resolutionTime: marketDetails.resolutionTime.toString(),
    resolved: marketDetails.resolved,
    winningOutcome: marketDetails.winningOutcome.toString(),
  });

  // Validate market before proceeding
  if (marketDetails.resolutionTime.toString() === "0" || marketDetails.question === "") {
    throw new Error("Market creation failed: Invalid market data (resolutionTime or question is empty)");
  }

  // Place bets from multiple users
  const users = [
    { signer: deployer, betAmount: ethers.parseEther("10"), outcomeIndex: 0 }, // Deployer bets 10 on "Yes"
    { signer: user1, betAmount: ethers.parseEther("5"), outcomeIndex: 0 },    // User1 bets 5 on "Yes"
    { signer: user2, betAmount: ethers.parseEther("10"), outcomeIndex: 1 },   // User2 bets 10 on "No"
  ];

  for (const user of users) {
    // Check current timestamp before placing the bet
    const currentBlock = await ethers.provider.getBlock("latest");
    if (!currentBlock) {
      throw new Error("Failed to fetch the current block");
    }
    const currentBlockTimestamp = currentBlock.timestamp;
    console.log(`Current Block Timestamp before betting for ${user.signer.address}: ${currentBlockTimestamp}`);

    if (currentBlockTimestamp >= resolutionTime) {
      console.warn(`Betting period has ended (current timestamp: ${currentBlockTimestamp}, resolution time: ${resolutionTime}). Skipping bet for ${user.signer.address}.`);
      continue;
    }

    const userMockToken = mockToken.connect(user.signer);
    const userPredictionMarket = predictionMarket.connect(user.signer);
    const allowance = await userMockToken.allowance(user.signer.address, predictionMarketAddress);
    const userTotalAmount = user.betAmount + BigInt(betFee);
    if (allowance < userTotalAmount) {
      const approveTx = await userMockToken.approve(predictionMarketAddress, userTotalAmount);
      await approveTx.wait();
      console.log(`Approved PredictionMarket to spend ${ethers.formatEther(userTotalAmount)} MZETA for ${user.signer.address}`);
    }
    try {
      const placeBetTx = await userPredictionMarket.placeBet(marketId, user.outcomeIndex, user.betAmount);
      await placeBetTx.wait();
      console.log(`Bet placed by ${user.signer.address}: ${ethers.formatEther(user.betAmount)} MZETA on outcome index ${user.outcomeIndex}`);
    } catch (error) {
      console.error(`Failed to place bet for ${user.signer.address}:`, error);
      console.warn(`Skipping bet for ${user.signer.address} due to error.`);
      continue;
    }
    const userBalance = await mockToken.balanceOf(user.signer.address);
    console.log(`Balance after betting for ${user.signer.address}: ${ethers.formatEther(userBalance)} MZETA`);
  }

  // Wait for resolution time to pass
  console.log(`Waiting ${resolutionTimeOffset} seconds for resolution time to pass...`);
  await delay(resolutionTimeOffset * 1000); // Convert seconds to milliseconds

  // Verify current block timestamp
  const postDelayBlock = await ethers.provider.getBlock("latest");
  if (!postDelayBlock) {
    throw new Error("Failed to fetch the latest block after delay");
  }
  const postDelayTimestamp = postDelayBlock.timestamp;
  console.log("Current Block Timestamp after delay:", postDelayTimestamp);
  if (postDelayTimestamp < resolutionTime) {
    console.warn("Warning: Current block timestamp is still before resolution time. You may need to wait longer.");
    const additionalWaitTime = (resolutionTime - postDelayTimestamp + 10) * 1000; // Add 10 seconds buffer
    console.log(`Waiting an additional ${additionalWaitTime / 1000} seconds...`);
    await delay(additionalWaitTime);
  }

  // Resolve the market (set "Yes" as the winning outcome)
  const winningOutcome = 0;
  try {
    const resolveMarketTx = await predictionMarket.resolveMarket(marketId, winningOutcome);
    await resolveMarketTx.wait();
    console.log(`Market resolved with winning outcome index ${winningOutcome}`);
  } catch (error) {
    console.error("Market resolution failed:", error);
    throw new Error("Failed to resolve market. Check resolution time or contract state.");
  }

  // Check final balances for all users
  for (const user of users) {
    const userBalance = await mockToken.balanceOf(user.signer.address);
    console.log(`Final balance for ${user.signer.address}: ${ethers.formatEther(userBalance)} MZETA`);
  }
}

main().catch((error) => {
  console.error("Interaction failed:", error);
  process.exitCode = 1;
});