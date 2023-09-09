"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.L2ChainOrAddressError = exports.L1ChainMismatchError = void 0;
const viem_1 = require("viem");
class L1ChainMismatchError extends viem_1.BaseError {
    constructor({ chainId, opChainL1ChainId }) {
        super(`Chain ID "${chainId}" does not match expected L1 chain ID "${opChainL1ChainId}"`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'L1ChainMismatchError'
        });
    }
}
exports.L1ChainMismatchError = L1ChainMismatchError;
class L2ChainOrAddressError extends viem_1.BaseError {
    constructor({ contract }) {
        super(`Must provide either l2Chain or ${contract}Address"`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'L2ChainOrAddressError'
        });
    }
}
exports.L2ChainOrAddressError = L2ChainOrAddressError;
//# sourceMappingURL=action.js.map