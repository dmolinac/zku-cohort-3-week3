const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;

const assert = chai.assert;

describe("Spoof unit tests", function () {

    it("Verify correct input", async () => {
        const circuit = await wasm_tester("contracts/circuits/bonus.circom");
        await circuit.loadConstraints();

        const INPUT = {
            "pubTotalCoins": 5,
            "pubCoins": 2,
            "pubSolHash": "17118296780990909069043193705138639126901208812089164291380713004267751552294",
            "privTotalCoins": 5,
            "privCoins": 2,
            "privSalt": 57345,
        }
        const witness = await circuit.calculateWitness(INPUT, true);

        assert(witness[0],1);
    });
});