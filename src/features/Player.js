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

      componentDidMount() {
        this.setState({
          bigBlind: false
        })
      }

      renderHand() {
        return (
          <div>
          {this.state.hand[0].number} of {this.state.hand[0].suit}
          &nbsp; and &nbsp;
          {this.state.hand[1].number} of {this.state.hand[1].suit}
          </div>
        )
      }


  render() {

    return (
      <div>
        {this.state.name}:
        {this.state.hand.length > 0 ? this.renderHand(): "Wait to be dealt your hand"}


       
      </div>  
    )
  }
}

export default Player