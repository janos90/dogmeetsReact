import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {getActivity, getUserInfo, updateActivity} from "../../Functions";
import {Cookies} from "react-cookie";

function EditActivity(props) {
    let location = new useLocation()
    const {activityId} = location.state;
    const [name, setName] = useState('')
    const [activityLocation, setActivityLocation] = useState('')
    const [startTime, setStartTime] = useState('')
    const [description, setDescription] = useState('')
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

                })

            }
        }
        fetchData().catch(err => {alert("something went wrong "+ err)})

    }, [allowToEdit])

    const updateActivityBtn = () => {
        updateActivity(cookies.get("myToken"), activityId, name, activityLocation, startTime, description, user, lat, lng).catch(err => {
            alert("something went wrong " + err)
        });
    }


    return (
        <div>
            {
                allowToEdit ? (
                    <div>
                        <h1>Update Post</h1>
                        <div className="mb-3">
                            <label htmlFor={"name"} className={"form-label"}>Name</label>
                            <input type={"text"} className={"form-control"} id={"name"}
                                   value={name} onChange={e => setName(e.target.value)}
                            />
                        </div>
                        {/*<label htmlFor={"header_image"} className={"form-label"}>Header Image</label>*/}
                        {/*<img src={header_image} width={"50px"}/>*/}
                        {/*<div className="mb-3">*/}
                        {/*    <ImageUploading*/}
                        {/*        multiple*/}
                        {/*        value={[header_image]}*/}
                        {/*        onChange={onChange}*/}
                        {/*        maxNumber={maxNumber}*/}
                        {/*        dataURLKey="data_url"*/}
                        {/*    >*/}
                        {/*        {({*/}
                        {/*              imageList,*/}
                        {/*              onImageUpload,*/}
                        {/*              onImageRemoveAll,*/}
                        {/*              onImageUpdate,*/}
                        {/*              onImageRemove,*/}
                        {/*              isDragging,*/}
                        {/*              dragProps,*/}
                        {/*          }) => (*/}
                        {/*            // write your building UI*/}
                        {/*            <div className="upload__image-wrapper">*/}
                        {/*                <button*/}
                        {/*                    style={isDragging ? {color: 'red'} : undefined}*/}
                        {/*                    onClick={onImageUpload}*/}
                        {/*                    {...dragProps}*/}
                        {/*                >*/}
                        {/*                    Click or Drop here*/}
                        {/*                </button>*/}
                        {/*                &nbsp;*/}
                        {/*                <button onClick={onImageRemoveAll}>Remove all images</button>*/}
                        {/*                {imageList.map((image, index) => (*/}
                        {/*                    <div key={index} className="image-item">*/}
                        {/*                        /!*<img src={image['data_url']} alt="" width="100"/>*!/*/}
                        {/*                        <div className="image-item__btn-wrapper">*/}
                        {/*                            <button onClick={() => onImageUpdate(index)}>Update</button>*/}
                        {/*                            <button onClick={() => onImageRemove(index)}>Remove</button>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                ))}*/}
                        {/*            </div>*/}
                        {/*        )}*/}
                        {/*    </ImageUploading>*/}
                        {/*</div>*/}
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
                            <label htmlFor={"description"} className={"form-label"}>Description</label>
                            <input type={"text"} className={"form-control"} id={"description"}
                                   value={description} onChange={e => setDescription(e.target.value)}
                            />


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


                            <Link to={{
                                pathname:"/editParticipants",
                                state: {activityId: activityId, participants: participants}
                            }}
                                  className={"btn btn-secondary"}>
                                Edit participants
                            </Link>
                            <button className={"btn btn-primary"} onClick={updateActivityBtn}>Save</button>
                        </div>
                    </div>
                ) : (<div>You are not allowed to use this page</div>)
            }
        </div>
    );
}

export default EditActivity;