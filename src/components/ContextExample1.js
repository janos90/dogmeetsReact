import React from 'react';
import ContextExample2 from "./ContextExample2";


function ContextExample1(props) {
    return (
        <div>
            This is context 1
            <ContextExample2 />
        </div>
    );
}

export default ContextExample1;