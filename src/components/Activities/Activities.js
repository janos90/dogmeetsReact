import React, {Fragment, Component} from 'react';
import {getAllActivities, getDistance, getUserInfo, isMyActivity} from "../../Functions";
import {Cookies} from "react-cookie";
import {Link} from "react-router-dom";
import ActivityTile from "./ActivityTile";

class Activities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            sortedActivities: [],
            user: {},
            cookies: new Cookies(),
            sortOrder: 'distance',
        }
    }

    componentDidMount() {
        getAllActivities().then((data) => {
            this.setState({activities: data})
            if ("geolocation" in navigator) {
                let success = position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    this.setState(
                        {
                            userLat: latitude,
                            userLng: longitude
                        },
                        () => console.log(latitude, longitude)
                    );
                };
                function error() {
                    console.log("Unable to retrieve your location");
                }


                navigator.geolocation.getCurrentPosition(success, error);

            } else {
                this.setState({sortOrder: 'name'})
            }

        })
        if (this.state.cookies.get("myToken")) {
            getUserInfo(this.state.cookies.get("myToken")).then((data) => {
                this.setState({
                    user: data
                })
            })
        }
    }

    sort() {
    let sorted = [].concat(this.state.activities)

     switch(this.state.sortOrder) {
                case 'name':
                    sorted.sort((a, b) => {
                        return a.name.localeCompare(b.name);
                    })
                    break;
                case 'distance':
                    if(this.state.userLat) {
                        sorted.sort((a, b) => {
                            let aDistance = getDistance(a.lat, this.state.userLat, a.lng, this.state.userLng)
                            let bDistance = getDistance(b.lat, this.state.userLat, b.lng, this.state.userLng)

                            return aDistance > bDistance ? 1 : -1;
                        })
                    } else {
                        this.setState({sortOrder: 'name'})
                    }
                    break;
            }
            this.setState({activities: sorted})

    }



    sortByName() {
        this.setState({sortOrder: 'name'})
this.sort()
    }
    sortByDistance() {
        this.setState({sortOrder: 'distance'})
this.sort()
    }


    render() {
        return (
            <Fragment>
                <header>
                    <h1>Activities</h1>
                    <h3>Click for more info</h3>
                    Sort By:
                    <button onClick={() => this.sortByName()} className={'btn btn-secondary'}>name</button>
                    <button onClick={() => this.sortByDistance()} className={'btn btn-secondary'}>distance</button>
                </header>
                <br/>
                <div className={'row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'}>
                    {this.state.activities.map(activity =>
                        <div key={activity.id} className="col">
                            <ActivityTile
                                activity={activity}
                                user={this.state.user}
                                owner={activity.owner}
                                userLat={this.state.userLat}
                                userLng={this.state.userLng}

                            />
                        </div>
                    )}
                </div>
            </Fragment>
        );
    }
}

export default Activities;