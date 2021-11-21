import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {Cookies} from "react-cookie";
import {attendEvent, disAttendEvent, getActivity, getUserInfo} from "../../Functions";


function ActivityDetail(props) {
    const location = new useLocation()
    const {activityID} = location.state;
    const [name, setName] = useState('')
    const [activityLocation, setActivityLocation] = useState('')
    const [startTime, setStartTime] = useState('')
    const [description, setDescription] = useState('')
    const [user, setUser] = useState(0)
    const [allowToEdit, setAllowToEdit] = useState(null)
    const [attending, setAttending] = useState(false)
    const [participants, setParticipants] = useState([])


    let cookies = new Cookies()

    useEffect( () => {
        async function fetchData() {
            if (cookies.get('myToken')) {
                await getUserInfo(cookies.get("myToken")).then((data) => {
                    setUser(data.id)
                })

                getActivity(activityID).then((data) => {
                    if (data.owner !== user) {
                        setAllowToEdit(true)
                    } else {
                        setAllowToEdit(false)
                    }
                    setName(data.name)
                    setActivityLocation(data.location)
                    setStartTime(data.startTime)
                    setDescription(data.description)
                    setParticipants(data.participants)

                    if (participants.indexOf(user) !== -1) {
                        setAttending(true)
                    }
                })

            }
        }
        fetchData().catch(err => {alert("something went wrong "+ err)})

    }, [activityID, allowToEdit, participants, user])
    const attendBtn = () => {
        alert("You are now attending")
        attendEvent(cookies.get("myToken"), user, activityID).catch(err => {alert('something went wrong: ' + err)})
    }

    const disAttendBtn = () => {
        disAttendEvent(cookies.get("myToken"), user, activityID).catch(err => {alert('something went wrong: ' + err)})
    }
    return (
        <div>
            <h1>Activity Detail</h1>
            <h2>{name}</h2>
            <p>{activityLocation}</p>
            <p>{startTime}</p>
            <p>{description}</p>
            <p>{participants.length}</p>
            {attending ? (<button onClick={disAttendBtn}>un Attend</button>):(<button onClick={attendBtn}>Attend</button>)}
        </div>
    );
}

export default ActivityDetail;