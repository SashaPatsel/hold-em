import React, {Component} from "react";

class Player extends Component {

  constructor(name, wealth) {
    super(name) 
      this.state = {
        name: name,
        wealth: wealth,
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
  }


  render() {
    return (
      <div>
        {this.props.name}
      </div>  
    )
  }
}

export default Player