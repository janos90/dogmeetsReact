import React, {Component} from 'react';
import {getAllDogs, getUserInfo, isMyDog} from "../../Functions";
import {Cookies} from "react-cookie";
import {Link} from "react-router-dom";

class Dogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dogs: [],
            user: {},
            cookies: new Cookies()
        }
    }

    componentDidMount() {
        getAllDogs().then((data) => {
           this.setState({
                dogs: data
            })
        })
        if (this.state.cookies.get("myToken")) {
            getUserInfo(this.state.cookies.get("myToken")).then((data) => {
                this.setState({
                    user: data
                })
            })
        }
    }

    render() {
        return (
            <div className={'container'}>
                <header>
                    <h1>View Dogs</h1>
                </header>
                <div className={'row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'}>

                    {this.state.dogs.map(dog =>
                        <div key={dog.id} className="col">
                            <div key={dog.id} className="card shadow-sm">
                                <p><Link to={{pathname:"/dogDetail",
                                    state: {dogID: dog.id}}}
                                >{dog.name}</Link>  -
                                    {dog.owner}</p>
                                <img className={'bd-placeholder-img card-img-top'} src={dog.image}/>
                                <div className={'card-body'}>
                                    <div className={'card-text'}>
                                        <ul>
                                            <li>Breed {dog.breed}</li>
                                            <li>Height {dog.height}</li>
                                            <li>Weight{dog.weight}</li>
                                            <li>Birthday{dog.birthday}</li>
                                            <li>Owned by ID:{dog.owner}</li>
                                        </ul>
                                    </div>
                                    {isMyDog(dog.owner, this.state.user)? (
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
                    )}
                </div>
            </div>
        );
    }
}

export default Dogs;