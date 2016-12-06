import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import classNames from 'classnames';
import update from 'immutability-helper';

import '../style/index.scss';

class Navigation extends React.Component {
    constructor() {
        super();

        this.state = {
            items: [
                'home',
                'projects',
                'services',
                'concat',
            ],
            activeIndex: 0,
        };
    }
    clickHandler(i) {
        this.setState({
            activeIndex: i,
        });
    }
    render() {
        return (
            <div className="navigation">
                <ul>
                    {this.state.items.map((item, i) =>
                        <li key={i}
                            className={this.state.activeIndex === i ? 'active' : ''}
                            onClick={this.clickHandler.bind(this, i)}>{item}</li>
                    )}
                </ul>

                <h2 className="choice">
                    You chose&nbsp;
                    <span>
                         {this.state.items[this.state.activeIndex]}
                    </span>
                </h2>
            </div>
        );
    }
}

class Editor extends React.Component {
    constructor() {
        super();

        this.state = {
            text: 'editor me',
            hideInput: true,
        };
    }
    handleClick() {
        this.setState({
            hideInput: !this.state.hideInput,
        });
    }
    handleChange(event) {
        this.setState({
            text: event.target.value,
        });
    }
    handleBlur() {
        this.setState({
            hideInput: true,
        });
    }
    render () {
        const inputClass = classNames({
            input: true,
            hidden: this.state.hideInput,
        });

        return (
            <div className='editor'>
                <input
                    className={inputClass}
                    type="text"
                    value={this.state.text}
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.handleBlur.bind(this)}/>
                <span
                    className="notice"
                    onClick={this.handleClick.bind(this)}>{this.state.text}</span>
            </div>
        );
    }
}

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                {
                    name: 'Web Development',
                    price: 300,
                    active: true,
                },
                {
                    name: 'Design',
                    price: 400,
                    active: false,
                },
                {
                    name: 'Integration',
                    price: 250,
                    active: false,
                },
                {
                    name: 'Training',
                    price: 220,
                    active: false,
                },
            ],
        };
    }

    handleClick(item, i) {
        const newState = update(this.state, {
            items: {
                [i]: {
                    active: {
                        $set: !item.active,
                    },
                },
            },
        });

        this.setState(newState);
    }

    render () {
        const lis = this.state.items.map((item, i) => {
            const itemClass = classNames({
                active: item.active,
            });

            return (
                <li
                    key={i}
                    className={itemClass}
                    onClick={this.handleClick.bind(this, item, i)}>
                    <span className="name">{item.name}</span>
                    <span className="price">{item.price}</span>
                </li>
            );
        });

        let totalPrice = 0;
        this.state.items.forEach(item => {
            if (item.active) {
                totalPrice += item.price;
            }

            return null;
        });

        return (
            <div className="cart">
                <ul className="list">
                    {lis}
                </ul>
                <div className="total">
                    <span className="text">total:</span>
                    <span className="price">{totalPrice}</span>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Cart />,
    document.getElementById('app'));
