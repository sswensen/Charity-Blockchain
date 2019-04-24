import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import './css/index.css';

import { Drizzle } from "drizzle";

import Charity from "./contracts/Charity.json";

import Charities from "./components/charities/Charities";
import NotFound from "./components/NotFound/NotFound";

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

// ReactDOM.render(<App drizzle={drizzle}/>, document.getElementById('root'));



const routing = (
    <Router>
        <div className='full'>
            {/*<ul>*/}
                {/*<li>*/}
                    {/*<Link to="/">Home</Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                    {/*<Link to="/users">Users</Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                    {/*<Link to="/contact">Contact</Link>*/}
                {/*</li>*/}
            {/*</ul>*/}
            <Switch>
                <Route
                    exact path='/'
                    component={() => <App drizzle={drizzle} />}
                />
                <Route
                    path='/charities'
                    component={() => <Charities drizzle={drizzle} />}
                />
                <Route component={NotFound} />
                {/*<Route path="/users/:id" component={Users} />*/}
                {/*<Route path="/contact" component={Contact} />*/}
                {/*<Route component={Notfound} />*/}
            </Switch>
        </div>
    </Router>
);
ReactDOM.render(routing, document.getElementById('root'))