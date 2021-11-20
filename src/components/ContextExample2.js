import React, {useContext} from 'react';
import {MyContext} from "../App";

function ContextExample2(props) {
    const data = useContext(MyContext)
    return (
        <div>
            <h2>This is a context Example 2</h2>
            {/*<MyContext.Consumer>*/}
            {/*    {*/}
            {/*        data => {*/}
            {/*            return <h2>{data}</h2>*/}
            {/*        }*/}
            {/*    }*/}
            {/*</MyContext.Consumer>*/}
            {data}
        </div>
    );
}

export default ContextExample2;