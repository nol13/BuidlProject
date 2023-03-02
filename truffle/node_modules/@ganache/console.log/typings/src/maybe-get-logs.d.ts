/// <reference types="node" />
/**
 * Returns arguments passed to console.sol's `console.log` if the given
 * `@ethereumjs/vm` step event's `opcode`, `stack`, and `memory` fields contain
 * valid `console.log` data.
 *
 * The event's `opcode.name` field must be `"STATICCALL"` and the `toAddress` on
 * the `stack` must be the `console.log` address:
 * `0x000000000000000000636f6e736f6c652e6c6f67`.
 *
 * @param event - `@ethereumjs/vm` step event
 * @returns
 */
export declare const maybeGetLogs: (event: {
    opcode: {
        name: string;
    };
    memory: Buffer;
    stack: bigint[];
}) => ConsoleLogs | null;
export declare type ConsoleLog = string | bigint | boolean;
export declare type ConsoleLogs = ConsoleLog[];
//# sourceMappingURL=maybe-get-logs.d.ts.map