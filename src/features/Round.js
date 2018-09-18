import React, { Component } from "react";
import deck from "../data/deck.json"
import Player from "./Player"

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
    playas: [],
    // array of indices [D, SB, BB]]
    blinds: this.props.blinds,
    turnQueue: 0,
  }



  componentWillMount() {

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
    // this.dealCard()
    // this.dealCard()

    // Promise not working
    // this.whosTurn().then(console.log(this.state.turnQueue))
    this.whosTurn()

    // Start first round of betting
    const wait = setTimeout(() => {
      console.log(this.state.turnQueue)
      console.log(this.state.players)
      console.log(this.state.playas)
      this.state.playas[0].inhurr()
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

    // for (let i = 0 ; i < players.length ; i++) {
    //   this.state.players.push( <Player 
    //   name={players[i].name} 
    //   wealth={10} 
    //   hand={[]}
    //   currBet= {0}
    //   inPot= {0}
    //   fold= {false}
    //   bet= {false}
    //   raise= {false}
    //   call= {false}
    //   dealer= {true}
    //   smallBlind={false}
    //   bigBlind= {false} 
    //   isTurn={false}
    //   key={players[i].key}
    //   />)
    // }

    for (let i = 0 ; i < players.length ; i++) {
      this.state.playas.push(new Player(players[i].name, 10))
    }

  }

  addBlinds() {
    // Add small blind + big blind
    this.setState({
      pot: this.state.minBet + (this.state.minBet * 2)
    })
  }


  // Async not working... Still using setTimeout
 whosTurn() {
   
    // return Promise.resolve(this.setState({
    //   turnQueue: 908
    // }))
  for (let i = 0 ; i < this.state.players.length ; i++) {
    if (this.state.players[i].bigBlind === true) {
      // Player to left of bigBlind bets
      this.state.players[i+1].isTurn = true
    }
  }
  var hk = setTimeout(() => {
    console.log(this.state.players)
  },10)
  

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
        {/* {players.map(player => 
      <Player 
      name= {player.name}
      wealth={player.wealth} 
      hand={[this.state.deck.pop(),this.state.deck.pop()]}
      currBet= {0}
      inPot= {0}
      fold= {false}
      bet= {false}
      raise= {false}
      call= {false}
      dealer= {player.dealer}
      smallBlind= {player.smallBlind}
      bigBlind= {player.bigBlind} 
      isTurn={false}
      key={player.key}
      
      />  
      )} */}

        <h3>House:</h3>
        {this.state.houseCards.map(c => <p> {c.number} of {c.suit} </p>)}
      </div>
    )
  }
}

export default Round;