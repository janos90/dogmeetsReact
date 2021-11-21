import React, {useEffect, useState} from 'react';
import {getProfile, getProfileByUser, getTheDog, getUserInfo, updateProfile} from "../../Functions";
import {Cookies} from "react-cookie";

function EditProfile(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState('')



    let cookies = new Cookies()
    useEffect( () => {
            async function fetchData() {
                let token = cookies.get("myToken")
                if (token) {
                    await getUserInfo(token).then((data) => {
                        setUser(data)
                    })
                    console.log(user)
                    getProfile(token, user.profile).then((profile) => {
                        setFirstName(user.first_name)
                        setLastName(user.last_name)
                        setEmail(user.email)
                        setPhone(profile.phone)
                        setBio(profile.bio)
                        setUsername(user.username)
                        setPassword(user.password)
                    })

                }
            }
            fetchData().catch(err => {alert("something went wrong "+ err)})

        }, [user.id])

    const saveProfileBtn = ()=>{
        getUserInfo(cookies.get("myToken")).then((data) => {
            setUser(data)
        })
        updateProfile(cookies.get("myToken"), user.id, user.profile, firstName, lastName, email, phone, bio, username, password).catch(err => {
            alert('Something went wrong '+err)
        })
    }
    return (
        <div></div>
    );
}

export default EditProfile;