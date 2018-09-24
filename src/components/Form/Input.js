import React from "react"

const Input = props => (
  <label>{props.label}
    <input onChange={props.onChange} id={props.id} name={props.name} className="input" type={props.type} onChange={props.onChange} step={props.step} min={props.min} max={props.max} value={props.value}/>
  </label>
)

export default Input