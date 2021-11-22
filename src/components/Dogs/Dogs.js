import React, {Component} from 'react';
import {getAllDogs, getUserInfo, isMyDog} from "../../Functions";
import {Cookies} from "react-cookie";
import {Link} from "react-router-dom";
import DogTile from "./DogTile";

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
                        <DogTile key={dog.id}  dog={dog} owner={dog.owner} user={this.state.user} />
                    )}
                </div>
            </div>
        );
    }
}

export default Dogs;