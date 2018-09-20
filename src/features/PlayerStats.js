import React from "react";

class PlayerStats {
  constructor(name, stack, dealer, sb, bb, inHand, id) {
    this.name = name
    this.stack = stack
    this.hand = []
    this.dealer = dealer
    this.sb = sb
    this.bb = bb
    this.inHand = inHand
    this.id = id
  }

}

export default PlayerStats