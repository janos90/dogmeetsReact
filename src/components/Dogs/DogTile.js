import React from 'react';
import {Link} from "react-router-dom";
import {isMyDog} from "../../Functions";

function DogTile(props) {
    return (
            <div key={props.dog.id} className="col">
                <div key={props.dog.id} className="card shadow-sm">
                    <p><Link to={{pathname:"/dogDetail",
                        state: {dogID: props.dog.id}}}
                    >{props.dog.name}</Link>  -
                        {props.dog.owner}</p>
                    <img className={'bd-placeholder-img card-img-top'} src={props.dog.image}/>
                    <div className={'card-body'}>
                        <div className={'card-text'}>
                            <ul>
                                <li>Breed {props.dog.breed}</li>
                                <li>Height {props.dog.height}</li>
                                <li>Weight{props.dog.weight}</li>
                                <li>Birthday{props.dog.birthday}</li>
                                <li>Owned by ID:{props.dog.owner}</li>
                            </ul>
                        </div>
                        {isMyDog(props.dog.owner, props.user)? (
                            <div className={'d-flex justify-content-between align-items-center'}>
                                <div className={'btn-group'}>
                                    <button className={'btn btn-sm btn-outline-secondary'}>Edit</button>
                                    <button className={'btn btn-sm btn-outline-secondary'}>Delete</button>
                                </div>
                            </div>
                        ):null}
                    </div>

                    {/*<li><a className="dropdown-item" href="#" key={activity.id}>{activity.name}</a>*/}
                </div>
            </div>
    );
}

export default DogTile;