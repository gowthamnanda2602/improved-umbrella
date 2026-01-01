import React from "react";
import "./OveralRating.css";

const OveralRating = (props) => {
    return (
        <div className="overalrating">
        <h3>Overall Rating</h3>
        <div>
            <div>*     {props.count[0]}</div>
            <div>**    {props.count[1]}</div>
            <div>***   {props.count[2]}</div>
            <div>****  {props.count[3]}</div>
            <div>***** {props.count[4]}</div>
        </div>
        </div>
    );
}

export default OveralRating;