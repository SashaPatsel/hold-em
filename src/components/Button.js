import React, {Component} from "react"

const Button = props => (
  <div>
    <button onClick={props.click}>{props.text}</button>
  </div>  
)

export default Button