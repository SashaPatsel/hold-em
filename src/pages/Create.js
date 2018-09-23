import React, { Component } from "react"
import Input from "../components/Form/Input"

// PAGE GOALS:
// 1. To create a table with user specifications
class Create extends Component {

  state ={
    bb: 0
  }

  handleChange = e => {
    this.setState({
      bb: e.target.value
    })
  
  }

  render() {
    return (
      <div>
        {this.state.bb}
        <form>
          <Input label="Table Name" type="text" />
          <Input label="Max Players" type="number" max={9} />
          <Input label="Big Blind" type="number" onChange={this.handleChange}/>
          <Input label="Min Buy-In" type="number" />
          <Input label="Max Buy-In" type="number" />
          <label>Buy Backs</label>
          <select>
            <option>Yes</option>
            <option>No</option>
          </select>
          <label>Private/Public</label>
          <select>
            <option>Private</option>
            <option>Public</option>
          </select>
          <Input />
        </form>
      </div>
    )
  }
}

export default Create