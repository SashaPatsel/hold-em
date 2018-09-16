import React, { Component } from "react";
import deck from "../data/deck.json"
import Player from "./Player"

class Round extends Component {
  state = {
    deck: deck,
    pot: 0,
    houseCards: [],
    minBet: .25,
    players: [],
    // array of indices [D, SB, BB]]
    blinds: this.props.blinds,
    turnQueue: 0,
  }



  componentDidMount() {

    this.startRound()
    console.log("Round", this.state)
  }



  startRound() {

    // Shuffle the Deck
    this.shuffle(this.state.deck)

    // Move read-only player stats to Round state so that they can be changed
    this.newPlayers()

    // Get the blinds
    // this.payBlinds()

    // Deal one card to each player, then repeat
    this.dealCard()
    this.dealCard()

    // Promise not working
    // this.whosTurn().then(console.log(this.state.turnQueue))

    // Start first round of betting
    const wait = setTimeout(() => {
      console.log(this.state.turnQueue)
    }, 0)

    //  Bring out the flop
    this.flop()
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

  payBlinds() {
    for (let i = 0 ; i < this.state.players.length ; i++) {
      if (this.state.players[i].props.bigBlind === true) {
        console.log(this.state.players[i].props.wealth-(this.state.minBet*2))

        this.state.players[i].props.wealth = this.state.players[i].props.wealth-(this.state.minBet*2)
      }
    }
  }

  // Async not working... Still using setTimeout
  async whosTurn() {
    // return Promise.resolve(this.setState({
    //   turnQueue: 908
    // }))
    if (this.state.turnQueue === this.state.players.length - 1) {
      (this.setState({
        turnQueue: 0
      }))
    }
  }

  dealCard() {
    for (let i = 0; i < this.state.players.length; i++) {
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





  render() {
    return (
      <div>
        <h3>Pot:</h3>
        {this.state.pot}
        
        <h3>Players:</h3>
        {this.state.players.map(player => player )}

        <h3>House:</h3>
        {this.state.houseCards.map(c => <p> {c.number} of {c.suit} </p>)}
      </div>
    )
  }
}

export default Round;