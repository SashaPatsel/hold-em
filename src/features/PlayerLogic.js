import React from "react";

class PlayerLogic {
  constructor (name, wealth, key) {
    this.name= name,
    this.wealth= wealth,
    this.hand= [],
    this.key= key
    this.fold = this.fold.bind(this);
    this.call = this.call.bind(this);
    this.raise = this.raise.bind(this);
  }

  fold() {
    // this.setState({
    //   fold: true
    // })
    console.log(this.key)
  }

  call() {
    
  }

  raise() {

  }

  
}

export default PlayerLogic