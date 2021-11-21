import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {Cookies} from "react-cookie";
import {deleteDog, getTheDog, getUserInfo} from "../../Functions";

function DeleteDog(props) {
    const location = new useLocation()
    const {dogId} = location.state;
    const [owner, setOwner] = useState(0)
    let cookies = new Cookies()

    useEffect( ()=>{
        if (cookies.get('myToken')) {
            getUserInfo(cookies.get("myToken")).then((data) => {
                setOwner(data.id)
            })

            getTheDog(dogId).then((data) => {
                if (data.owner === owner) {
                    deleteDog(cookies.get('myToken'), dogId).then(() => {
                        alert('deleted successfully')
                         window.location.href = "/";
                    });
                }
            })
        }
    })

    return (
        <div>
            <h1>Deleting...</h1>
        </div>
    );
}

export default DeleteDog;