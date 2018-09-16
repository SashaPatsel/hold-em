import React, {Component} from "react";
import Round from "./Round"

class Game extends Component {
  state = {
    pot: 0,
    players: 0
  }

  componentDidMount() {
    
  }

  

  render () {
    return (
      <div>
        <Round/>
      </div>  
    )
  }
}

export default Game;