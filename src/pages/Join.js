import React, { Component } from "react"
import firebase from "../data/Firebase"
import TableCard from "../components/cards/TableCard"

const db = firebase.firestore();

class Join extends Component {

  state = {
    tables: [],
    update: ""
  }

  componentDidMount() {
    this.getTables()
  }

  getTables() {
    db.collection("tables").get().then(doc => {
      
      doc.docs.map(d => {
        const wholeDoc = d.data()
        wholeDoc["id"] = d.ref.id
        console.log(wholeDoc)
        this.state.tables.push(wholeDoc)
      })

      this.setState({
        update: "updated"
      })

    })
    console.log(this.state)
  }

  handleChange= e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  chooseTable() {
    // localStorage.setItem("table", this.state.docID)
    // localStorage.setItem("player", docRef.id)
  }


  render() {
    return (
      <div>
        {this.state.tables.map(doc => (
          <TableCard onChange={this.handleChange} onSubmit={this.chooseTable} name={doc.tableName} key={doc.id}/>
        ))}
      </div>
    )
  }
}

export default Join