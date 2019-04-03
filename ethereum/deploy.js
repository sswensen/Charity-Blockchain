// invoke the deployment with "node deploy.js" from the ethereum directory

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const compiledTrojanSecret = require("./build/TrojanSecret.json");
console.log(compiledTrojanSecret.interface);
console.log("Copy this ABI into the ABI json variable in file trojanSecret.js");


const provider = new HDWalletProvider(
  "news jungle chair engine style jump valid dial piano hello little afraid",
  "https://rinkeby.infura.io/v3/d99dfed774254c8bbed2c50a44ccc186"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);

  console.log("attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledTrojanSecret.interface)
  )
    .deploy({ data: compiledTrojanSecret.bytecode })
    .send({ gas: "2000000", from: accounts[0] });

  console.log("Contract deployed to rinkeby at", result.options.address);
  console.log("Copy this contract address into the address variable in file trojanSecret.js");
};

deploy();


/*

attempting to deploy from account 0x4327D8b79AB0499F81dD801db4365CdC914d6f3f
Contract deployed to rinkeby at 0x9442086DacD07C54381D865cad2160ce921bf1A6

 */

/* Remix deployment from 0x432... deployed to Rinkeby at 0x0114a98807f33ef62c853ef55cc83acf288e54c8 */
