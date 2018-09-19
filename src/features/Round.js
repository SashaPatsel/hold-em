import React, { Component } from "react";
import deck from "../data/deck.json"
import Player from "./Player"

const players = [
  {
    name: "Sasha",
    wealth: 10,
    hand: [],
    dealer: true,
    smallBlind: false,
    bigBlind: false,
    inHand: true,
    key: 1
  },
  {
    name: "Dilsey",
    wealth: 10,
    hand: [],
    dealer: false,
    smallBlind: true,
    bigBlind: false,
    inHand: true,
    key: 2
  },
  {
    name: "Brian",
    wealth: 10,
    hand: [],
    dealer: false,
    smallBlind: false,
    bigBlind: true,
    inHand: true,
    key: 3
  },
  {
    name: "Bax",
    wealth: 10,
    hand: [],
    dealer: false,
    smallBlind: false,
    bigBlind: false,
    inHand: true,
    key: 4
  },
]


class Round extends Component {
  state = {
    deck: deck,
    pot: 0,
    houseCards: [],
    minBet: .1,
    players: [],
    playersInHand: [],
    dealer: this.props.dealer,
    action: 1,
    currBet: 0,
    0: "player__waiting",
    1: "player__waiting",
    2: "player__waiting",
    3: "player__waiting",
    4: "player__waiting",
    5: "player__waiting",
    6: "player__waiting",
    7: "player__waiting",
    8: "player__waiting",
    9: "player__waiting",
    10: "player__waiting",
    11: "player__waiting",
    12: "player__waiting"

  }



  async componentWillMount() {
    this.fold = this.fold.bind(this)
    await this.setState({
      action: this.state.dealer + 3
    })
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

    for (let i = 0; i < players.length; i++) {
      this.state.players.push(players[i])
      this.state.playersInHand.push(players[i].key)
    }

  }

  addBlinds() {
    // Add small blind + big blind
    this.setState({
      pot: ((this.state.minBet + this.state.minBet * 2).toFixed(2)),
      currBet: this.state.minBet * 2
    })
  }



  whosTurn() {

    for (var i = 0; i < players.length; i++) {
      const last = this.state.action
      if (this.state.action === this.state.playersInHand[i] && i !== 0) {
        console.log("if",this.state.playersInHand[i-1])
        this.setState({
          
          [this.state.playersInHand[i-1]]: "player__waiting",
          [this.state.playersInHand[i]]: "player__action"
        })
      } else if (this.state.action === this.state.playersInHand[i] && i === 0) {
        console.log("else",this.state.playersInHand.length -1)
        this.setState({
          [this.state.playersInHand[this.state.playersInHand.length -1]]: "player__waiting",
          [this.state.playersInHand[i]]: "player__action"
        })
      }
    }


  }

  async moveAction() {
    if (this.state.action === this.state.playersInHand.length) {
      await this.setState({
        action: 1
      })
    } else {
      await this.setState({
        action: this.state.action + 1
      })
    }
    this.whosTurn()
  }

 outOfHand(id) {

    for (var i = 0; i < this.state.playersInHand.length; i++) {
      if (this.state.playersInHand[i] === id) {
        
         this.setState({
          [this.state.playersInHand[i]]: "player__out"
        })
 
        this.state.playersInHand.splice(i,1)

      }
    }
  }

  dealCard() {
    for (let i = 0; i < this.state.players.length; i++) {
      this.state.players[i].hand.push(this.state.deck.pop())
    }
  }



  fold(id) {

    if (id === this.state.action) {
      this.moveAction()
      this.outOfHand(id)
    } else {
      console.log("It ain't yo turn")
    }

  }

  call(id) {
    if (id === this.state.action) {
      this.moveAction()
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
        Action on player &nbsp;
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
            minBet={this.state.minBet}
            dealer={player.dealer}
            smallBlind={player.smallBlind}
            bigBlind={player.bigBlind}
            currBet={this.state.currBet}
            fold={() => this.fold(player.key)}
            call={() => this.call(player.key)}
            action={this.state[player.key]}
          />
        )}

        <h3>House:</h3>
        {this.state.houseCards.map(c => <p> {c.number} of {c.suit} </p>)}
      </div>
    )
  }
}

export default Round;