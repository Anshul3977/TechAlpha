// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import "@zetachain/protocol-contracts/contracts/zevm/interfaces/UniversalContract.sol";
import "@zetachain/protocol-contracts/contracts/zevm/interfaces/IZRC20.sol";

contract PredictionMarket is UniversalContract {
    struct Market {
        string question;
        string[] outcomes;
        uint256 resolutionTime;
        bool resolved;
        uint256 winningOutcome;
        address bettingAsset;
    }

    Market[] public markets;
    mapping(uint256 => mapping(address => mapping(uint256 => uint256))) public bets; // marketId => user => outcome => amount

    event MarketCreated(uint256 marketId, string question, string[] outcomes);
    event BetPlaced(uint256 marketId, address user, uint256 outcome, uint256 amount);
    event MarketResolved(uint256 marketId, uint256 winningOutcome);

    function createMarket(
        string memory question,
        string[] memory outcomes,
        uint256 resolutionTime,
        address bettingAsset
    ) external {
        markets.push(Market({
            question: question,
            outcomes: outcomes,
            resolutionTime: resolutionTime,
            resolved: false,
            winningOutcome: 0,
            bettingAsset: bettingAsset
        }));
        emit MarketCreated(markets.length - 1, question, outcomes);
    }

    function onCall(
        MessageContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external override {
        require(msg.sender == address(0xYourGatewayAddress), "Unauthorized");

        (uint256 marketId, uint256 outcome) = abi.decode(message, (uint256, uint256));
        require(marketId < markets.length, "Invalid market");
        require(!markets[marketId].resolved, "Market resolved");
        require(block.timestamp < markets[marketId].resolutionTime, "Market expired");
        require(zrc20 == markets[marketId].bettingAsset, "Invalid betting asset");

        bets[marketId][context.sender][outcome] += amount;
        emit BetPlaced(marketId, context.sender, outcome, amount);
    }

    function resolveMarket(uint256 marketId, uint256 winningOutcome) external {
        Market storage market = markets[marketId];
        require(block.timestamp >= market.resolutionTime, "Too early to resolve");
        require(!market.resolved, "Already resolved");
        require(winningOutcome < market.outcomes.length, "Invalid outcome");

        market.resolved = true;
        market.winningOutcome = winningOutcome;
        emit MarketResolved(marketId, winningOutcome);
    }

    function claimWinnings(uint256 marketId) external {
        Market storage market = markets[marketId];
        require(market.resolved, "Market not resolved");

        uint256 amount = bets[marketId][msg.sender][market.winningOutcome];
        require(amount > 0, "No winnings");

        bets[marketId][msg.sender][market.winningOutcome] = 0;

        address zrc20 = market.bettingAsset;
        (uint256 gasFee, address gasZRC20) = IZRC20(zrc20).withdrawGasFee();
        IZRC20(zrc20).approve(zrc20, gasFee);
        IZRC20(zrc20).withdraw(abi.encodePacked(msg.sender), amount - gasFee);
    }

    function onRevert(
        MessageContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external override {
        address sender = context.sender;
        IZRC20(zrc20).transfer(sender, amount);
    }
}
