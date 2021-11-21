import React, {useEffect, useState} from 'react';
import {getTheDog, getUserInfo, updateProfile} from "../../Functions";
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
                if (cookies.get('myToken')) {
                    await getUserInfo(cookies.get("myToken")).then((data) => {
                        setUser(data)
                    })

                    getProfileByUser(user.id).then((data) => {
                        setFirstName(user.first_name)
                        setLastName(user.last_name)
                        setEmail(user.email)
                        setPhone(data.phone)
                        setBio(data.bio)
                        setUsername(user.username)
                        setPassword(user.password)
                    })

                }
            }
            fetchData().catch(err => {alert("something went wrong "+ err)})

        }, [user.id])

    const saveProfileBtn = ()=>{
        getUserInfo(cookies.get("myToken")).then((data) => {
            setUserId(data.id)
        })
        updateProfile(cookies.get("myToken"), userId, profileId, firstName, lastName, email, phone, bio, username, password).catch(err => {
            alert('Something went wrong '+err)
        })
    }
    return (
        <div></div>
    );
}

export default EditProfile;