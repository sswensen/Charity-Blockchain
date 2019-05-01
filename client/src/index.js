import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import './css/index.css';

import {Drizzle} from "drizzle";

import Charity from "./contracts/Charity.json";

import Charities from "./components/charities/Charities";
import NotFound from "./components/NotFound/NotFound";
import About from "./components/about/About";

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
    contracts: [
        Charity
    ],
    web3: {
        fallback: {
            type: "ws",
            url: "ws://127.0.0.1:8545",
        },
    },
};

// setup drizzle
const drizzle = new Drizzle(options);

const routing = (
    <Router>
        <div className='full'>
            <Switch>
                <Route
                    exact path='/'
                    component={() => <App drizzle={drizzle}/>}
                />
                <Route
                    path='/charities'
                    component={() => <Charities drizzle={drizzle}/>}
                />
                <Route
                    path='/about'
                    component={() => <About/>}
                />
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
);
ReactDOM.render(routing, document.getElementById('root'))
