import React, { Component } from "react";
import deck from "../data/deck.json"
import Player from "./Player"
import PlayerStats from "./PlayerStats"
import Input from "../components/Form/Input"
import firebase from "../data/Firebase"
import CardFront from "../components/cards/CardFront";

const db = firebase.firestore();


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
    deck: this.props.deck,
    pot: 0,
    houseCards: [],
    minBet: .1,
    players: this.props.players,
    gameRef: {},
    playersInHand: [],
    actionStarter: 0,
    playerMoves: 0,
    betRound: 0,
    dealer: this.props.dealer,
    roundJustStarted: true,
    action: 0,
    actionID: 0,
    currBet: 0,
    playas:[],
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

  async getGame() {
    let game;
    await db.collection("tables").doc(localStorage.getItem("table")).get().then(doc => {
     game = doc.data()
    })
    return game
  }

  async getPlayers() {
    
   await db.collection("tables").doc(localStorage.getItem("table")).collection("players").get().then(doc => {
     const playerDocs = []
     doc.forEach(d => {
       console.log(d.data())
       playerDocs.push(d.data())
     })
     this.setState({
       players: playerDocs
     }, () => console.log(this.state.players))
    })

  }




  async startRound() {
    await this.getPlayers()
    await this.getGame()
    // Shuffle the Deck
    // this.shuffle(this.state.deck)

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
    // Set the action on a specific player
    this.whosTurn(null)
    // Store the first player to act so we know when to deal the flop
    this.storeActionStarter()
  }




  newPlayers() {
    // Create non-react classes to store player logic
    for (let i = 0; i < players.length; i++) {
      this.state.players.push(new PlayerStats(players[i].name, players[i].stack, players[i].dealer, players[i].smallBlind, players[i].bigBlind, players[i].inPot, players[i].inBetRound, players[i].key))
      // this.state.players.push(players[i])
      this.state.playersInHand.push(players[i].key)
    }

    // const players = this.fireRef().players
    

  }

  payBlinds() {
    // Add small blind + big blind
    this.setState({
      pot: (this.state.minBet + this.state.minBet * 2).toFixed(2),
      currBet: this.state.minBet * 2
    })


    for (var i = 0; i < this.state.players.length; i++) {
      // Pay small blind
      if (this.state.players[i].sb) {

        this.state.players[i].stack -= this.state.minBet
        this.state.players[i].inPot += this.state.minBet
        this.state.players[i].inBetRound += this.state.minBet
      }
      // pay big blind
      if (this.state.players[i].bb) {
        this.state.players[i].stack -= this.state.minBet * 2
        this.state.players[i].inPot += this.state.minBet * 2
        this.state.players[i].inBetRound += this.state.minBet * 2
      }
    }

  }

  checkWin() {
    if (this.state.playersInHand.length < 2) {
      console.log(`${this.state.playersInHand[0]} wins!`)
      const player = this.checkPlayer(this.state.playersInHand[0])
      
      player.stack += parseFloat(this.state.pot)
      this.setState({
        inPot: 0
      })
    }
  }
  
  // Action starter will tell us when to increment to next round
  storeActionStarter() {
    this.setState({
      actionStarter: this.state.playersInHand.length
    })
  }
  
  // Check to see if we should move to next round of betting
  checkBetRound() {
    // When everyone has acted
    if (this.state.playerMoves === this.state.actionStarter) {
      // Determine who t
      this.storeActionStarter()
      this.setState({
        betRound: this.state.betRound + 1,
        playerMoves: 0
      })
      if (this.state.betRound === 1) {
        this.flop()
        // Show cards
      }else if (this.state.betRound > 3) {
        console.log("Show Your cards")
      } else {
        this.turnRiver()
      }
      
    }
  }



  checkPlayer(id) {

    for (var i = 0; i < this.state.players.length; i++) {

      if (this.state.players[i].id === id) {

        return this.state.players[i]
      }
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
    if (!this.state.roundJustStarted) {
      this.checkBetRound()

    }
    this.setState({
      roundJustStarted: false
    })
  }

  async moveAction(id, first) {

    // If the last player in the array invokes this function...
    if (this.state.action >= this.state.playersInHand.length - 1 || first === 0) {
      await this.setState({
        action: 0
      })
    } else {

      await this.setState({
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
      console.log(ifFirst, this.state.playersInHand.length)
      this.whosTurn(null)
    } else {
      // Pass null so whosTurn function knows player folded
      this.moveAction(null, ifFirst)
    }

  }

  dealCard() {
    this.getGame().then(game => {
      console.log(game)
    })

    this.getPlayers().then(player => {
      // console.log(player)
    })

    // for (let i = 0; i < this.state.players.length; i++) {
    //   this.state.players[i].hand.push(this.state.deck.pop())
    // }
  }



  async fold(id) {

    if (id === this.state.playersInHand[this.state.action]) {
     await this.setState({
        playerMoves: this.state.playerMoves + 1
      })
      this.outOfHand(id)


    } else {
      console.log("It ain't yo turn")
    }

  }

  async call(id) {
    if (id === this.state.playersInHand[this.state.action]) {
      // Update the players stack as well as the pot
     await this.setState({
        playerMoves: this.state.playerMoves + 1
      })
      const player = this.checkPlayer(id)

      // Update player's money in pot
      player.inPot += this.state.currBet - player.inBetRound
      // Update players stack
      player.stack -= this.state.currBet - player.inBetRound

      await this.setState({
        pot: (parseFloat(this.state.pot) + this.state.currBet - player.inBetRound).toFixed(2)
      })

      this.moveAction(id, null)
    }
  }

  async raise(id) {
    if (id === this.state.playersInHand[this.state.action]) {
      await this.setState({
        playerMoves: this.state.playerMoves + 1
      })
      const player = this.checkPlayer(id)
      if (this.state[player.name] < this.state.currBet || !this.state[player.name]) {
        console.log("You need to raise to at least double the current bet")
      } else if (this.state[player.name] > player.stack) {
        console.log("Get yo money up")
      } else {
        player.inPot += this.state[player.name]
        player.stack -= this.state[player.name]

        await this.setState({
          pot: (parseFloat(this.state.pot) + parseFloat(this.state[player.name])).toFixed(2),
          currBet: parseFloat(this.state[player.name])
        })
        this.moveAction(id, null)
      }
    }
  }

  handleInputChange = event => {
    const { id, name, value } = event.target;
    if (parseInt(event.target.id) === this.state.playersInHand[this.state.action]) {
      this.setState({
        [name]: value
      });
    }
  };

  flop() {
    // Burn a card
    this.state.deck.pop()

    this.state.houseCards.push(this.state.deck.pop())
    this.state.houseCards.push(this.state.deck.pop())
    this.state.houseCards.push(this.state.deck.pop())

    // Will need to reinitialize moneyInRound
  }

  turnRiver() {
    this.state.deck.pop()

    this.state.houseCards.push(this.state.deck.pop())
  }


  render() {
    return (
      <div className="round">
        {/* <div style={{"margin": "4rem 2rem"}}>
        <CardFront number="8" color="rgba(255,10,10)"/>
        </div> */}
        Action on player &nbsp;
        {this.state.action}
        <h3>Pot:</h3>
        {this.state.pot}

        <h3>Players:</h3>
        {this.state.players.map(player =>
          <div>
            <Player
              name={player.name}
              wealth={player.wealth}
              hand={player.hand}
              key={player.key}
              id={player.key}
              stack={player.stack}
              inPot={player.inPot}
              currBet={this.state.currBet}
              fold={() => this.fold(player.id)}
              call={() => this.call(player.id)}
              raise={() => this.raise(player.id)}
              status={this.state[player.id]}
              action={this.state.actionID}
            />
              {/* Step should be set in state */}
            <Input onChange={this.handleInputChange} type="number" min={0} step={.1} name={player.name} id={player.id} />
          </div>
        )}

        <h3>House:</h3>
        {this.state.houseCards.map(c => <p> {c.number} of {c.suit} </p>)}
      </div>
    )
  }
}

export default Round;