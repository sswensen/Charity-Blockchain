import web3 from "./web3";

const address = "0x0047612650ab6d081555bCDc9Ab7c5D7Ec9F0C74";

const abi = [
    {
        constant: false,
        inputs: [],
        name: "getCharityNames",
        outputs: [{name: "charitiesInBytes", type: "bytes"}],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [],
        name: "getNumCharities",
        outputs: [{name: "charityCount", type: "uint256"}],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [],
        name: "listPlayers",
        outputs: [{name: "playersInBytes", type: "bytes"}],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{name: "", type: "string"}],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {name: "name", type: "string"},
            {name: "message", type: "string"}
        ],
        name: "setSecret",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "memberCount",
        outputs: [{name: "", type: "uint256"}],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "getBalance",
        outputs: [{name: "", type: "uint256"}],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [{name: "name", type: "string"}],
        name: "getSecret",
        outputs: [{name: "", type: "string"}],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{name: "", type: "string"}],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [{name: "name", type: "string"}],
        name: "unlockMessage",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function"
    },
    {
        constant: true,
        inputs: [{name: "a", type: "string"}, {name: "b", type: "string"}],
        name: "compareStrings",
        outputs: [{name: "", type: "bool"}],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [{name: "name", type: "string"}],
        name: "registerTrojan",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [{name: "name", type: "string"}],
        name: "unregisterTrojan",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
    }
];

export default new web3.eth.Contract(abi, address);
