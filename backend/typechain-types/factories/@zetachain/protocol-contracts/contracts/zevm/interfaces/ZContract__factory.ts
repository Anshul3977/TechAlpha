/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ZContract,
  ZContractInterface,
} from "../../../../../../@zetachain/protocol-contracts/contracts/zevm/interfaces/ZContract";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "zrc20",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "onCrossChainCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ZContract__factory {
  static readonly abi = _abi;
  static createInterface(): ZContractInterface {
    return new Interface(_abi) as ZContractInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): ZContract {
    return new Contract(address, _abi, runner) as unknown as ZContract;
  }
}
