import React from "react";

class PlayerLogic {
  constructor (name, wealth, dealer, smallBlind, bigBlind, key) {
    this.name= name
    this.wealth= wealth
    this.hand= []
    this.dealer = dealer
    this.smallBlind = smallBlind
    this.bigBlind = bigBlind
    this.key= key
    this.fold = this.fold.bind(this);
    this.call = this.call.bind(this);
    this.raise = this.raise.bind(this);
  }

  fold() {

    console.log(this.key)
    this.wealth--
  }

  call() {
    
  }

  raise() {

  }

  
}

export default PlayerLogic