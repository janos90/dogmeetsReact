import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {Cookies} from "react-cookie";
import {getTheDog, getUserInfo} from "../../Functions";
import ProfileTile from "../Users/ProfileTile";


function ActivityDetail(props) {
    const location = new useLocation()
    const {dogID} = location.state;
    const {owner} = location.state;
    const [name, setName] = useState('')
    const [breed, setBreed] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [birthday, setBirthday] = useState('')
    const [imageURL, setImageURL] = useState('')

    const [user, setUser] = useState(0)
    const [allowToEdit, setAllowToEdit] = useState(null)


    let cookies = new Cookies()

    useEffect( () => {
        async function fetchData() {
            if (cookies.get('myToken')) {
                await getUserInfo(cookies.get("myToken")).then((data) => {
                    setUser(data.id)
                })
                await getTheDog(dogID).then((data) => {
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
                    setImageURL(data.imageURL)
                })
            }
        }
        fetchData().catch(err => {alert("something went wrong "+ err)})

    }, [allowToEdit])

    return (
        <div>
            <div className={'dog-details'}>
                <h1>Dog Detail</h1>
                <h2>{name} {owner.last_name}</h2>
                <p>
                                    <img className={'img img-thumbnail rounded mx-auto d-block profilePic'} src={imageURL} />

                </p>
                <p>{breed}</p>
                <p>{height} Cm</p>
                <p>{weight} Kg</p>
                <p>{birthday}</p>
                <p>{owner.username}</p>
            </div>
            <ProfileTile owner={owner.id} />
        </div>
    );
}

export default ActivityDetail;