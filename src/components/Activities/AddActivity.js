import React, {useEffect, useState} from 'react';
import {Cookies} from "react-cookie";
import {getUserInfo, addActivity} from "../../Functions";
import GoogleMapAndLocation from "../Extra/GoogleMapAndLocation";

function AddActivity(props) {
    const [allowToAdd, setAllowToAdd] = useState(false)
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [startTime, setStartTime] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')

    const [owner, setOwner] = useState('')

    let cookies = new Cookies()

    useEffect(() => {
        async function fetchData() {
            if (cookies.get('myToken')) {
                getUserInfo(cookies.get("myToken")).then((data) => {
                    setOwner(data.id)
                    setAllowToAdd(true)
                })
            }
        }
        fetchData()


    }, [allowToAdd])

    const addActivityBtn =()=>{
       addActivity(cookies.get("myToken"), name, location, startTime, description, image, owner, lat, lng).catch(err => {
           alert("something went wrong "+ err)
       });
    }

    const setMyLocation = (location) => {
        console.log("working!", location)
        setLocation(location)
    }
        const setMyLatLng = (latLng) => {
        console.log("working!", latLng)
        setLat((latLng.lat).toFixed(5))
        setLng((latLng.lng).toFixed(5))


    }





    return (
        <div>
        {
            allowToAdd ? (
                <div>
            <h1>Add Activity</h1>
            <div className="mb-3">
                <label htmlFor={"title"} className={"form-label"}>Name</label>
                <input type={"text"} className={"form-control"} id={"name"}
                       value={name} onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor={"startTime"} className={"form-label"}>Start Time</label>
                <input type={"datetime-local"} className={"form-control"} id={"startTime"}
                       value={startTime} onChange={e => setStartTime(e.target.value)}
                />
            </div>
                    <div className="mb-3">
                <label htmlFor={"image"} className={"form-label"}>Image URL</label>
                <input type={"text"} className={"form-control"} id={"image"}
                       value={image} onChange={e => setImage(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor={"description"} className={"form-label"}>description</label>
                <input type={"text"} className={"form-control"} id={"description"}
                       value={description} onChange={e => setDescription(e.target.value)}
                />
            </div>
            <GoogleMapAndLocation setMyLocation={setMyLocation} setMyLatLng={setMyLatLng} />
        <button className={"btn btn-primary"} onClick={addActivityBtn}>Add</button>
        </div>
            ):(<div>You are not allowed to use this page</div>)
        }
        </div>
    );
}

export default AddActivity;