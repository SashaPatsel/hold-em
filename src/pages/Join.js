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

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  chooseTable = id => {

    db.collection("tables").doc(id).collection("players").add({
      name: this.state.name,
      stack: this.state.buyIn,
      host: false,
      dealer: true,
      smallBlind: false,
      bigBlind: false,
      inPot: 0,
      inBetRound: 0
    }).then(docRef => {
    localStorage.setItem("table", id)
    localStorage.setItem("player", docRef.id)
    })

  }


  render() {
    return (
      <div>
        {this.state.tables.map(doc => (
          <TableCard onChange={this.handleChange} onClick={() => this.chooseTable(doc.id)} name={doc.tableName} key={doc.id}/>
        ))}
      </div>
    )
  }
}

export default Join