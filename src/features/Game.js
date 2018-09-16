import React, {Component} from "react";
import Round from "./Round";
import Player from "./Player";

class Game extends Component {
  state = {
    totalStakes: 0,
    currRound: "",
    players: [],
    keyCount: 1
  }

  componentDidMount() {
    // Add the players to the game
    this.state.keyCount++

    // SET STATE NOT WORKING?!!?!
    this.setState({
      keyCount: this.state.keyCount+1
    })
    
    console.log("Game",this.state)
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
    smallBlind= {false}
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
    bigBlind= {false} 
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