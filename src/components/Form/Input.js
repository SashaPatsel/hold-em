import React from "react"

const Input = props => (
  <label>{props.label}
    <input id={props.id} className="input" type={props.type} onChange={props.onChange} step={props.step} min={0}/>
  </label>
)

export default Input