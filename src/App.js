import React, { Component } from 'react';
import './App.css';
import * as firebase from "firebase";
import Game from "./features/Game"

// var config = {
//   apiKey: "AIzaSyBy7D4RFOAG2BpTiQxCaUedgk6JkkVVmEc",
//   authDomain: "hold-em-29fdb.firebaseapp.com",
//   databaseURL: "https://hold-em-29fdb.firebaseio.com",
//   projectId: "hold-em-29fdb",
//   storageBucket: "",
//   messagingSenderId: "1083048984960"
// };
// firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div>
        <Game/>
      </div>
    );
  }
}

export default App;
