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
        this.payBlind()
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

      payBlind() {
        if (this.state.smallBlind === true) {
          this.setState({
            wealth: this.state.wealth - .25
          })
        } else if (this.state.bigBlind === true) {
          this.setState({
            wealth: this.state.wealth - .50
          })
        }
      }


  render() {

    return (
      <div>
        <h4>{this.state.name}:</h4>
        {this.state.hand.length > 0 ? this.renderHand(): "Wait to be dealt your hand"}
        Wealth: {this.state.wealth}

       
      </div>  
    )
  }
}

export default Player