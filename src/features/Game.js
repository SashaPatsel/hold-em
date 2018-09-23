import React, {Component} from "react";
import Round from "./Round";
import Player from "./Player";
import firebase from "../data/Firebase"

const db = firebase.firestore();


const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true};
  firestore.settings(settings);


  
// Create a variable to reference the database.
var database = firebase.database();

// -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {
  db.collection("users").add({
    name: "sasha",
    dob: "12/29/93"
  }); 
  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});



class Game extends Component {
  state = {
    totalStakes: 0,
    currRound: "",
    players: [],
    keyCount: 1,
    blinds: [0,1,2]
  }

  componentDidMount() {
    // Add the players to the game
    this.state.keyCount++

    // SET STATE NOT WORKING?!!?!
    this.setState({
      keyCount: this.state.keyCount+1
    })
    
    console.log("Game",this.state)
    this.newPlayer()
    // New Round is called after blinds are determined
    this.determineBlinds()



  }

  
  newPlayer() {
    this.state.players.push( <Player name="Sasha" wealth={10} hand={[]}
    currBet= {0}
    inPot= {0}
    fold= {false}
    bet= {false}
    raise= {false}
    call= {false}
    dealer= {true}
    smallBlind= {false}
    bigBlind= {false} 
    key={this.state.keyCount}
    />)
    this.state.keyCount++

    this.state.players.push( <Player name="Dilsey" wealth={10} hand={[]}
    currBet= {0}
    inPot= {0}
    fold= {false}
    bet= {false}
    raise= {false}
    call= {false}
    dealer= {false}
    smallBlind= {true}
    bigBlind= {false} 
    key={this.state.keyCount}
    />)
    this.state.keyCount++

    this.state.players.push( <Player name="Brian" wealth={10} hand={[]}
    currBet= {0}
    inPot= {0}
    fold= {false}
    bet= {false}
    raise= {false}
    call= {false}
    dealer= {false}
    smallBlind= {false}
    bigBlind= {true} 
      key={this.state.keyCount}
    />)
    this.state.keyCount++
    this.state.players.push( <Player name="Bax" wealth={10} hand={[]}
    currBet= {0}
    inPot= {0}
    fold= {false}
    bet= {false}
    raise= {false}
    call= {false}
    dealer= {false}
    smallBlind= {false}
    bigBlind= {false} 
    key={this.state.keyCount}
    />)
    this.state.keyCount++
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