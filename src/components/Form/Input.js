import React from "react"

const Input = props => {
  <label>{props.label}
    <input className="input" type={props.type} onChange={props.onChange}/>
  </label>
}

export default Input