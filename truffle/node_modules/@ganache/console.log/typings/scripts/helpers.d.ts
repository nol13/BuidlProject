import { BytesN } from "../src/handlers";
export declare type SignatureDetail = {
    solidity?: string;
    javascript?: string;
    params: string[];
    name: string;
};
export declare type FunctionDescriptor = {
    functionName: string;
    params: {
        type: string;
    }[];
    consoleSolLogFunctionToCall: string;
};
export declare const combinatorTypes: readonly ["address", "bool", "string memory", "uint256"];
declare type SolidityType = typeof primitiveTypes[number] | BytesN | "uint" | "int";
declare const primitiveTypes: readonly ["address", "bool", "string memory", "uint256", "bytes memory", "int256"];
/**
 * Hardhat abi encodes uint instead of uint256. This saves a couple of bytes,
 * but is incorrect.
 */
export declare const hardhatTypeAliases: Map<SolidityType, SolidityType>;
export declare function getSignatures(): Generator<SignatureDetail, void, unknown>;
export {};
//# sourceMappingURL=helpers.d.ts.map