import { ethers, network } from "hardhat";

// MockERC20 ABI (unchanged)
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

// Updated PredictionMarket ABI (including onCrossChainCall)
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
    "name": "marketOutcomes",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
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
      { "internalType": "uint256", "name": "sourceChainId", "type": "uint256" },
      { "internalType": "address", "name": "sourceAddress", "type": "address" },
      { "internalType": "bytes", "name": "data", "type": "bytes" }
    ],
    "name": "onCrossChainCall",
    "outputs": [],
    "stateMutability": "nonpayable",
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
      { "internalType": "contract IZRC20", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// SepoliaConnector ABI
const sepoliaConnectorABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "_systemContract", "type": "address" },
      { "internalType": "address", "name": "_predictionMarket", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_marketId", "type": "uint256" },
      { "internalType": "uint256", "name": "_outcomeIndex", "type": "uint256" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" }
    ],
    "name": "placeCrossChainBet",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "predictionMarket",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "systemContract",
    "outputs": [
      { "internalType": "contract SystemContract", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "zetaChainId",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Utility function to add a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulated conversion function for multi-asset support
async function convertToMZETA(asset: string, amount: bigint) {
  const rates = { MZETA: 1, ETH: 3000, USDC: 1 }; // Simulated rates: 1 ETH = 3000 MZETA, 1 USDC = 1 MZETA
  return (amount * BigInt(rates[asset])) / BigInt(10 ** 18);
}

async function main() {
  // Get multiple signers (deployer, user1, user2, sepoliaSigner)
  const signers = await ethers.getSigners();
  if (signers.length < 4) {
    throw new Error(`Expected at least 4 signers, but got ${signers.length}. Please configure Hardhat with more accounts or fund additional addresses.`);
  }
  const [deployer, user1, user2, sepoliaSigner] = signers;
  console.log("Deployer account:", deployer.address);
  console.log("User1 account:", user1.address);
  console.log("User2 account:", user2.address);
  console.log("Sepolia account:", sepoliaSigner.address);

  // Check ZETA balances for gas fees on ZetaChain
  const deployerZetaBalance = await ethers.provider.getBalance(deployer.address);
  const user1ZetaBalance = await ethers.provider.getBalance(user1.address);
  const user2ZetaBalance = await ethers.provider.getBalance(user2.address);
  console.log("Deployer ZETA balance:", ethers.formatEther(deployerZetaBalance), "ZETA");
  console.log("User1 ZETA balance:", ethers.formatEther(user1ZetaBalance), "ZETA");
  console.log("User2 ZETA balance:", ethers.formatEther(user2ZetaBalance), "ZETA");

  // Ensure sufficient ZETA for gas (rough estimate: 0.01 ZETA per transaction, ~10 transactions)
  const minimumZetaBalance = ethers.parseEther("0.1");
  for (const [account, balance] of [
    ["Deployer", deployerZetaBalance],
    ["User1", user1ZetaBalance],
    ["User2", user2ZetaBalance],
  ]) {
    if (balance < minimumZetaBalance) {
      console.warn(
        `${account} has low ZETA balance (${ethers.formatEther(balance)} ZETA). You may need to fund more ZETA using the ZetaChain Testnet faucet.`
      );
    }
  }

  // Check Sepolia account balance
  const sepoliaProvider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/e9f7b7f9e01145a19745498ad06da8ee");
  const sepoliaWallet = new ethers.Wallet(process.env.PRIVATE_KEY_4 || "", sepoliaProvider);
  const sepoliaBalance = await sepoliaProvider.getBalance(sepoliaWallet.address);
  console.log("Sepolia account balance:", ethers.formatEther(sepoliaBalance), "SepoliaETH");

  // Ensure sufficient SepoliaETH for gas
  const minimumSepoliaBalance = ethers.parseEther("0.01");
  if (sepoliaBalance < minimumSepoliaBalance) {
    console.warn(
      `Sepolia account has low balance (${ethers.formatEther(sepoliaBalance)} SepoliaETH). You may need to fund more SepoliaETH.`
    );
  }

  // Connect to MockERC20 (MZETA token)
  const mockTokenAddress = "0x894dE66A13414c5F06ec24de238577b3bFEa4EB7";
  const mockToken = new ethers.Contract(mockTokenAddress, mockTokenABI, deployer);

  // Query MockERC20 total supply
  const totalSupply = await mockToken.totalSupply();
  console.log("Mock Token (MZETA) total supply:", ethers.formatEther(totalSupply), "MZETA");

  // Check MZETA balances for all users
  let deployerBalance = await mockToken.balanceOf(deployer.address);
  let user1Balance = await mockToken.balanceOf(user1.address);
  let user2Balance = await mockToken.balanceOf(user2.address);
  let sepoliaBalance = await mockToken.balanceOf(sepoliaSigner.address);
  console.log("Deployer MZETA balance:", ethers.formatEther(deployerBalance), "MZETA");
  console.log("User1 MZETA balance:", ethers.formatEther(user1Balance), "MZETA");
  console.log("User2 MZETA balance:", ethers.formatEther(user2Balance), "MZETA");
  console.log("Sepolia MZETA balance:", ethers.formatEther(sepoliaBalance), "MZETA");

  // Transfer MZETA to user1, user2, and sepoliaSigner if they don't have enough
  const requiredAmount = ethers.parseEther("10.01"); // 10 MZETA bet + 0.01 fee (approximation)
  if (user1Balance < requiredAmount) {
    const transferAmount = ethers.parseEther("20");
    const transferTx = await mockToken.transfer(user1.address, transferAmount);
    await transferTx.wait();
    console.log(`Transferred ${ethers.formatEther(transferAmount)} MZETA to User1`);
    user1Balance = await mockToken.balanceOf(user1.address);
    console.log("User1 new MZETA balance:", ethers.formatEther(user1Balance), "MZETA");
  }
  if (user2Balance < requiredAmount) {
    const transferAmount = ethers.parseEther("20");
    const transferTx = await mockToken.transfer(user2.address, transferAmount);
    await transferTx.wait();
    console.log(`Transferred ${ethers.formatEther(transferAmount)} MZETA to User2`);
    user2Balance = await mockToken.balanceOf(user2.address);
    console.log("User2 new MZETA balance:", ethers.formatEther(user2Balance), "MZETA");
  }
  if (sepoliaBalance < requiredAmount) {
    const transferAmount = ethers.parseEther("20");
    const transferTx = await mockToken.transfer(sepoliaSigner.address, transferAmount);
    await transferTx.wait();
    console.log(`Transferred ${ethers.formatEther(transferAmount)} MZETA to Sepolia account`);
    sepoliaBalance = await mockToken.balanceOf(sepoliaSigner.address);
    console.log("Sepolia new MZETA balance:", ethers.formatEther(sepoliaBalance), "MZETA");
  }

  // Connect to PredictionMarket (update this address after redeployment)
  const predictionMarketAddress = "0xB90A62694A6e49598D305343eC4724c8Ef33EAC7"; // Placeholder, update after deployment
  const predictionMarket = new ethers.Contract(predictionMarketAddress, predictionMarketABI, deployer);

  // Verify zetaToken address in PredictionMarket
  const zetaTokenAddress = await predictionMarket.zetaToken();
  console.log("PredictionMarket zetaToken address:", zetaTokenAddress);
  console.log("Matches MockERC20 address:", zetaTokenAddress.toLowerCase() === mockTokenAddress.toLowerCase());

  // Sybil Resistance: Require staking before betting
  const stakingRequirement = ethers.parseEther("1"); // 1 MZETA staking requirement
  for (const user of [deployer, user1, user2, sepoliaSigner]) {
    const userBalance = await mockToken.balanceOf(user.address);
    if (userBalance < stakingRequirement) {
      throw new Error(`Insufficient MZETA balance for ${user.address} to stake ${ethers.formatEther(stakingRequirement)} MZETA`);
    }
    const stakeTx = await mockToken.connect(user).transfer(predictionMarketAddress, stakingRequirement);
    await stakeTx.wait();
    console.log(`${user.address} staked ${ethers.formatEther(stakingRequirement)} MZETA for Sybil resistance`);
  }

  // Check current market count
  const initialMarketCount = await predictionMarket.marketCount();
  console.log("Initial market count:", initialMarketCount.toString());

  // Create multiple markets with d/acc topics
  const markets = [
    { question: "Will AGI be achieved by 2030?", outcomes: ["Yes", "No"], resolutionTimeOffset: 300 },
    { question: "Will a major cloud outage occur in 2025?", outcomes: ["Yes", "No"], resolutionTimeOffset: 600 },
  ];

  let marketIds: string[] = [];
  for (const market of markets) {
    const latestBlock = await ethers.provider.getBlock("latest");
    if (!latestBlock) throw new Error("Failed to fetch the latest block");
    const currentTimestamp = latestBlock.timestamp;
    const resolutionTime = currentTimestamp + market.resolutionTimeOffset;

    console.log(`Creating market with:`);
    console.log("Question:", market.question);
    console.log("Outcomes:", market.outcomes);
    console.log("Current Block Timestamp:", currentTimestamp);
    console.log("Resolution Time:", resolutionTime);

    try {
      const createMarketTx = await predictionMarket.createMarket(market.question, market.outcomes, resolutionTime);
      const createMarketReceipt = await createMarketTx.wait();
      console.log("Market creation transaction hash:", createMarketTx.hash);
      console.log("Market creation status:", createMarketReceipt.status === 1 ? "Success" : "Failed");

      // Parse MarketCreated event
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

      const marketCreatedEvent = allEvents.find((event) => event && event.parsedLog.name === "MarketCreated")?.parsedLog;
      if (marketCreatedEvent) {
        console.log("MarketCreated event emitted:", {
          marketId: marketCreatedEvent.args.marketId.toString(),
          question: marketCreatedEvent.args.question,
          outcomes: marketCreatedEvent.args.outcomes,
          resolutionTime: marketCreatedEvent.args.resolutionTime.toString(),
        });
        marketIds.push(marketCreatedEvent.args.marketId.toString());
      } else {
        marketIds.push((await predictionMarket.marketCount() - 1n).toString());
      }
    } catch (error) {
      console.error("Failed to create market:", error);
      throw new Error("Market creation failed");
    }
  }

  // Verify market count increased
  const newMarketCount = await predictionMarket.marketCount();
  console.log("New market count:", newMarketCount.toString());

  // Place bets on the first market (marketIds[0]) with multi-asset simulation
  const users = [
    { signer: deployer, asset: "MZETA", amount: ethers.parseEther("10"), outcomeIndex: 0 },
    { signer: user1, asset: "ETH", amount: ethers.parseEther("0.01"), outcomeIndex: 0 },
    { signer: user2, asset: "USDC", amount: ethers.parseEther("5"), outcomeIndex: 1 },
  ];

  const betFee = await predictionMarket.BET_FEE();
  console.log("Bet fee:", ethers.formatEther(betFee), "MZETA");
  for (const user of users) {
    const currentBlock = await ethers.provider.getBlock("latest");
    const currentBlockTimestamp = currentBlock.timestamp;
    const marketDetails = await predictionMarket.markets(marketIds[0]);
    const resolutionTime = marketDetails.resolutionTime;

    console.log(`Current Block Timestamp before betting for ${user.signer.address}: ${currentBlockTimestamp}`);
    if (currentBlockTimestamp >= resolutionTime) {
      console.warn(`Betting period has ended for market ${marketIds[0]}. Skipping bet for ${user.signer.address}.`);
      continue;
    }

    const mzetaAmount = await convertToMZETA(user.asset, user.amount);
    const userMockToken = mockToken.connect(user.signer);
    const userPredictionMarket = predictionMarket.connect(user.signer);
    const allowance = await userMockToken.allowance(user.signer.address, predictionMarketAddress);
    const userTotalAmount = mzetaAmount + BigInt(betFee);
    if (allowance < userTotalAmount) {
      const approveTx = await userMockToken.approve(predictionMarketAddress, userTotalAmount);
      await approveTx.wait();
      console.log(`Approved PredictionMarket to spend ${ethers.formatEther(userTotalAmount)} MZETA for ${user.signer.address}`);
    }

    try {
      const placeBetTx = await userPredictionMarket.placeBet(marketIds[0], user.outcomeIndex, mzetaAmount);
      await placeBetTx.wait();
      console.log(`Bet placed by ${user.signer.address}: ${ethers.formatEther(user.amount)} ${user.asset} (${ethers.formatEther(mzetaAmount)} MZETA) on outcome index ${user.outcomeIndex} for market ${marketIds[0]}`);
    } catch (error) {
      console.error(`Failed to place bet for ${user.signer.address}:`, error);
      continue;
    }

    const userBalance = await mockToken.balanceOf(user.signer.address);
    console.log(`Balance after betting for ${user.signer.address}: ${ethers.formatEther(userBalance)} MZETA`);

    await delay(2000); // 2-second delay between bets
  }

  // Real cross-chain bet from Sepolia on the second market (marketIds[1])
  console.log("Initiating real cross-chain bet from Sepolia account:", sepoliaSigner.address);

  // Connect to SepoliaConnector (update this address after deployment)
  const sepoliaConnectorAddress = "0xYourSepoliaConnectorAddress"; // Placeholder, update after deployment
  const sepoliaConnector = new ethers.Contract(sepoliaConnectorAddress, sepoliaConnectorABI, sepoliaWallet);

  const crossChainBetAmount = ethers.parseEther("5"); // 5 MZETA
  const crossChainTotalAmount = crossChainBetAmount + BigInt(betFee);
  const crossChainAllowance = await mockToken.connect(sepoliaSigner).allowance(sepoliaSigner.address, predictionMarketAddress);
  if (crossChainAllowance < crossChainTotalAmount) {
    const approveTx = await mockToken.connect(sepoliaSigner).approve(predictionMarketAddress, crossChainTotalAmount);
    await approveTx.wait();
    console.log(`Approved PredictionMarket to spend ${ethers.formatEther(crossChainTotalAmount)} MZETA for Sepolia account`);
  }

  const crossChainBetTx = await sepoliaConnector.placeCrossChainBet(marketIds[1], 0, crossChainBetAmount, {
    value: ethers.parseEther("0.01"), // Fee for cross-chain messaging
  });
  await crossChainBetTx.wait();
  console.log(`Real cross-chain bet placed from Sepolia: ${ethers.formatEther(crossChainBetAmount)} MZETA on outcome index 0 for market ${marketIds[1]}`);

  // Wait for resolution of both markets
  for (let i = 0; i < markets.length; i++) {
    const marketId = marketIds[i];
    const marketDetails = await predictionMarket.markets(marketId);
    const resolutionTime = marketDetails.resolutionTime;
    console.log(`Waiting ${markets[i].resolutionTimeOffset} seconds for market ${marketId} resolution time to pass...`);
    await delay(markets[i].resolutionTimeOffset * 1000);

    const postDelayBlock = await ethers.provider.getBlock("latest");
    const postDelayTimestamp = postDelayBlock.timestamp;
    console.log(`Current Block Timestamp after delay for market ${marketId}: ${postDelayTimestamp}`);
    if (postDelayTimestamp < resolutionTime) {
      const additionalWaitTime = (resolutionTime - postDelayTimestamp + 10) * 1000;
      console.log(`Waiting an additional ${additionalWaitTime / 1000} seconds for market ${marketId}...`);
      await delay(additionalWaitTime);
    }

    // Resolve the market (set "Yes" as the winning outcome)
    const winningOutcome = 0;
    try {
      const resolveMarketTx = await predictionMarket.resolveMarket(marketId, winningOutcome);
      await resolveMarketTx.wait();
      console.log(`Market ${marketId} resolved with winning outcome index ${winningOutcome}`);
    } catch (error) {
      console.error(`Market ${marketId} resolution failed:`, error);
      continue;
    }
  }

  // Check final balances for all users
  for (const user of users) {
    const userBalance = await mockToken.balanceOf(user.signer.address);
    console.log(`Final MZETA balance for ${user.signer.address}: ${ethers.formatEther(userBalance)} MZETA`);
  }

  const finalSepoliaBalance = await mockToken.balanceOf(sepoliaSigner.address);
  console.log(`Final MZETA balance for Sepolia account ${sepoliaSigner.address}: ${ethers.formatEther(finalSepoliaBalance)} MZETA`);
}

main().catch((error) => {
  console.error("Interaction failed:", error);
  process.exitCode = 1;
});