import React, {Component} from "react";

class Player extends Component {

      state = {
        name: this.props.name,
        wealth: this.props.wealth,
        hand: this.props.hand,
        currBet: this.props.currBet,
        inPot: this.props.inPot,
        fold: this.props.fold,
        bet: this.props.bet,
        raise: this.props.raise,
        call: this.props.call,
        dealer: this.props.dealer,
        smallBlind: this.props.smallBlind,
        bigBlind: this.props.bigBlind 
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