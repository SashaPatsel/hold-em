import React, {Component} from "react";
import Button from "../components/Button"

class Player extends Component {
constructor(name, wealth) {
  super()
  this.state = {
    name: name,
    wealth: wealth,
    hand: []
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
}

      // Create array of players. State can mange the player him/herself, constructor can manage ineractions w/ round
      // constructor(chicken, bacon, farley) {
      //   super()
      //   this.name= chicken
      //   this.bet = bacon
      //   this.farley = farley
      // }

      inhurr() {
        console.log("im in dis bitch")
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
        this.setState({
          fold: true
        })
      }

      call() {
        
      }

      raise() {

      }


  render() {

    return (
      <div>
        <h4>{this.state.name}:</h4>
        {this.state.hand.length > 0 ? this.renderHand(): "Wait to be dealt your hand"}
        Wealth: {this.state.wealth}
        <Button click={this.fold} text="Fold"/>
        <Button click={this.call} text="Call"/>
        <Button click={this.raise} text="Raise"/>
       
      </div>  
    )
  }
}

export default Player