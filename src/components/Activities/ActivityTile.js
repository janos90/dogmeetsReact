import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {getDistance, getUserById, isMyActivity, isMyDog} from "../../Functions";
import {Cookies} from "react-cookie";

function ActivityTile(props) {
    const [owner, setOwner] = useState('')

    let cookies = new Cookies()
    useEffect( () => {
        async function fetchData() {
            getUserById(cookies.get("myToken"), props.owner).then((data) => {
                setOwner(data)
            })
        }
        if(!owner) {
            fetchData().catch(err => {
                alert("something went wrong " + err)
            })
        }
    })

    return (
        <div className="card shadow-sm">

            <h3>
                <Link to={{pathname:"/activityDetail", state: {activityID: props.activity.id}}} >
                    {props.activity.name}
                </Link>
            </h3>
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>Location</td>
                        <td>{props.activity.location}</td>
                    </tr>
                    <tr>
                        <td>Time</td>
                        <td>{props.activity.startTime}</td>
                    </tr>
                    <tr>
                        <td>Dogs</td>
                        <td>{props.activity.dog? props.activity.dog.length : 0}</td>
                    </tr>
                    <tr>
                        <td>Participants</td>
                        <td>{props.activity.participants? props.activity.participants.length : 0}</td>
                    </tr>
                    <tr>
                        <td>Hosted by:</td>
                        <td>{owner.first_name} {owner.last_name}</td>
                    </tr>
                    <tr>
                        <td>distance:</td>
                        <td>{Math.floor(getDistance(props.activity.lat, props.userLat, props.activity.lng, props.userLng))} KM</td>
                    </tr>
                    </tbody>
                </table>
                {
                    isMyActivity(props.activity.owner, props.user)? (
                        <div className={'d-flex justify-content-between align-items-center'}>
                            <div className={'btn-group'}>
                                <Link to={{
                                    pathname:"/editActivity",
                                    state: {activityId: props.activity.id}
                                }}
                                      className={"btn btn-secondary"}
                                >
                                    Edit
                                </Link>


                                <Link to=
                                          {{pathname:"/deleteActivity",
                                              state: {activityId: props.activity.id}
                                          }}
                                      className={"btn btn-danger"}
                                >
                                    Delete
                                </Link>
                            </div>
                        </div>
                    ) : ("")
                }
            </div>

        </div>
    );
}

export default ActivityTile;