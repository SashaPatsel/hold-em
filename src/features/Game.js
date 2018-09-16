import React, {Component} from "react";
import deck from "../data/deck.json"

class Game extends Component {
  state = {
    deck: deck,
    minBet: .5
  }

  componentDidMount() {
    this.shuffle(this.state.deck)
    this.state.deck.pop()
    console.log(this.state.deck.pop())
    console.log(this.state.deck)
  }

  //Knuth Shuffle
  shuffle = (arr) => {
  let currentIndex = arr.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  this.setState({
    cards: arr
  });
}

  

  render () {
    return (
      <div>
      </div>  
    )
  }
}

export default Game;