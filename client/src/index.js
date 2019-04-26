import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import './css/index.css';

import Charities from "./components/charities/Charities";
import NotFound from "./components/notfound/NotFound";
import About from "./components/about/About";

const routing = (
    <Router>
        <div className='full'>
            <Switch>
                <Route
                    exact path='/'
                    component={() => <App/>}
                />
                <Route
                    path='/charities'
                    component={() => <Charities/>}
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