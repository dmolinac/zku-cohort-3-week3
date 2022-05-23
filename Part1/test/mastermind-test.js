//[assignment] write your own unit test to show that your Mastermind variation circuit is working as expected

const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;

const assert = chai.assert;

describe("Super Mastermind unit tests", function () {
    this.timeout(100000000);

    it("5 hits, 0 blows", async () => {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");
        await circuit.loadConstraints();

        const INPUT = {
            "pubGuessA": 1,
            "pubGuessB": 2,
            "pubGuessC": 3,
            "pubGuessD": 4,
            "pubGuessE": 5,
            "pubNumHit": 5,
            "pubNumBlow": 0,
            "pubSolnHash": "18229783019802352800218591428275011525065311465149190080874050150854518435481",
            "privSolnA": 1,
            "privSolnB": 2,
            "privSolnC": 3,
            "privSolnD": 4,
            "privSolnE": 5,
            "privSalt": 57345,
        }
        const witness = await circuit.calculateWitness(INPUT, true);
        //console.log(witness);

        assert(witness[0],1);
    });

    it("3 hits, 1 blows", async () => {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");
        await circuit.loadConstraints();

        const INPUT = {
            "pubGuessA": 1,
            "pubGuessB": 2,
            "pubGuessC": 3,
            "pubGuessD": 5,
            "pubGuessE": 6,
            "pubNumHit": 3,
            "pubNumBlow": 1,
            "pubSolnHash": "18229783019802352800218591428275011525065311465149190080874050150854518435481",
            "privSolnA": 1,
            "privSolnB": 2,
            "privSolnC": 3,
            "privSolnD": 4,
            "privSolnE": 5,
            "privSalt": 57345,
        }
        const witness = await circuit.calculateWitness(INPUT, true);
        //console.log(witness);

        assert(witness[0],1);
    });
});