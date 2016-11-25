import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';


class Clock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
        }

        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        this.timmer = setInterval(() => {
            this.tick();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timmer);
    }

    tick() {
        this.setState({
            date: new Date(),
        });
    }

    clickHandler() {
        console.log(this);
    }

    render() {
        return (
            <div>
                <button onClick={this.clickHandler}>click</button>
                <h1 className={this.props.className}>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}


class UserGreeting extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1>Welcome back!</h1>
        );
    }
}

class GuestGreeting extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1>Please sign up.</h1>
        );
    }
}

class Greeting extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: props.isLoggedIn,
        };
    }

    render() {
        if (this.state.isLoggedIn) {
            return <UserGreeting />
        }

        return <GuestGreeting />
    }
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

class BoilingVerdict extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(this.props.celsius >= 100){
            return <p>The water would boil.</p>
        }

        return <p>The water would not boil.</p>
    }
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit',
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        const value = this.state.value;
        const scale = this.props.scale;

        return (
            <filedset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input
                    value={this.state.value}
                    onChange={this.handleChange} />
            </filedset>
        );
    }
}

class Calculator extends React.Component {
    render() {
        return (
            <div>
                <TemperatureInput scale="c" />
                <TemperatureInput scale="f" />
            </div>
        )
    }
}

class FancyBorder extends React.Component {
    render() {
        return (
            <div className={'FancyBorder FancyBorder-' + this.props.color}>
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(
    <div>
        <Greeting isLoggedIn={true} />
        <Clock className="tttaaaaa" />
        <ul>
            {[1, 2, 3, 4, 5].map((number) =>
                <li key={number.toString()}>
                    {number}
                </li>
            )}
        </ul>
        <Calculator />

        <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
    </div>,
    document.getElementById('app')
);