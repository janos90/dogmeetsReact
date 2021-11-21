import React, {useEffect, useReducer} from 'react';
import axios from "axios";


const initialState = {
    loading: true,
    posts: {},
    error: ''
}
const reducer = (state, action) => {
    switch(action.type) {
        case 'SUCCESS':
            return {
                loading: false,
                posts: action.payload,
                error: ''
            }

        case 'ERROR':
            return {
                loading: false,
                posts: [],
                error: 'Error in data fetching'
            }
    }
}
function UseReducer(stat) {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                dispatch({type: 'SUCCESS', payload: response.data})
            })
            .catch(err => {
                dispatch({type: 'ERROR'})
            })
    })
    return (
        <div>
            {state.loading ? 'loading' : state.posts.map(post => {
                return <h3 key={post.id}>{post.title}</h3>
            })}
            {state.error?state.error:null}
        </div>
    );
}

export default UseReducer;