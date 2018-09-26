import React from "react";
import Input from "../Form/Input"

const TableCard = props => (
  <div className="table-card">
    <p>{props.name}</p>
    <form onSubmit={props.onSubmit}>
    <Input name="name" placeholder="Name" onChange={props.onChange}/>
    <Input name="buyIn" placeholder="Buy In" onChange={props.onChange}/>
    <Input type="submit"/>
    </form>
  </div>  
)

export default TableCard