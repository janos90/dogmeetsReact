import React, {Component} from 'react';

class Maps extends Component {
    myElements(names) {
        return names.map(name =>
        <li key={name}>
            {`${name}`}
        </li>
            )
    }
    render() {
        return (
            <div>
                <ul>
                    {this.myElements(this.props.names)}
                </ul>
            </div>
        );
    }
}

export default Maps;