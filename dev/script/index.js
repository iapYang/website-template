import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';


class Clock extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            date: new Date(),
        }
    }

    componentDidMount(){
        this.timmer = setInterval(() => {
            this.tick();
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.timmer);
    }

    tick(){
        this.setState({
            date: new Date(),
        });
    }

    render(){
        return (
            <div>
                <h1 className={this.props.className}>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock className="tttaaaaa" />,
    document.getElementById('app')
);