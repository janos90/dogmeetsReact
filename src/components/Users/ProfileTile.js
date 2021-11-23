import React, {useEffect, useState} from 'react';
import {Cookies} from "react-cookie";
import {getProfile, getUserById} from "../../Functions";

function ProfileTile(props) {

    const [owner, setOwner] = useState('')
    const [profile, setProfile] = useState('')

    let cookies = new Cookies()
    useEffect( () => {
        async function fetchData() {
            if(!profile) {
                getUserById(cookies.get("myToken"), props.owner).then((user => {
                                        setOwner(user)

                        getProfile(cookies.get("myToken"), user.profile).then((data) => {

                        setProfile(data)
                    })
                }))

            }
        }
        if(!owner) {
            fetchData().catch(err => {
                alert("something went wrong " + err)
            })
        }
    })

    return (
            <div className={'owner-details'}>
                <img className={'img img-thumbnail rounded mx-auto d-block profilePic'} src={profile.imageURL} />
                <h1>Owner Detail</h1>
                <h2>{owner.first_name} {owner.last_name}</h2>
                <p dangerouslySetInnerHTML={{__html: profile.bio}}></p>
                <p>{profile.phone}</p>
            </div>
    );
}

export default ProfileTile;