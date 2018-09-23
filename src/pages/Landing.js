import React from "react"
import UICard from "../components/cards/UICard"


// PAGE GOALS:
// 1. To direct users to either create or join a table
const Landing = props => (
<div className="landing">
  <a href="/create">Create</a>
  <br/>
  <a href="/join">Join</a>
</div>  
)

export default Landing