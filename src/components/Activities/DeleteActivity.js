import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {Cookies} from "react-cookie";
import { useHistory } from "react-router-dom";
import {deleteActivity, getActivity, getUserInfo} from "../../Functions";

function DeletePost(props) {
    const location = new useLocation()
    const {activityId} = location.state;
    const [owner, setOwner] = useState(0)
    let cookies = new Cookies()

    useEffect( ()=>{
        console.log("check 1")

        if (cookies.get('myToken')) {
            getUserInfo(cookies.get("myToken")).then((data) => {
                setOwner(data.id)
                console.log("check 2")
                console.log(activityId)
            })

            getActivity(activityId).then((data) => {
                if (data.owner == owner) {
                    console.log("deleting")
                    deleteActivity(cookies.get('myToken'), activityId).then(() => {
                        alert('deleted successfully')
                         window.location.href = "/";
                    });
                }
            })
        }
    })

    return (
        <div><h1>is anyone here?</h1>
            <button>Confirm</button>
            <button>Cancel</button>
        </div>
    );
}

export default DeletePost;