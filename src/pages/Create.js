import React, { Component } from "react"
import Input from "../components/Form/Input"

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
    console.log(this.state)
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