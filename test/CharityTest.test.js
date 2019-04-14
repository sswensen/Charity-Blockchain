const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledCD = require("../ethereum/build/CharitableDonations.json");

let accounts;
let CD;

// this mocha test suite is executed by the command "npm run test"


// each "it" block will execute a clean slate deployment of the contract with automatic "beforeEach" invocation
beforeEach(async() => {
    accounts = await web3.eth.getAccounts();
    // console.log(accounts);

    CD = await new web3.eth.Contract(
        JSON.parse(compiledCD.interface)
    )
        .deploy({data: compiledCD.bytecode})
        .send({from: accounts[0], gas: "2000000"});
});

// The test suite is given in a DESCRIBE function calling multiple IT functions as tests

describe("CharitableDonations Contract", () => {

    it("CharitableDonations can be deployed", () => {
        assert.ok(compiledCD.options.address);
    });


});
