import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Create from "./pages/Create"
import Join from "./pages/Join"
import Landing from "./pages/Landing"

import Game from "./features/Game"


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/Create" component={Create}/>
            <Route path="/Join" component={Join}/>
            <Route path="/Game" component={Game}/>
          </Switch>  
        </Router>    
      </div>
    );
  }
}

export default App;
