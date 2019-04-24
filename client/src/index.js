import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './css/index.css';

import { Drizzle } from "drizzle";

import Charity from "./contracts/Charity.json";

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
    contracts: [
        Charity
    ],
    web3: {
        fallback: {
            type: "ws",
            url: "ws://127.0.0.1:7545",
        },
    },
};

// setup drizzle
const drizzle = new Drizzle(options);

ReactDOM.render(<App drizzle={drizzle}/>, document.getElementById('root'));