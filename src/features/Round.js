import React, {Component} from "react";
import deck from "../data/deck.json"
import Player from "./Player"

class Round extends Component {
  state = {
    deck: deck,
    pot: 0,
    houseCards: [],
    minBet: .5,
    players: this.props.players,
    // array of indices [D, SB, BB]
    blinds: this.props.blinds,
    turnQueue: 0
  }

  

  componentDidMount() {
    
    this.startRound()
    console.log("Round",this.state)
  }



  startRound() {
    
    // Shuffle the Deck
    this.shuffle(this.state.deck)
    // Deal one card to each player, then repeat
    this.dealCard()
    this.dealCard()
    
    // Promise not working
    // this.whosTurn().then(console.log(this.state.turnQueue))
    
    // Start first round of betting
    const wait = setTimeout(() => {
      console.log(this.state.turnQueue)
    },0)

  //  Bring out the flop
    this.flop()
  }

  // Async not working... Still using setTimeout
  async whosTurn() {
    // return Promise.resolve(this.setState({
    //   turnQueue: 908
    // }))
    if (this.state.turnQueue === this.state.players.length -1) {
      (this.setState({
          turnQueue: 0
        }))
    }
  }

  dealCard() {
    for (var i = 0 ; i < this.state.players.length ; i ++) {
      this.state.players[i].props.hand.push(this.state.deck.pop())
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
      <h3>Pot:</h3>

        {this.state.pot}
        <h3>Players:</h3>
        {this.state.players.map(player => player)}

        <h3>House:</h3>
        {this.state.houseCards.map(c =>  <p> {c.number} of {c.suit} </p> )}
      </div>  
    )
  }
}

export default Round;