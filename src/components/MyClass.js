import {Component} from "react";

class MyClass extends Component{
    clickMe() {
        alert("clicked 2")
    }
    render() {
        return (
            <div className='container'>
                <h1>This is a class component made by {this.props.firstname}</h1>
                <button onClick={this.clickMe} >a button</button>
            </div>
        )
    }
}

export default MyClass