#!/bin/bash
cd ./client/
npm install
cd ..
npm install
truffle compile
truffle migrate --reset
truffle test ./test/*.test.js