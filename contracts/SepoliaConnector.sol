// SPDX-License-Identifier: MIT
pragma solidity 0.8.7; // Updated from ^0.8.0 for consistency

import "@zetachain/protocol-contracts/contracts/zevm/SystemContract.sol";

contract SepoliaConnector {
    SystemContract public systemContract;
    address public predictionMarket;
    uint256 public zetaChainId = 7001; // ZetaChain Testnet Chain ID

    constructor(address _systemContract, address _predictionMarket) {
        systemContract = SystemContract(_systemContract);
        predictionMarket = _predictionMarket;
    }

    function placeCrossChainBet(uint256 marketId, uint256 outcomeIndex, uint256 amount) external payable {
        bytes memory data = abi.encode(marketId, outcomeIndex, amount, msg.sender);
        systemContract.send{value: msg.value}(
            zetaChainId,
            predictionMarket,
            data
        );
    }
}