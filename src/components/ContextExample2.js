import React from 'react';
import {MyContext} from "../App";

function ContextExample2(props) {
    return (
        <div>
            This is a context Example 2
            <MyContext.Consumer>
                {
                    data => {
                        return <h2>{data}</h2>
                    }
                }
            </MyContext.Consumer>
        </div>
    );
}

export default ContextExample2;