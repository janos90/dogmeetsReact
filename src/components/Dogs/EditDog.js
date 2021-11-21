import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {getActivity, getTheDog, getUserInfo, updateActivity, updateDog} from "../../Functions";
import {Cookies} from "react-cookie";

function EditDog(props) {
    let location = new useLocation()
    const {dogId} = location.state;

    const [name, setName] = useState('')
    const [breed, setBreed] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [birthday, setBirthday] = useState('')
    const [user, setUser] = useState(0)
    const [owner, setOwner] = useState(0)
        const [image, setImage] = useState(0)



    const [allowToEdit, setAllowToEdit] = useState(null)
    let cookies = new Cookies()

    useEffect( () => {
            async function fetchData() {
                if (cookies.get('myToken')) {
                    await getUserInfo(cookies.get("myToken")).then((data) => {
                        setUser(data.id)
                    })

                    getTheDog(dogId).then((data) => {
                        if (data.owner === user) {
                            setAllowToEdit(true)
                        } else {
                            setAllowToEdit(false)
                        }
                        setName(data.name)
                        setBreed(data.breed)
                        setHeight(data.height)
                        setWeight(data.weight)
                        setBirthday(data.birthday)
                        setImage(data.image)
                        setOwner(data.owner)

                    })

                }
            }
            fetchData().catch(err => {alert("something went wrong "+ err)})

        }, [allowToEdit])

        const updateDogBtn = () => {
            updateDog(cookies.get("myToken"), dogId, name, breed, height, birthday, image, weight, owner).catch(err => {
            alert("something went wrong " + err)
        });
    }

    return (
        <div>
            {
                allowToEdit ? (
                    <div>
                        <h1>Update Dog</h1>
                        <div className="mb-3">
                            <label htmlFor={"name"} className={"form-label"}>Name</label>
                            <input type={"text"} className={"form-control"} id={"name"}
                                   value={name} onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor={"breed"} className={"form-label"}>Breed</label>
                            <input type={"text"} className={"form-control"} id={"breed"}
                                   value={breed} onChange={e => setBreed(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={"height"} className={"form-label"}>Height (cm)</label>
                            <input type={"text"} className={"form-control"} id={"height"}
                                   value={height} onChange={e => setHeight(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={"weight"} className={"form-label"}>Weight (kg)</label>
                            <input type={"text"} className={"form-control"} id={"weight"}
                                   value={weight} onChange={e => setWeight(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={"birthday"} className={"form-label"}>Birthday</label>
                            <input type={"date"} className={"form-control"} id={"birthday"}
                                   value={birthday} onChange={e => setBirthday(e.target.value)}
                            />
                        </div>


                        <button className={"btn btn-primary"} onClick={updateDogBtn}>Save</button>
                    </div>

        </div>
    );
}

export default EditDog;