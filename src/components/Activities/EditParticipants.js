import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {getActivity, getUserById, getUserInfo, updateActivity} from "../../Functions";
import {Cookies} from "react-cookie";
import EditActivity from "./EditActivity";

function EditParticipants(props) {
    let location = new useLocation()
    const {activityId, participants} = location.state;
    const [partyObj, setPartyObj] = useState([])

    let cookies = new Cookies()


    useEffect( () => {
        async function fetchData() {
            if (cookies.get('myToken')) {
                participants.forEach(participantId => {
                    getUserById(cookies.get('myToken'), participantId).then(user => {
                        setPartyObj(partyObj.concat(user))
                    })
                })
            }
        }
        fetchData().catch(err => {alert("something went wrong "+ err)})

    }, [])

    return(
        <div>
            {partyObj.map(participant =>
                <div key={participant.id} >
                    {participant.id}
                    {participant.first_name}
                </div>
            )}
        </div>
    )

}
export default EditParticipants;
