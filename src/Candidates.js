import React from "react";
import "./Candidates.css";

const candidates = (props) => {

  const deleteHandler=()=>{
    props.onDelete(props);
  }

  const editHandler=()=>{
    props.onEdit(props);
  }

  return(
    <li className="candidates">{props.name} 
    <button type="button" onClick={deleteHandler}>Delete</button>
    <button type="button" onClick={editHandler}>Edit</button>
    </li>
  )
}

export default candidates;