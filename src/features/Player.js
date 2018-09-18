import React, {Component} from "react";
import Button from "../components/Button"

class Player extends Component {

  state =  {
    name: this.props.name,
    wealth: this.props.wealth,
    hand: this.props.hand,
    key: this.props.key
    // currBet: currBet,
    // inPot: inPot,
    // fold: fold,
    // bet: bet,
    // raise: raise,
    // call: call,
    // dealer: dealer,
    // smallBlind: smallBlind,
    // bigBlind: bigBlind,
    // isTurn: isTurn 
  }


      componentDidMount() {
        this.payBlind()
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
            wealth: this.state.wealth - .25
          })
        } else if (this.state.bigBlind === true) {
          this.setState({
            wealth: this.state.wealth - .50
          })
        }
      }

      fold() {
        // props.fold
        
      }
    
      call() {
        this.props.call
      }
    
      raise() {
        this.props.raise
      }


  render() {

    return (
      <div>
        <h4>{this.state.name}:</h4>
        {this.state.hand.length > 0 ? this.renderHand(): "Wait to be dealt your hand"}
        Wealth: {this.state.wealth}
        <Button click={this.props.fold} text="Fold"/>
        <Button click={this.call} text="Call"/>
        <Button click={this.raise} text="Raise"/>
       
      </div>  
    )
  }
}

export default Player