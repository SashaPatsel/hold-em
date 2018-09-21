import React, { Component } from "react";
import deck from "../data/deck.json"
import Player from "./Player"
import PlayerStats from "./PlayerStats"


const players = [
  {
    name: "Sasha",
    stack: 10,
    hand: [],
    dealer: true,
    smallBlind: false,
    bigBlind: false,
    inPot: 0,
    inBetRound: 0,
    key: 1
  },
  {
    name: "Dilsey",
    stack: 10,
    hand: [],
    dealer: false,
    smallBlind: true,
    bigBlind: false,
    inPot: 0,
    inBetRound: 0,
    key: 2
  },
  {
    name: "Brian",
    stack: 10,
    hand: [],
    dealer: false,
    smallBlind: false,
    bigBlind: true,
    inPot: 0,
    inBetRound: 0,
    key: 3
  },
  {
    name: "Bax",
    stack: 10,
    hand: [],
    dealer: false,
    smallBlind: false,
    bigBlind: false,
    inPot: 0,
    inBetRound: 0,
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
    action: 0,
    actionID: 0,
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



  componentWillMount() {


    this.startRound()
    console.log("Round", this.state)

  }



  async startRound() {

    // Shuffle the Deck
    this.shuffle(this.state.deck)

    // Move read-only player stats to Round state so that they can be changed
    this.newPlayers()
    await this.setState({
      action: this.state.dealer + 3
    })
    // Add blinds
    this.payBlinds()
    // Deal one card to each player, then repeat
    this.dealCard()
    this.dealCard()

    this.whosTurn(null)

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
      this.state.players.push(new PlayerStats(players[i].name, players[i].stack, players[i].dealer, players[i].smallBlind, players[i].bigBlind, players[i].inPot,players[i].inBetRound, players[i].key))
      // this.state.players.push(players[i])
      this.state.playersInHand.push(players[i].key)
    }

  }

  payBlinds() {
    // Add small blind + big blind
    this.setState({
      pot: (this.state.minBet * 2).toFixed(2),
      currBet: this.state.minBet * 2
    })


    for (var i = 0 ; i < this.state.players.length ; i++) {
      if (this.state.players[i].sb) {
       
        this.state.players[i].stack-=this.state.minBet
        this.state.players[i].inPot+=this.state.minBet
        this.state.players[i].inBetRound+=this.state.minBet
      }

      if (this.state.players[i].bb) {
        this.state.players[i].stack-=this.state.minBet*2
        this.state.players[i].inPot+=this.state.minBet*2
        this.state.players[i].inBetRound+=this.state.minBet*2
      }
    }

  }

  checkWin() {
    if (this.state.playersInHand.length < 2) {
      console.log(`${this.state.playersInHand[0]} wins!`)
    }
  }


  whosTurn(id) {
    // check for winner everytime action moves
    this.checkWin()

  if (id) {
// normal behavior
    this.setState({
      [id]: "player__waiting",
      [this.state.playersInHand[this.state.action]]: "player__action",
      actionID: this.state.playersInHand[this.state.action]
    })
    // Handle the loss of a player in the playersInHand array
  } else {
    this.setState({
      [this.state.playersInHand[this.state.action]]: "player__action",
      actionID: this.state.playersInHand[this.state.action]
    })
  }



  }

  async moveAction(id, first) {

    // If the last player in the array invokes this function...
    if (this.state.action >= this.state.playersInHand.length - 1 || first === 0) {
     await  this.setState({
        action: 0
      })
    } else {
          
    await  this.setState({
        action: this.state.action + 1
      })
    }
    // console.log("action after whosTurn", this.state.action)
    this.whosTurn(id)
  }

  outOfHand(id) {

    this.setState({
      [this.state.playersInHand[this.state.action]]: "player__out"
    })
    this.state.playersInHand.splice(this.state.playersInHand.indexOf(id), 1)
    // Keep track of action here before it changes. This helps move action recognize its a fold rather than bet or call
    const ifFirst = this.state.action
    // don't move the action if anyone but the first or last person folded
    if (ifFirst !== 0 && ifFirst !== this.state.playersInHand.length) {
      console.log(ifFirst,this.state.playersInHand.length )
      this.whosTurn(null)
    } else {
    // Pass null so whosTurn function knows player folded
    this.moveAction(null, ifFirst)
    }

  }

  dealCard() {
    for (let i = 0; i < this.state.players.length; i++) {
      this.state.players[i].hand.push(this.state.deck.pop())
    }
  }



  fold(id) {

    if (id === this.state.playersInHand[this.state.action]) {
      this.outOfHand(id)
      

    } else {
      console.log("It ain't yo turn")
    }

  }

 async call(id) {
    if (id === this.state.playersInHand[this.state.action]) {
      // Update the players stack as well as the pot
      for (var i = 0 ; i < this.state.players.length ; i++) {
        if (id === this.state.players[i].id) {
          console.log(this.state.currBet, this.state.players[i].inBetRound)
          // Update player's money in pot
          this.state.players[i].inPot += this.state.currBet - this.state.players[i].inBetRound
          // Update players stack
          this.state.players[i].stack -= this.state.currBet - this.state.players[i].inBetRound
          
         await this.setState({
            pot: (parseFloat(this.state.pot) + this.state.currBet - this.state.players[i].inBetRound).toFixed(2)
          })
        }
      }
      this.moveAction(id, null)
    }
  }

  flop() {
    // Burn a card
    this.state.deck.pop()

    this.state.houseCards.push(this.state.deck.pop())
    this.state.houseCards.push(this.state.deck.pop())
    this.state.houseCards.push(this.state.deck.pop())
// Will need to reinitialize moneyInRound
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
            id={player.key}
            stack={player.stack}
            minBet={this.state.minBet}
            dealer={player.dealer}
            smallBlind={player.smallBlind}
            bigBlind={player.bigBlind}
            currBet={this.state.currBet}
            fold={() => this.fold(player.id)}
            call={() => this.call(player.id)}
            status={this.state[player.id]}
            action={this.state.actionID}
          />
        )}

        <h3>House:</h3>
        {this.state.houseCards.map(c => <p> {c.number} of {c.suit} </p>)}
      </div>
    )
  }
}

export default Round;