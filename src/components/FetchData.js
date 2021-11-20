import React, {useEffect, useState} from 'react';
import axios from "axios";

function FetchData(props) {
    const [post, setPost] = useState([])
    const [id, setID] = useState(1)


    useEffect(()=> {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                setPost(response.data)
            }).catch(err => console.log(err))
    })
    return (
        <div>
            {/*{posts.map(post=>{*/}
            {/*    return <h3 key={post.id}>{post.title}</h3>*/}
            {/*})}*/}
            <input type="text" value={id} onChange={e=>setID(e.target.value)} />
            <h3>{post.title}</h3>
        </div>
    );
}

export default FetchData;