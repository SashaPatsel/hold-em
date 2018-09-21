import React from "react";

class PlayerStats {
  constructor(name, stack, dealer, sb, bb, inPot, inBetRound, id) {
    this.name = name
    this.stack = stack
    this.hand = []
    this.dealer = dealer
    this.sb = sb
    this.bb = bb
    this.inPot = inPot
    this.inBetRound = inBetRound
    this.id = id
  }

}

export default PlayerStats