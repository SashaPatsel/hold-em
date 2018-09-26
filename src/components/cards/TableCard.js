import React from "react";
import Input from "../Form/Input"
import Button from "../Button"

const TableCard = props => (
  <div className="table-card">
    <p>{props.name}</p>

    <Input name="name" placeholder="Name" onChange={props.onChange}/>
    <Input name="buyIn" placeholder="Buy In" onChange={props.onChange}/>
    <Button text="join" click={props.onClick}/>

  </div>  
)

export default TableCard