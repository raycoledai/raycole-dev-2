// @flow strict
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/crypto">Crypto</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/crypto">
            <Crypto />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
