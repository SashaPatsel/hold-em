import React, { Component } from "react"
import firebase from "../data/Firebase"

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

  submitForm = e => {
    e.preventDefault()
    db.collection("tables").add({
      tableName: this.state.tableName,
      maxPlayers: this.state.maxPlayers,
      bb: this.state.bb,
      sb: this.state.sb,
      buyBack: this.state.buyBack,
      public: this.state.public,
      minBuyIn: this.state.minBuyIn,
      maxBuyIn: this.state.maxPlayers
  })
  .then(function(docRef) {
      console.log(" docRef", docRef);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
  
  }  

  render() {
    return (
      <div>
        Min Buy-In: {this.state.minBuyIn}
        <br/>
        Max Buy-In: {this.state.maxBuyIn}


        <form onSubmit={this.submitForm} >
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
      </div>
    )
  }
}

export default Create