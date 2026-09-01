const assert = require("node:assert/strict")
const prime = require("./index.js")

assert.strictEqual(
    prime.isPrime(2),
    true,
);

assert.strictEqual(
    prime.isPrime(6),
    false,
);

assert.strictEqual(
    prime.isPrime(13),
    true,
);

assert.strictEqual(
    prime.isPrime(21),
    false,
);