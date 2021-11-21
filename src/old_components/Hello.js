import React from "react";

function Hello(props){
    function clickMe() {
        alert("Hello")
    }
    return(
        <div>
            <h1>Hello {props.name}</h1>
            <button onClick={clickMe}>My Button</button>
        </div>
    )
}

export default Hello