import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {Cookies} from "react-cookie";
import {attendEvent, disAttendEvent, getActivity, getUserInfo} from "../../Functions";
import MapContainer from "../Extra/GoogleMap";
import AddToCalendar from "@culturehq/add-to-calendar";
import AddToMyCalender from "../Extra/AddToMyCalender";


function ActivityDetail(props) {
    const location = new useLocation()
    const {activityID} = location.state;
    const [name, setName] = useState('')
    const [activityLocation, setActivityLocation] = useState('')
    const [activityLat, setActivityLat] = useState('')
    const [activityLng, setActivityLng] = useState('')

    const [startTime, setStartTime] = useState("2018-12-06T17:00:00-05:00")
    const [endTime, setEndTime] = useState('2018-12-06T18:00:00-05:00')

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
                    setActivityLat(data.lat)
                    setActivityLng(data.lng)
                    setStartTime(new Date(data.startTime).toISOString())

                    setDescription(data.description)
                    setParticipants(data.participants)

                    if (participants.indexOf(user) !== -1) {
                        setAttending(true)
                    }


                })

            }
        }
        fetchData().catch(err => {alert("something went wrong "+ err)})

    }, [allowToEdit])

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
            <p>{attending ? ('You are Attending this event'):("You are Not Attending this event")}</p>
            <AddToMyCalender

                name={name}
                details={description}
                location={activityLocation}
                startsAt={startTime}
                endsAt='2018-12-06T18:00:00-05:00'
            />
            {attending ? (<button onClick={disAttendBtn}>un Attend</button>):(<button onClick={attendBtn}>Attend</button>)}
            <br />
            <div className="align-content-lg-center">
                <header>
                    <h3>Location</h3>
                </header>
                <MapContainer lat={activityLat} lng={activityLng} />

            </div>
        </div>
    );
}

export default ActivityDetail;