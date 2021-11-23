import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {getUserById, isMyDog} from "../../Functions";
import {Cookies} from "react-cookie";

function DogTile(props) {
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
        <div className="col">
            <div className="card shadow-sm">
                <h4>
                    <Link to={{pathname:"/dogDetail", state: {dogID: props.dog.id, owner: owner}}} >
                        {props.dog.name} {owner.last_name}
                    </Link>
                </h4>
                <img className={'img img-thumbnail rounded mx-auto d-block profilePic'} src={props.dog.imageURL} />
                <div className={'card-body'}>
                    <div className={'card-text'}>
                        <ul>
                            <li>Breed {props.dog.breed}</li>
                            <li>Height {props.dog.height}</li>
                            <li>Weight{props.dog.weight}</li>
                            <li>Birthday{props.dog.birthday}</li>
                            <li>Owned by :{owner.username}</li>
                        </ul>
                    </div>
                    {isMyDog(props.dog.owner, props.user)? (
                        <div className={'d-flex justify-content-between align-items-center'}>
                            <div className={'btn-group'}>
                                <Link to={{
                                    pathname:"/editDog",
                                    state: {dogId: props.dog.id}
                                }}
                                      className={"btn btn-secondary"}
                                >
                                    Edit
                                </Link>


                                <Link to=
                                          {{pathname:"/deleteDog",
                                              state: {dogId: props.dog.id}
                                          }}
                                      className={"btn btn-danger"}
                                >
                                    Delete
                                </Link>
                            </div>
                        </div>
                    ):null}
                </div>
            </div>
        </div>
    );
}

export default DogTile;