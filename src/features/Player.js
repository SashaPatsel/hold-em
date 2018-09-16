import React, {Component} from "react";

class Player extends Component {

      state = {
        name: this.props.name,
        wealth: this.props.wealth,
        hand: this.props.hand,
        currBet: 0,
        inPot: 0,
        fold: false,
        bet: false,
        raise: false,
        call: false,
        dealer: false,
        smallBlind: false,
        bigBlind: false 
      }




  render() {
    return (
      <div>
        {this.state.name}
      </div>  
    )
  }
}

export default Player