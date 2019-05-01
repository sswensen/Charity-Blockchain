var Web3 = require('web3');
var web3;

function init() {
  if (typeof web3 !== 'undefined') {
    console.log('Web3 found');
    window.web3 = new Web3(web3.currentProvider);
    web3.eth.defaultAccount = web3.eth.accounts[0];
  } else {
     console.error('web3 was undefined');
  }
}

export default web3;
