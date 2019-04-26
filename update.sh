#!/bin/bash
cd ./client/
rm -r node_modules
npm install
cd ..
npm install
truffle compile
truffle migrate --reset
truffle test ./test/*.test.js
