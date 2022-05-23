pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/comparators.circom";
include "../../node_modules/circomlib/circuits/bitify.circom";
include "../../node_modules/circomlib/circuits/poseidon.circom";

// Sppof Game

template Spoof() {

    // Public inputs
    signal input pubTotalCoins;
    signal input pubCoins;
    signal input pubSolHash;

    // Private inputs
    signal input privTotalCoins;
    signal input privCoins;
    signal input privSalt;

    // Output
    signal output solHashOut;

    component lessThan[2];

    // Constrating that coin number and totalcoins are the same (not cheating)
    component equalCoins = IsEqual();
    equalCoins.in[0] <== pubCoins;
    equalCoins.in[1] <== privCoins;
    equalCoins.out === 1;

    component equalTotalCoins = IsEqual();
    equalTotalCoins.in[0] <== pubTotalCoins;
    equalTotalCoins.in[1] <== privTotalCoins;
    equalCoins.out === 1;

    // Create a constraint that the number of coins is less than 4.
    lessThan[0] = LessThan(32);
    lessThan[0].in[0] <== pubCoins;
    lessThan[0].in[1] <== 4;
    lessThan[0].out === 1;
    
    // Create a constraint that the number of total coins guessed for each plater is less than 7.
    lessThan[1] = LessThan(32);
    lessThan[1].in[0] <== pubTotalCoins;
    lessThan[1].in[1] <== 7;
    lessThan[1].out === 1;

    // Verify that the hash of the private solution matches pubSolHash
    component poseidon = Poseidon(3);
    poseidon.inputs[0] <== privTotalCoins;
    poseidon.inputs[1] <== privCoins;
    poseidon.inputs[2] <== privSalt;
    solHashOut <== poseidon.out;

    log(poseidon.out);

    pubSolHash === solHashOut;
 }

 component main {public [pubTotalCoins, pubCoins, pubSolHash]} = Spoof();