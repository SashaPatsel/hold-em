import React, {Component} from "react";
import deck from "../data/deck.json"
import Player from "./Player"

class Round extends Component {
  state = {
    deck: deck,
    pot: 0,
    houseCards: [],
    minBet: .5,
    players: this.props.players
  }

  

  componentDidMount() {
    this.startRound()
  }



  startRound() {
    

    // Shuffle the Deck
    this.shuffle(this.state.deck)
    // Deal one card to each player, the. repeat
    this.dealCard()
    this.dealCard()
    
  //  Bring out the flop
    this.flop()
  }

  dealCard() {
    for (var i = 0 ; i < this.state.players.length ; i ++) {
      this.state.players[i].props.hand.push(this.state.deck.pop())
      console.log(this.state.players[i].props.hand)
    }
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
        {this.state.players.map(player => player)}
      </div>  
    )
  }
}

export default Round;