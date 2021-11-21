import React, {useEffect, useState} from 'react';
import {userLogin} from "../Functions";
import {Cookies} from "react-cookie";
import {useHistory} from "react-router-dom";

function Login(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    let history = useHistory()
    let cookies = new Cookies()


    useEffect(()=>{
        if (cookies.get('myToken')){
             history.push('/')
        }
    }, [cookies.getAll()])


    const loginBtn =()=>{
       userLogin(username, password).catch(err => {
           setError("Login Failed: "+err)
       })
    }



    return (
        <div>
            <h1>Login</h1>
            <div className="mb-3">
                <label htmlFor={"username"} className={"form-label"}>Username</label>
                <input
                    type={"text"}
                    className={"form-control"}
                    id={"username"}
                    placeholder={"please enter your username"}
                    value={username}
                    onChange={e=>setUsername(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor={"password"} className={"form-label"}>Password</label>
                <input
                    type={"text"}
                    className={"form-control"}
                    id={"password"}
                    placeholder={"please enter your password"}
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor={"error"} className={"form-label"}>{error}</label>
            </div>


            <button className="btn btn-primary" onClick={loginBtn}>Login</button>
        </div>
    );
}

export default Login;