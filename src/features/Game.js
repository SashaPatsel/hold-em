import React, {Component} from "react";
import Round from "./Round";
import Player from "./Player";
import firebase from "../data/Firebase"

const db = firebase.firestore();


class Game extends Component {
  state = {
    totalStakes: 0,
    currRound: "",
    players: [],
    keyCount: 1,
    blinds: [0,1,2]
  }

  componentDidMount() {

    
    console.log("Game",this.state)
    db.collection("tables").doc(localStorage.getItem("table")).get().then(doc => {
      console.log(doc.data())
    })
    // New Round is called after blinds are determined
    this.newRound()



  }


  newRound() {

    this.setState({
      currRound: <Round dealer={0}
      />
    })
  
  }
  

  render () {

    return (
      <div>
        {this.state.currRound}
      </div>  
    )
  }
}

export default Game;