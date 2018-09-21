import React, { Component } from "react";
import Button from "../components/Button"


class Player extends Component {

  state = {
    name: this.props.name,
    wealth: this.props.wealth,
    hand: this.props.hand,
    key: this.props.id,

    inHand: true,
    inTurn: 0,
    inPot: 0


  }


  componentDidMount() {
    this.payBlind()

  }

  updateState(state) {
    console.log("yo")
    this.setState({
      action: state
    })
  }

  renderHand() {
    // switch 
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
        wealth: this.state.wealth - this.state.minBet,
        inTurn: this.state.minBet,
        inPot: this.state.minBet
      })
    } else if (this.state.bigBlind === true) {
      this.setState({
        wealth: this.state.wealth - this.state.minBet * 2,
        inTurn: this.state.minBet,
        inPot: this.state.minBet
      })
    }
  }

  fold() {
    this.setState({
      inTurn: false
    })

  }

  call() {
    // If the key matches action, which should be passed down as a prop...
    console.log(this.state)
    if (this.state.action === this.state.key) {
      this.setState({
        wealth: this.state.wealth - (this.props.currBet - this.state.inTurn)
      })
    }

  }

  raise() {

  }


  render() {

    return (
      <div className="player">
        <div className={this.props.status}>
          <h4>{this.state.name}:</h4>
          {this.state.hand.length > 0 ? this.renderHand() : "Wait to be dealt your hand"}
          Stack: {this.props.stack}
          In Pot: 
          <Button click={() => this.props.fold() } text="Fold" />
          <Button click={() => this.props.call() } text="Call" />
          <Button click={() => this.props.raise()} text="Raise" />
          
        </div>


      </div>
    )
  }
}

export default Player