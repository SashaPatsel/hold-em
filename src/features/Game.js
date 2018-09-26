import React, {Component} from "react";
import Round from "./Round";
import Player from "./Player";
import firebase from "../data/Firebase"

const db = firebase.firestore();


class Game extends Component {
  state = {
    tableName: "",
    bb: 0,
    sb: 0,
    deck: [],
    maxBuyIn: 0,
    minBuyIn: 0,
    maxPlayers: 0,
    players: [],
    buyBack:false
  }

  componentDidMount() {

    
    console.log("Game",this.state)
    db.collection("tables").doc(localStorage.getItem("table")).get().then(doc => {
      
      this.setState({
        tableName: doc.data().tableName,
        bb: doc.data().bb,
        sb: doc.data().sb,
        deck: doc.data().deck,
        maxBuyIn: doc.data().maxBuyIn,
        minBuyIn: doc.data().minBuyIn,
        maxPlayers: doc.data().maxPlayers,
        buyBack: doc.data().buyBack
      })
      console.log(this.state)
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