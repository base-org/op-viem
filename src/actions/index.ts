export { type AccountProof, getProof, type GetProofParameters, type StorageProof } from './public/getProof.js'

// Public L1 actions
export {
  getL2HashesForDepositTx,
  type GetL2HashesForDepositTxParamters,
  type GetL2HashesForDepositTxReturnType,
} from './public/L1/getL2HashesForDepositTx.js'
export {
  getLatestProposedL2BlockNumber,
  type GetLatestProposedL2BlockNumberParameters,
  type GetLatestProposedL2BlockNumberReturnType,
} from './public/L1/getLatestProposedL2BlockNumber.js'
export {
  getOutputForL2Block,
  type GetOutputForL2BlockParameters,
  type GetOutputForL2BlockReturnType,
  type Proposal,
} from './public/L1/getOutputForL2Block.js'
export { getSecondsToFinalizable, type GetSecondsToFinalizableParameters } from './public/L1/getSecondsToFinalizable.js'
export {
  getSecondsToNextL2Output,
  type GetSecondsToNextL2OutputParameters,
} from './public/L1/getSecondsToNextL2Output.js'
export {
  readFinalizedWithdrawals,
  type ReadFinalizedWithdrawalsParameters,
} from './public/L1/readFinalizedWithdrawals.js'
export { readProvenWithdrawals, type ReadProvenWithdrawalsParameters } from './public/L1/readProvenWithdrawals.js'
export {
  simulateDepositERC20,
  type SimulateDepositERC20Parameters,
  type SimulateDepositERC20ReturnType,
} from './public/L1/simulateDepositERC20.js'
export {
  simulateDepositETH,
  type SimulateDepositETHParameters,
  type SimulateDepositETHReturnType,
} from './public/L1/simulateDepositETH.js'
export {
  simulateDepositTransaction,
  type SimulateDepositTransactionParameters,
  type SimulateDepositTransactionReturnType,
} from './public/L1/simulateDepositTransaction.js'
export {
  simulateFinalizeWithdrawalTransaction,
  type SimulateFinalizeWithdrawalTransactionParameters,
  type SimulateFinalizeWithdrawalTransactionReturnType,
} from './public/L1/simulateFinalizeWithdrawalTransaction.js'
export {
  simulateProveWithdrawalTransaction,
  type SimulateProveWithdrawalTransactionParameters,
  type SimulateProveWithdrawalTransactionReturnType,
} from './public/L1/simulateProveWithdrawalTransaction.js'

// Public L2 actions
export { estimateFees, type EstimateFeesParameters } from './public/L2/estimateFees.js'
export { estimateL1Fee, type EstimateL1FeeParameters } from './public/L2/estimateL1Fee.js'
export { estimateL1GasUsed, type EstimateL1GasUsedParameters } from './public/L2/estimateL1GasUsed.js'
export {
  getProveWithdrawalTransactionArgs,
  type GetProveWithdrawalTransactionArgsParams,
  type GetProveWithdrawalTransactionArgsReturnType,
  type OutputRootProof,
} from './public/L2/getProveWithdrawalTransactionArgs.js'
export {
  getWithdrawalMessages,
  type GetWithdrawalMessagesParameters,
  type GetWithdrawalMessagesReturnType,
} from './public/L2/getWithdrawalMessages.js'
export {
  simulateWithdrawERC20,
  type SimulateWithdrawERC20Parameters,
  type SimulateWithdrawERC20ReturnType,
} from './public/L2/simulateWithdrawERC20.js'
export {
  simulateWithdrawETH,
  type SimulateWithdrawETHParameters,
  type SimulateWithdrawETHReturnType,
} from './public/L2/simulateWithdrawETH.js'

// Wallet L1 actions
export { writeContractDeposit, type WriteContractDepositParameters } from './wallet/L1/writeContractDeposit.js'
export { writeDepositERC20, type WriteDepositERC20Parameters } from './wallet/L1/writeDepositERC20.js'
export { writeDepositETH, type WriteDepositETHParameters } from './wallet/L1/writeDepositETH.js'
export {
  type DepositTransactionParameters,
  writeDepositTransaction,
  type WriteDepositTransactionParameters,
} from './wallet/L1/writeDepositTransaction.js'
export {
  writeFinalizeWithdrawalTranasction,
  type WriteFinalizeWithdrawalTransactionParameters,
} from './wallet/L1/writeFinalizeWithdrawalTransaction.js'
export {
  writeProveWithdrawalTransaction,
  type WriteProveWithdrawalTransactionParameters,
} from './wallet/L1/writeProveWithdrawalTransaction.js'
export {
  type SendMessageParameters,
  writeSendMessage,
  type WriteSendMessageParameters,
} from './wallet/L1/writeSendMessage.js'

// Wallet l2 actions
export { writeWithdrawERC20, type WriteWithdrawERC20Parameters } from './wallet/L2/writeWithdrawERC20.js'
export { writeWithdrawETH, type WriteWithdrawETHParameters } from './wallet/L2/writeWithdrawETH.js'
