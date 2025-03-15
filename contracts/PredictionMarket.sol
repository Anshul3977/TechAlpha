// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@zetachain/protocol-contracts/contracts/zevm/interfaces/IZRC20.sol";
import "@zetachain/protocol-contracts/contracts/zevm/interfaces/zContract.sol";

contract PredictionMarket is Ownable, zContract {
    IZRC20 public zetaToken;

    struct Market {
        string question;         // e.g., "Will AI safety standards improve by 2030?"
        string[] outcomes;      // e.g., ["Yes", "No"]
        uint256 resolutionTime; // Timestamp when the market can be resolved
        bool resolved;          // Whether the market is resolved
        uint256 winningOutcome; // Index of the winning outcome
    }

    struct Bet {
        address user;           // Bettor’s address
        uint256 amount;         // Amount bet in ZETA (excluding fee)
        uint256 outcomeIndex;   // Chosen outcome
    }

    mapping(uint256 => Market) public markets;          // Market ID to Market details
    mapping(uint256 => string[]) public marketOutcomes; // Market ID to outcomes array
    mapping(uint256 => Bet[]) public marketBets;        // Market ID to array of Bets
    uint256 public marketCount;                         // Total number of markets
    uint256 public constant BET_FEE = 1e16;             // 0.01 ZETA (Sybil resistance fee)

    event MarketCreated(uint256 marketId, string question, string[] outcomes, uint256 resolutionTime);
    event BetPlaced(uint256 marketId, address user, uint256 amount, uint256 outcomeIndex);
    event MarketResolved(uint256 marketId, uint256 winningOutcome);

    constructor(address _zetaToken) {
        zetaToken = IZRC20(_zetaToken);
    }

    function createMarket(
        string memory _question,
        string[] memory _outcomes,
        uint256 _resolutionTime
    ) external {
        require(_resolutionTime > block.timestamp, "Resolution time must be in the future");
        require(_outcomes.length >= 2, "At least two outcomes required");

        marketCount++;
        markets[marketCount] = Market({
            question: _question,
            outcomes: _outcomes,
            resolutionTime: _resolutionTime,
            resolved: false,
            winningOutcome: 0
        });
        marketOutcomes[marketCount] = _outcomes;

        emit MarketCreated(marketCount, _question, _outcomes, _resolutionTime);
    }

    function getOutcomesLength(uint256 _marketId) external view returns (uint256) {
        require(_marketId > 0 && _marketId <= marketCount, "Invalid market ID");
        return marketOutcomes[_marketId].length;
    }

    function placeBet(uint256 _marketId, uint256 _outcomeIndex, uint256 _amount) external {
        require(_marketId > 0 && _marketId <= marketCount, "Invalid market ID");
        require(_amount > 0, "Bet amount must be greater than zero");
        require(block.timestamp < markets[_marketId].resolutionTime, "Betting period has ended");
        require(!markets[_marketId].resolved, "Market already resolved");
        require(_outcomeIndex < marketOutcomes[_marketId].length, "Invalid outcome index");

        // Transfer the bet amount + fee in a single transaction
        uint256 totalAmount = _amount + BET_FEE;
        zetaToken.transferFrom(msg.sender, address(this), totalAmount);

        marketBets[_marketId].push(Bet({
            user: msg.sender,
            amount: _amount,
            outcomeIndex: _outcomeIndex
        }));

        emit BetPlaced(_marketId, msg.sender, _amount, _outcomeIndex);
    }

    function onCrossChainCall(
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external override {
        require(zrc20 == address(zetaToken), "Invalid ZRC20 token");

        // Decode the message to extract marketId, outcomeIndex, and user
        (uint256 marketId, uint256 outcomeIndex, address user) = abi.decode(message, (uint256, uint256, address));

        require(marketId > 0 && marketId <= marketCount, "Invalid market ID");
        require(amount > 0, "Bet amount must be greater than zero");
        require(block.timestamp < markets[marketId].resolutionTime, "Betting period has ended");
        require(!markets[marketId].resolved, "Market already resolved");
        require(outcomeIndex < marketOutcomes[marketId].length, "Invalid outcome index");

        // The amount is already transferred to this contract via ZetaChain's cross-chain mechanism
        // We just need to account for the bet amount (excluding the fee)
        uint256 betAmount = amount - BET_FEE;

        marketBets[marketId].push(Bet({
            user: user,
            amount: betAmount,
            outcomeIndex: outcomeIndex
        }));

        emit BetPlaced(marketId, user, betAmount, outcomeIndex);
    }

    function resolveMarket(uint256 _marketId, uint256 _winningOutcome) external onlyOwner {
        require(_marketId > 0 && _marketId <= marketCount, "Invalid market ID");
        require(block.timestamp >= markets[_marketId].resolutionTime, "Too early to resolve");
        require(!markets[_marketId].resolved, "Market already resolved");
        require(_winningOutcome < marketOutcomes[_marketId].length, "Invalid winning outcome");

        markets[_marketId].resolved = true;
        markets[_marketId].winningOutcome = _winningOutcome;

        distributeRewards(_marketId, _winningOutcome);
        emit MarketResolved(_marketId, _winningOutcome);
    }

    function distributeRewards(uint256 _marketId, uint256 _winningOutcome) private {
        Bet[] storage bets = marketBets[_marketId];
        uint256 totalPool = 0;    // Total ZETA bet on the market (excluding fees)
        uint256 winningPool = 0;  // Total ZETA bet on the winning outcome

        // Calculate pools
        for (uint256 i = 0; i < bets.length; i++) {
            totalPool += bets[i].amount;
            if (bets[i].outcomeIndex == _winningOutcome) {
                winningPool += bets[i].amount;
            }
        }

        // Distribute rewards
        if (winningPool > 0) {
            for (uint256 i = 0; i < bets.length; i++) {
                if (bets[i].outcomeIndex == _winningOutcome) {
                    uint256 reward = (bets[i].amount * totalPool) / winningPool;
                    zetaToken.transfer(bets[i].user, reward);
                }
            }
        }
    }
}