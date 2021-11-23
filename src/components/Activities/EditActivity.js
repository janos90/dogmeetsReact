import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {getActivity, getUserInfo, updateActivity} from "../../Functions";
import {Cookies} from "react-cookie";
import GoogleMapAndLocation from "../Extra/GoogleMapAndLocation";

function EditActivity(props) {
    let location = new useLocation()
    const {activityId} = location.state;
    const [name, setName] = useState('')
    const [activityLocation, setActivityLocation] = useState('')
    const [startTime, setStartTime] = useState('')
    const [description, setDescription] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [user, setUser] = useState(0)
    const [allowToEdit, setAllowToEdit] = useState(null)
    const [participants, setParticipants] = useState([])
    const [lat, setLat] = useState([])
    const [lng, setLng] = useState([])

    let cookies = new Cookies()

    useEffect( () => {
        async function fetchData() {
            if (cookies.get('myToken')) {
                await getUserInfo(cookies.get("myToken")).then((data) => {
                    setUser(data.id)
                })

                getActivity(activityId).then((data) => {
                    if (data.owner === user) {
                        setAllowToEdit(true)
                    } else {
                        setAllowToEdit(false)
                    }
                    setName(data.name)
                    setActivityLocation(data.location)
                    setStartTime(data.startTime)
                    setDescription(data.description)
                    setParticipants(data.participants)
                    setLng(data.lng)
                    setLat(data.lat)
                    setImageURL(data.imageURL)

                })

            }
        }
        fetchData().catch(err => {alert("something went wrong "+ err)})

    }, [allowToEdit])

    const updateActivityBtn = () => {
        updateActivity(cookies.get("myToken"), activityId, name, activityLocation, startTime, description, imageURL, lat, lng).catch(err => {
            alert("something went wrong " + err)
        });
    }

        const setMyLocation = (location) => {
        console.log("working!", location)
        setActivityLocation(location)
    }
        const setMyLatLng = (latLng) => {
        console.log("working!", latLng)
        setLat((latLng.lat).toFixed(5))
        setLng((latLng.lng).toFixed(5))

    }



    return (
        <div>
            {
                allowToEdit ? (
                    <div>
                        <h1>Update Activity</h1>
                        <div className="mb-3">
                            <label htmlFor={"name"} className={"form-label"}>Name</label>
                            <input type={"text"} className={"form-control"} id={"name"}
                                   value={name} onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={"activityLocation"} className={"form-label"}>Location</label>
                            <input type={"text"} className={"form-control"} id={"activityLocation"}
                                   value={activityLocation} onChange={e => setActivityLocation(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={"startTime"} className={"form-label"}>Start Time and Date</label>
                            <input type={"datetime-local"} className={"form-control"} id={"startTime"}
                                   value={startTime} onChange={e => setStartTime(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">

                            <label htmlFor={"imageURL"} className={"form-label"}>Image URL</label>
                            <input type={"text"} className={"form-control"} id={"imageURL"}
                                   value={imageURL} onChange={e => setImageURL(e.target.value)}
                            />
                        </div>

                        <GoogleMapAndLocation setMyLocation={setMyLocation} setMyLatLng={setMyLatLng} />


                        <Link to={{
                            pathname:"/editParticipants",
                            state: {activityId: activityId, participants: participants}
                        }}
                              className={"btn btn-secondary"}>
                            Edit participants
                        </Link>
                        <button className={"btn btn-primary"} onClick={updateActivityBtn}>Save</button>
                    </div>
                ) : (<div>You are not allowed to use this page</div>)
            }
        </div>
    );
}

export default EditActivity;