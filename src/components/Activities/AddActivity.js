import React, {useEffect, useState} from 'react';
import {Cookies} from "react-cookie";
import {getUserInfo, addActivity} from "../../Functions";

function AddActivity(props) {
    const [allowToAdd, setAllowToAdd] = useState(false)
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [startTime, setStartTime] = useState('')
    const [description, setDescription] = useState('')
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
       addActivity(cookies.get("myToken"), name, location, startTime, description, owner, lat, lng).catch(err => {
           alert("something went wrong "+ err)
       });
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
                <label htmlFor={"location"} className={"form-label"}>Location</label>
                <input type={"text"} className={"form-control"} id={"location"}
                       value={location} onChange={e => setLocation(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor={"startTime"} className={"form-label"}>Start Time</label>
                <input type={"datetime-local"} className={"form-control"} id={"startTime"}
                       value={startTime} onChange={e => setStartTime(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor={"description"} className={"form-label"}>description</label>
                <input type={"text"} className={"form-control"} id={"description"}
                       value={description} onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor={"lat"} className={"form-label"}>Lat</label>
                <input type={"text"} className={"form-control"} id={"lat"}
                       value={lat} onChange={e => setLat(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor={"lng"} className={"form-label"}>Lng</label>
                <input type={"text"} className={"form-control"} id={"lng"}
                       value={lng} onChange={e => setLng(e.target.value)}
                />
            </div>
        <button className={"btn btn-primary"} onClick={addActivityBtn}>Add</button>
        </div>
            ):(<div>You are not allowed to use this page</div>)
        }
        </div>
    );
}

export default AddActivity;