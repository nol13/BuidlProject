"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybeGetLogs = void 0;
const handlers_1 = require("./handlers");
const signatures_1 = require("./signatures");
const CONSOLE_ADDRESS = 0x636f6e736f6c652e6c6f67n;
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
const maybeGetLogs = (event) => {
    if (event.opcode.name !== "STATICCALL")
        return null;
    // STATICCALL, which is the OPCODE that is used to initiate a console.log, has
    // 6 params, but we only care about these 3:
    const stack = event.stack;
    const [memoryLength, memoryOffset, toAddress] = stack.slice(-4, -1);
    // only if the toAddress is our console address we should try parsing
    if (toAddress !== CONSOLE_ADDRESS)
        return null;
    // STATICCALL allows for passing in invalid pointers and lengths so we need to
    // guard against failures with a try/catch
    try {
        const memoryStart = Number(memoryOffset);
        const memoryEnd = memoryStart + Number(memoryLength);
        const memory = event.memory.subarray(memoryStart, memoryEnd);
        const method = memory.readUInt32BE(0); // 4 bytes wide
        const handlers = signatures_1.signatureMap.get(method);
        if (!handlers)
            return null;
        // we skip the first 4 bytes, as that is our signature
        const values = memory.subarray(4);
        return handlers.map((handler, index) => {
            const offset = index * handlers_1.WORD_SIZE;
            return handler(values, offset);
        });
    }
    catch {
        return null;
    }
};
exports.maybeGetLogs = maybeGetLogs;
//# sourceMappingURL=maybe-get-logs.js.map