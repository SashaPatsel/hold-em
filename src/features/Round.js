import React, {Component} from "react";
import deck from "../data/deck.json"
import Player from "./Player"

class Round extends Component {
  state = {
    deck: deck,
    pot: 0,
    houseCards: [],
    minBet: .5,
    players: []
  }

  

  componentDidMount() {
    this.startRound()
  }

  startRound() {
    const Sasha = new Player("Sasha", 10)
    const Dilsey = new Player ("Dilsey", 10)
    const Brian = new Player ("Brian", 10)
    const Baxter = new Player ("Baxter", 10)
    this.shuffle(this.state.deck)
    this.flop()
    for (var i = 0 ; i < this.state.players.length ; i ++) {

    }
  }

  flop() {
    // Burn a card
    this.state.deck.pop()

    this.state.houseCards.push(this.state.deck.pop())
    this.state.houseCards.push(this.state.deck.pop())
    this.state.houseCards.push(this.state.deck.pop())
    console.log(this.state.houseCards)
  }

  turnRiver() {

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

  

  render () {
    return (
      <div>
      </div>  
    )
  }
}

export default Round;