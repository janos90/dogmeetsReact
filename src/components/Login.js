import React, {useEffect, useState} from 'react';
import {userLogin} from "../Functions";
import {Cookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import dogLogo from '../static/dogLogo.jpg'

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
        <div className={'form-signin'}>
            <img className="mb-4" src={dogLogo} alt='Logo' width="72" height="57" />

            <h1 className={'h3 mb-3 fw-normal'}>Please Sign In</h1>
            <div className="mb-3">
                <label htmlFor={"username"} className={"form-label"}>Username</label>
                <input
                    type={"text"}
                    className={"form-control"}
                    id={"username"}
                    placeholder={"Username"}
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
                    placeholder={"Password"}
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor={"error"} className={"form-label"}>{error}</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" onClick={loginBtn}>Login</button>
            <p className="mt-5 mb-3 text-muted">Juan Garcia 7420</p>

        </div>
    );
}

export default Login;