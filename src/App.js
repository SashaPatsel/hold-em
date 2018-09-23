import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Game from "./features/Game"


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" component={Game}/>
          </Switch>  
        </Router>    
      </div>
    );
  }
}

export default App;
