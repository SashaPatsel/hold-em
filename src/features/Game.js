import React, {Component} from "react";
import Round from "./Round";
import Player from "./Player";
import deck from "../data/deck.json"
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
    playerRefs: [],
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
    this.getPlayers()

    db.collection("tables").doc(localStorage.getItem("table")).collection("players").doc(localStorage.getItem("player")).get().then(player => {
      if (player.data().dealer === true) {
        this.shuffle(this.state.deck)
      }
    })
    // New Round is called after blinds are determined
    this.newRound()
  }

  getPlayers() {
    db.collection("tables").doc(localStorage.getItem("table")).collection("players").get().then(doc => {
      doc.docs.map(player => {
        console.log(player.ref.id)
        this.state.playerRefs.push(player.ref.id)
      })
      console.log(doc)
    })
  }

    //Knuth Shuffle
    shuffle = (arr) => {
      let currentIndex = arr.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
      }
      db.collection("tables").doc(localStorage.getItem("table")).set({
        deck: arr
      })
    }

  newRound() {
    this.setState({
      currRound: <Round dealer={0} players={this.state.playerRefs}
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