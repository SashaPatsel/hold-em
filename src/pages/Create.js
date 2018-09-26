import React, { Component } from "react"
import firebase from "../data/Firebase"
import deck from "../data/deck"


import Input from "../components/Form/Input"

const db = firebase.firestore();


// PAGE GOALS:
// 1. To create a table with user specifications
class Create extends Component {

  state ={
    tableName: "",
    maxPlayers: 0,
    bb: 0,
    sb: 0,
    buyBack: false,
    public: false,
    minBuyIn: 0,
    maxBuyIn: 0
  }

  handleChange = e => {

   const {name, value} = e.target
    this.setState({
      [name]: value,
      minBuyIn: this.state.bb * 40,
      maxBuyIn: this.state.bb * 100
    })

  }

  submitTableForm = e => {
    const table = this
    e.preventDefault()
    db.collection("tables").add({
      tableName: this.state.tableName,
      maxPlayers: this.state.maxPlayers,
      bb: this.state.bb,
      sb: this.state.sb,
      buyBack: this.state.buyBack,
      public: this.state.public,
      minBuyIn: this.state.minBuyIn,
      maxBuyIn: this.state.maxPlayers,
      deck: deck,
      players: []
  })
  .then(function(docRef) {
      console.log(" docRef", docRef.id);

      table.setState({
        docID: docRef.id
      })
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
  
  }  

  submitPlayerForm = e => {
    e.preventDefault()
    console.log(this.state)
    db.collection("tables").doc(this.state.docID).collection("players").add({

        name: this.state.playerName,
        stack: this.state.buyIn,
        host: true,
        dealer: true,
        smallBlind: false,
        bigBlind: false,
        inPot: 0,
        inBetRound: 0,
        key: 1

    }).then(docRef => {
      console.log(docRef)
      localStorage.setItem("table", this.state.docID)
      localStorage.setItem("player", docRef.id)
      window.location.href = '/game';
    })
  }

  render() {
    return (
      <div>
        Min Buy-In: {this.state.minBuyIn}
        <br/>
        Max Buy-In: {this.state.maxBuyIn}


        <form onSubmit={this.submitTableForm} >
          <Input name="tableName" label="Table Name" type="text" onChange={this.handleChange}/>
          <Input name="maxPlayers" label="Max Players" type="number" max={9} onChange={this.handleChange}/>
          <Input name="bb" label="Big Blind" type="number"  step={.05} min={.1} onChange={this.handleChange}/>
          <Input name="sb" label="Small Blind" type="number"  step={.05} min={.1} max={this.state.bb/2} onChange={this.handleChange}/>
          <label>Buy Backs</label>
          <select name="buyBack" onChange={this.handleChange}>
            <option value={true}>Yes</option>
            <option  value={false}>No</option>
          </select>
          <label>Private/Public</label>
          <select name="public" onChange={this.handleChange}>
            <option value={false}>Private</option>
            <option value={true}>Public</option>
          </select>
          <Input type="submit" value="Create Table"/>
        </form >

        <br/><br/><br/><br/><br/><br/><br/>
        
        <form onSubmit={this.submitPlayerForm}>
          <Input name="playerName" label="User Name" type="text" onChange={this.handleChange}/>
          <Input name="buyIn" label="Buy In" min={this.state.minBuyIn} max={this.state.maxBuyIn} type="number" onChange={this.handleChange}/>
          <Input type="submit" value="Join Table"/>
        </form>  
      </div>
    )
  }
}

export default Create