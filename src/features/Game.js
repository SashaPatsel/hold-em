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
    this.determineBlinds()



  }

  


  determineBlinds() {
    if (this.state.blinds[0] === 0) {

      this.newRound()
    }
    else if (this.state.blinds[2] === this.state.players.length -1) {
      this.setState({
        blinds: [this.state.blinds[0] + 1, this.state.blinds[1] + 1,0]
      })
    } 
    else if (this.state.blinds[1] === this.state.players.length -1) {
      this.setState({
        blinds: [this.state.blinds[0] + 1, 0 ,1]
      })
    } 
    else if (this.state.blinds[0] === this.state.players.length -1) {
      this.setState({
        blinds: [0,1,2]
      })
    } 
    // Normal incrementer
    else {
      this.setState({
        blinds: [this.state.blinds[0] + 1, this.state.blinds[1] + 1,this.state.blinds[2] + 1]
      })
    }

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