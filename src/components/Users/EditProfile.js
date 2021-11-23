import React, {useEffect, useRef, useState} from 'react';
import {getProfile, getUserInfo, updateProfile} from "../../Functions";
import {Cookies} from "react-cookie";
import JoditEditor from "jodit-react";

function EditProfile(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')
    const [imageURL, setImageURL] = useState('')

    const [username, setUsername] = useState('')
    const [user, setUser] = useState('')



    let cookies = new Cookies()
    useEffect( () => {
            async function fetchData() {
                let token = cookies.get("myToken")
                if (token) {
                    await getUserInfo(token).then((data) => {
                        setUser(data)
                        getProfile(token, data.profile).then((profile) => {
                            setFirstName(data.first_name)
                            setLastName(data.last_name)
                            setImageURL(profile.imageURL)
                            setEmail(data.email)
                            setPhone(profile.phone)
                            setBio(profile.bio)
                            setUsername(data.username)
                        })

                    }).catch(err => {
                        console.log(err)
                    })

                }
            }
            fetchData().catch(err => {alert("something went wrong "+ err)})

        }, [user.id])

    const saveProfileBtn = ()=>{
        getUserInfo(cookies.get("myToken")).then((data) => {
            setUser(data)
        })
        updateProfile(cookies.get("myToken"), user.id, user.profile, firstName, lastName, imageURL, email, phone, bio, username).catch(err => {
            alert('Something went wrong '+err)
        })
    }

    const editor = useRef(null)
	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}

    return (
        <div>
            <h1>Update Profile for {firstName} {lastName}</h1>
            <label htmlFor={"firstName"} className={"form-label"}>First Name</label>
            <input
                type={"text"}
                className={"form-control"}
                id={"firstName"}
                placeholder={"First Name"}
                value={firstName}
                onChange={e=>setFirstName(e.target.value)}
            />

            <label htmlFor={"lastName"} className={"form-label"}>Last Name</label>
            <input
                type={"text"}
                className={"form-control"}
                id={"lastName"}
                placeholder={"Last Name"}
                value={lastName}
                onChange={e=>setLastName(e.target.value)}
            />
                        <label htmlFor={"imageURL"} className={"form-label"}>Image URL</label>
            <input
                type={"text"}
                className={"form-control"}
                id={"imageURL"}
                placeholder={"Image URL"}
                value={imageURL}
                onChange={e=>setImageURL(e.target.value)}
            />

            <p>Preview
                                        <img className={'img img-thumbnail rounded mx-auto d-block profilePic'} src={imageURL} />

            </p>

            <label htmlFor={"email"} className={"form-label"}>Email</label>
            <input
                type={"email"}
                className={"form-control"}
                id={"email"}
                placeholder={"Email"}
                value={email}
                onChange={e=>setEmail(e.target.value)}
            />
            <label htmlFor={"phone"} className={"form-label"}>Phone</label>
            <input
                type={'tel'}
                className={"form-control"}
                id={"phone"}
                placeholder={"Phone"}
                value={phone}
                onChange={e=>setPhone(e.target.value)}
            />
            <label htmlFor={"bio"} className={"form-label"}>Bio</label>
            <JoditEditor
            	ref={editor}
                value={bio}
                config={config}
		        tabIndex={1} // tabIndex of textarea
		        onBlur={newContent => setBio(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {}}
            />

            <label htmlFor={"username"} className={"form-label"}>Username</label>
            <input
                type={"text"}
                className={"form-control"}
                id={"username"}
                placeholder={"Username"}
                value={username}
                onChange={e=>setUsername(e.target.value)}
            />
            <button className={'btn btn-primary'} onClick={saveProfileBtn}>Save</button>
        </div>
    );
}

export default EditProfile;