/// <reference types="node" />
declare type Digits = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
declare type Numbers = Digits | 10 | 20 | `${1}${Digits}` | `2${Digits}` | 30 | 31 | 32;
export declare type BytesN = `bytes${Numbers}`;
export declare type FixedBytesN = `fixedBytes(${Numbers})`;
export declare type Handler = keyof typeof Handlers | FixedBytesN;
/**
 * EVM word size for abi encoded data
 */
export declare const WORD_SIZE: 32;
/**
 * Ganerates a handler function for solidity's bytes1-bytes32 types
 * @param length From 1 to 32.
 * @returns A function that accepts a memory Buffer and an offset.
 */
export declare function fixedBytes(length: number): (memory: Buffer, offset: number) => string;
export declare const int256: (memory: Buffer, offset: number) => bigint;
/**
 * Handle decoding of solidity's `uint256` type from EVM memory
 * @param memory
 * @param offset
 * @returns
 */
export declare const uint256: (memory: Buffer, offset: number) => bigint;
/**
 * Handle decoding of solidity's dynamic `string` type from EVM memory
 * @param memory
 * @param offset
 * @returns
 */
export declare const string: (memory: Buffer, offset: number) => string;
/**
 * Handle decoding of solidity's `bool` type from EVM memory
 * @param memory
 * @param offset
 * @returns
 */
export declare const bool: (memory: Buffer, offset: number) => boolean;
/**
 * Handle decoding of solidity's `address` type from EVM memory.
 * @param memory
 * @param offset
 * @returns A 20 byte hex encoded string, prefixed with 0x.
 */
export declare const address: (memory: Buffer, offset: number) => string;
/**
 * Handle decoding of solidity's dynamic `bytes` type from EVM memory
 * @param memory
 * @param offset
 * @returns
 */
export declare const bytes: (memory: Buffer, offset: number) => string;
export declare const Handlers: {
    address: (memory: Buffer, offset: number) => string;
    bool: (memory: Buffer, offset: number) => boolean;
    bytes: (memory: Buffer, offset: number) => string;
    int256: (memory: Buffer, offset: number) => bigint;
    string: (memory: Buffer, offset: number) => string;
    uint256: (memory: Buffer, offset: number) => bigint;
};
export {};
//# sourceMappingURL=handlers.d.ts.map