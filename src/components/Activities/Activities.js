import React, {Fragment, Component} from 'react';
import {getAllActivities, getUserInfo, isMyActivity} from "../../Functions";
import {Cookies} from "react-cookie";
import {Link} from "react-router-dom";

class Activities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            user: {},
            cookies: new Cookies()
        }
    }

    componentDidMount() {
        getAllActivities().then((data) => {
            this.setState({
                activities: data
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
            <Fragment>
                <header>
                    <h1>Activities</h1>
                    <h3>Click for more info</h3>
                </header>
            <br/>
            <div className={'row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'}>
                {this.state.activities.map(activity =>
                    <div key={activity.id} className="col">
                                            <div className="card shadow-sm">

                        <p><Link to={{pathname:"/activityDetail",
                                    state: {activityID: activity.id}}}
                                >{activity.name}</Link>  -
                            {activity.owner} - {activity.startTime}</p>
                        <div>
                            <table>
                                <tbody>
                                <tr>
                                    <td>Location</td>
                                    <td>{activity.location}</td>
                                </tr>
                                <tr>
                                    <td>Time</td>
                                    <td>{activity.startTime}</td>
                                </tr>
                                <tr>
                                    <td>Dogs</td>
                                    <td>{activity.dog}</td>
                                </tr>
                                <tr>
                                    <td>Participants</td>
                                    <td>{activity.participants}</td>
                                </tr>
                                <tr>
                                    <td>Hosted by:</td>
                                    <td>{activity.owner}</td>
                                </tr>
                                </tbody>
                            </table>
                            {
                            isMyActivity(activity.owner, this.state.user)? (
                                <div className={'d-flex justify-content-between align-items-center'}>
                                    <div className={'btn-group'}>
                                            <Link to={{
                                                pathname:"/editActivity",
                                                state: {activityId: activity.id}
                                            }}
                                            className={"btn btn-secondary"}
                                            >
                                                Edit
                                            </Link>


                                            <Link to=
                                                {{pathname:"/deleteActivity",
                                                state: {activityId: activity.id}
                                            }}
                                            className={"btn btn-danger"}
                                            >
                                                Delete
                                            </Link>
                                    </div>
                                </div>
                            ) : ("")
                            }
                        </div>
                    {/*<li><a className="dropdown-item" href="#" key={activity.id}>{activity.name}</a>*/}
                    </div>
                    </div>
                )}
            </div>
                </Fragment>
        );
    }
}

export default Activities;