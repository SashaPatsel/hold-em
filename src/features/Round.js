import React, { Component } from "react";
import deck from "../data/deck.json"
import Player from "./Player"
import PlayerLogic from "./PlayerLogic"

const players = [
  {
    name: "Sasha",
    wealth: 10,
    key: 1
  },
  {
    name: "Dilsey",
    wealth: 10,
    key: 2 
  },
  {
    name: "Brian",
    wealth: 10,
    key: 3
  },
  {
    name: "Bax",
    wealth: 10,
    key: 4
  },
]


class Round extends Component {
  state = {
    deck: deck,
    pot: 0,
    houseCards: [],
    minBet: .25,
    players: [],
    // array of indices [D, SB, BB]]
    blinds: this.props.blinds,
    action: 0,

  }



  componentWillMount() {
    this.fold = this.fold.bind(this)
    this.startRound()
    console.log("Round", this.state)
  }



  startRound() {

    // Shuffle the Deck
    this.shuffle(this.state.deck)

    // Move read-only player stats to Round state so that they can be changed
    this.newPlayers()

    // Add blinds
    this.addBlinds()
    // Deal one card to each player, then repeat
    this.dealCard()
    this.dealCard()

    this.whosTurn()

    // Start first round of betting
    const wait = setTimeout(() => {
      console.log(this.state.turnQueue)
      console.log(this.state.players)

    }, 0)

    //  Bring out the flop
    // this.flop()
    
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

    this.setState({
      cards: arr
    });
  }

  newPlayers() {

    for (let i = 0 ; i < players.length ; i++) {
      this.state.players.push(new PlayerLogic(players[i].name, players[i].wealth, players[i].key
      ))
    }

  }

  addBlinds() {
    // Add small blind + big blind
    this.setState({
      pot: this.state.minBet + (this.state.minBet * 2)
    })
  }



 whosTurn() {


  }

  moveAction() {
    if (this.state.action === this.state.players.length - 1) {
      this.setState({
        action: 0
      })
    }else {
      this.setState({
        action: this.state.action + 1
      })
    }
  
  }

  dealCard() {
    for (let i = 0; i < this.state.players.length; i++) {
      this.state.players[i].hand.push(this.state.deck.pop())
    }
  }

  

  fold() {
    this.moveAction()
  }

  flop() {
    // Burn a card
    this.state.deck.pop()

    this.state.houseCards.push(this.state.deck.pop())
    this.state.houseCards.push(this.state.deck.pop())
    this.state.houseCards.push(this.state.deck.pop())

  }

  turnRiver() {

  }





  render() {
    return (
      <div>
        {this.state.action}
        <h3>Pot:</h3>
        {this.state.pot}

        <h3>Players:</h3>
        {this.state.players.map(player => 

          <Player
          name={player.name} 
          wealth={player.wealth} 
          hand={player.hand}
          key={player.key} 

          fold={this.fold}
          />
        )}
{/* <Player/> */}
        <h3>House:</h3>
        {this.state.houseCards.map(c => <p> {c.number} of {c.suit} </p>)}
      </div>
    )
  }
}

export default Round;