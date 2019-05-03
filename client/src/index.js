import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import './css/index.css';

import {Drizzle} from "drizzle";

import Charity from "./contracts/Charity.json";
import Charity2 from "./contracts/Charity2.json";
import Charity3 from "./contracts/Charity3.json";
import Charity4 from "./contracts/Charity4.json";
import Charity5 from "./contracts/Charity5.json";
import Charity6 from "./contracts/Charity6.json";

import Charities from "./components/charities/Charities";
import NotFound from "./components/NotFound/NotFound";
import About from "./components/about/About";
import Company from "./components/company/Company";

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
    contracts: [
        Charity, Charity2, Charity3, Charity4, Charity5, Charity6
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
                    path='/company'
                    component={() => <Company/>}
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