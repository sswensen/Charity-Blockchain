#!/bin/bash
cd ./client/
rm -r node_modules
npm install
cd ..
rm -r node_modules
npm install
truffle compile
truffle migrate --reset
truffle test ./test/*.test.js
