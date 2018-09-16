import React, {Component} from "react";
import Round from "./Round";
import Player from "./Player";

class Game extends Component {
  state = {
    totalStakes: 0,
    currRound: "",
    players: []
  }

  componentDidMount() {
    // Add the players to the game
    this.newPlayer()
    this.newRound()
  }

  newPlayer() {
    this.state.players.push( <Player name="Sasha" wealth={10} hand={[]}
    currBet= {0}
    inPot= {0}
    fold= {false}
    bet= {false}
    raise= {false}
    call= {false}
    dealer= {false}
    smallBlind= {false}
    bigBlind= {false} 
    />)

    this.state.players.push( <Player name="Dilsey" wealth={10} hand={[]}
    currBet= {0}
    inPot= {0}
    fold= {false}
    bet= {false}
    raise= {false}
    call= {false}
    dealer= {false}
    smallBlind= {false}
    bigBlind= {false} 
    />)
    // this.state.players[0].state.hand.push(1)
    console.log(this.state.players[0])
  }

  newRound() {
    this.setState({
      currRound: <Round
      players={this.state.players}
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