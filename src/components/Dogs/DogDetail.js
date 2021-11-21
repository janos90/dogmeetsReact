import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {Cookies} from "react-cookie";
import {getTheDog, getUserById, getUserInfo} from "../../Functions";


function ActivityDetail(props) {
    const location = new useLocation()
    const {dogID} = location.state;
    const [name, setName] = useState('')
    const [breed, setBreed] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [birthday, setBirthday] = useState('')
    const [ownerId, setOwnerId] = useState('')
    const [owner, setOwner] = useState('')

    const [user, setUser] = useState(0)
    const [allowToEdit, setAllowToEdit] = useState(null)


    let cookies = new Cookies()

    useEffect( () => {
        async function fetchData() {
            if (cookies.get('myToken')) {
                await getUserInfo(cookies.get("myToken")).then((data) => {
                    setUser(data.id)
                })


                getTheDog(dogID).then((data) => {
                    if (data.owner !== user) {
                        setAllowToEdit(true)
                    } else {
                        setAllowToEdit(false)
                    }
                    setName(data.name)
                    setBreed(data.breed)
                    setHeight(data.height)
                    setWeight(data.weight)
                    setBirthday(data.birthday)
                    setOwnerId(data.owner)

                })

                await getUserById(cookies.get("myToken"), ownerId).then((data) => {
                    setOwner(data)
                })


            }
        }
        fetchData().catch(err => {alert("something went wrong "+ err)})

    }, [allowToEdit])

    return (
        <div>
            <h1>Dog Detail</h1>
            <h2>{name}</h2>
            <p>{breed}</p>
            <p>{height}</p>
            <p>{weight}</p>
            <p>{birthday}</p>
            <p>{owner.username}</p>
        </div>
    );
}

export default ActivityDetail;