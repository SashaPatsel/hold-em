import React from "react";

class PlayerLogic {
  constructor (name, wealth, key) {
    this.name= name,
    this.wealth= wealth,
    this.hand= [],
    this.key= key
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

  
}

export default PlayerLogic