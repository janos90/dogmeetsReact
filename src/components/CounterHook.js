import React, {useEffect, useState} from 'react';

function CounterHook(props) {
    const [count, setCount] = useState(0)
    const [text, setText] = useState(0)

    useEffect(() => console.log("use effect hook here"), [count])

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={()=>setCount(count+1)} className="btn btn-warning" >count</button>

            <h2>{text}</h2>
            <button onClick={()=>setText("Text has been changed")} className="btn btn-primary" >Change text</button>

        </div>
    );
}

export default CounterHook;