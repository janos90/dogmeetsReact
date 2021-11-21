import {registerUser} from "../../Functions";
import React, {useRef, useState} from 'react';
import JoditEditor from "jodit-react";

function Register(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const registerBtn =()=>{
        registerUser(firstName, lastName, email, phone, bio, username, password).catch(err => {
            alert('Something went wrong '+err)
        })
    }

    const editor = useRef(null)
	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}

    return (
        <div>
            <h1>Register for Dog Meets</h1>

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

            <label htmlFor={"password"} className={"form-label"}>Password</label>
            <input
                type={"password"}
                className={"form-control"}
                id={"password"}
                placeholder={"Password"}
                value={password}
                onChange={e=>setPassword(e.target.value)}
            />
        <button className={'btn btn-success'} onClick={registerBtn}>Register</button>
        </div>
    );
}

export default Register;