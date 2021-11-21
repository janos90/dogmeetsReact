import React, {Component} from 'react';

class LoadApiData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data=>{
                this.setState({posts:data})
            })
    }

    render() {
        return (
            <div>
                {this.state.posts.map(post=>
                    <div>
                        <header>
                            <h1 key={post.id}>{post.title}</h1>
                        </header>
                    </div>
                )}
            </div>
        );
    }
}

export default LoadApiData;