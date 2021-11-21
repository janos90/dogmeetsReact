import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import React, {Component} from "react";
import Activities from "./components/Activities/Activities";
import Login from "./components/Login";
import {Cookies, CookiesProvider} from "react-cookie";
import {getUserInfo} from "./Functions";
import AddActivity from "./components/Activities/AddActivity";
import ActivityDetail from "./components/Activities/ActivityDetail";
import AddDog from "./components/Dogs/AddDog";
import Dogs from "./components/Dogs/Dogs";
import EditActivity from "./components/Activities/EditActivity";
import DeleteActivity from "./components/Activities/DeleteActivity";
import EditDog from "./components/Dogs/EditDog";
import DogDetail from "./components/Dogs/DogDetail";
import DeleteDog from "./components/Dogs/DeleteDog";
import Register from "./components/Users/Register";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            cookies: new Cookies()
        }
    }
    componentDidMount() {
        if (this.state.cookies.get("myToken")) {
            getUserInfo(this.state.cookies.get("myToken")).then((data) => {
                this.setState({
                    user: data
                })
            })
        }
    }

    logOut() {
        let cookies1 = new Cookies()
        cookies1.remove("myToken")
        window.location.reload(false);
    }

    render() {
        const auth = this.state.cookies.get("myToken")

        return (
            <CookiesProvider>

                <BrowserRouter>
                    <div className="App">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="/">Dog Meets</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        {(auth) ? (
                                            <li className="nav-item">
                                                <a className="nav-link active" aria-current="page" href="/addDog">Add Dog</a>
                                            </li>
                                        ): ''}

                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="/dogs">Dogs</a>
                                        </li>
                                        {(auth) ? (
                                            <li className="nav-item">
                                                <a className="nav-link active" aria-current="page" href="/addActivity">Add
                                                    Activity</a>
                                            </li>
                                        ): ''}

                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page"
                                               href="/activities">Activities</a>
                                        </li>
                                        {(auth) ? (

                                            <li className="nav-item">
                                                <a className="nav-link active" aria-current="page"
                                                   href="/activities">Profile</a>
                                            </li>
                                        ): ''}
                                        {(auth) ? (

                                            <li className="nav-item">
                                                <button className="btn btn-outline-secondary" onClick={this.logOut}>Logout</button>
                                            </li>
                                        ): ''}
                                        {(auth) ? '':(

                                            <li className="nav-item">
                                                <a className="nav-link" href='/register'>Register</a>
                                            </li>
                                        )}
                                        {(auth) ? '':(
                                            <li className="nav-item">
                                                <a className="nav-link" href='/login'>Login</a>
                                            </li>
                                        )}

                                    </ul>
                                    <form className="d-flex">
                                        <input className="form-control me-2" type="search" placeholder="Search"
                                               aria-label="Search"/>
                                        <button className="btn btn-outline-success" type="submit">Search</button>
                                    </form>
                                </div>
                            </div>
                        </nav>
                        <div className="container">


                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/register' component={Register}/>

                            <Route exact path='/dogs' component={Dogs}/>
                            <Route exact path='/addDog' component={AddDog}/>
                            <Route exact path='/editDog' component={EditDog}/>
                            <Route exact path='/dogDetail' component={DogDetail}/>
                            <Route exact path='/deleteDog' component={DeleteDog}/>


                            <Route exact path='/activities' component={Activities}/>
                            <Route exact path='/addActivity' component={AddActivity}/>
                            <Route exact path='/editActivity' component={EditActivity}/>
                            <Route exact path='/activityDetail' component={ActivityDetail}/>
                            <Route exact path='/deleteActivity' component={DeleteActivity}/>

                            {/*<Route exact path='/profile' component={Profile}/>*/}
                        </div>
                    </div>
                </BrowserRouter>
            </CookiesProvider>
        );
    }
}

export default App;
