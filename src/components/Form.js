import React, {Component} from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    usernameHandler = (event) => {
        this.setState({
            username:event.target.value
        })
    }
    passwordHandler = (event) => {
        this.setState({
            password:event.target.value
        })
    }

    componentDidMount() {
        this.setState({
            username: 'janos90'
        })
    }

    render() {
        return (
            <div className="container">
                <p>Username: <input value={this.state.username} onChange={this.usernameHandler} className="form-control" type="text" /></p>
                <p>Password: <input onChange={this.passwordHandler} className="form-control" type="password" /></p>
                <p><button className="btn btn-success">Login</button></p>
            </div>
        );
    }
}

export default Form;