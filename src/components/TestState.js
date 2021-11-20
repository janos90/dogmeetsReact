import {Component} from "react";

class TestState extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "Juan",
            lastname: "Garcia",
            email: "juan@jpgnco.com"
        }
    }
    clickMe(){
        if(this.state.firstname === "Juan"){
            this.setState({
            firstname: 'Lei',
                lastname: "peen"
        })
        } else {
            this.setState({
            firstname: 'Juan',
            lastname: "Garcia"

        })
        }

    }
    render() {
        return (
            <div>
                <h1>This name is from state:</h1>
                <h2>Firstname: {this.state.firstname}</h2>
                <h2>Lastname: {this.state.lastname}</h2>
                <button className='btn btn-primary' onClick={() => this.clickMe()}>change state</button>
            </div>
        );
    }
}

export default TestState