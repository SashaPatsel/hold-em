import React from "react"

const CardFront = props => (
  <div className="card-front" style={{"color": props.color}}>
    <p className="card-front__number">{props.number}</p>
  </div>  
)

export default CardFront