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
        const lis = this.state.items.map((item, i) => {
            const liClass = classNames({
                active: this.state.activeIndex === i,
            });

            return (
                <li key={i}
                    className={liClass}
                    onClick={this.clickHandler.bind(this, i)}>
                    {item}
                </li>
            );
        });

        return (
            <div className='navigation'>
                <ul>
                    {lis}
                </ul>

                <h2 className='choice'>
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
                    type='text'
                    value={this.state.text}
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.handleBlur.bind(this)}/>
                <span
                    className='notice'
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
                    <span className='name'>{item.name}</span>
                    <span className='price'>${item.price}</span>
                </li>
            );
        });

        let totalPrice = 0;
        this.state.items.forEach(item => {
            if (item.active) {
                totalPrice += item.price;
            }
        });

        return (
            <div className='cart'>
                <ul className='list'>
                    {lis}
                </ul>
                <div className='total'>
                    <span className='text'>total:</span>
                    <span className='price'>${totalPrice}</span>
                </div>
            </div>
        );
    }
}

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterText: '',
            items: [
                {
                    title: 'What You Need To Know About CSS Variables',
                    poster: 'image/1.jpg',
                },
                {
                    title: 'Freebie: 4 Great Looking Pricing Tables',
                    poster: 'image/2.png',
                },
                {
                    title: '20 Interesting JavaScript and CSS Libraries for February 2016',
                    poster: 'image/3.png',
                },
                {
                    title: 'Quick Tip: The Easiest Way To Make Responsive Headers',
                    poster: 'image/4.jpg',
                },
                {
                    title: 'Learn SQL In 20 Minutes',
                    poster: 'image/5.jpg',
                },
                {
                    title: 'Creating Your First Desktop App With HTML, JS and Electron',
                    poster: 'image/6.png',
                },
            ],
        };
    }
    handleChange(e) {
        this.setState({
            filterText: e.target.value,
        });
    }
    render () {
        const lis = this.state.items.filter(item =>
            item.title.includes(this.state.filterText.toLowerCase())
        ).map((item, i) =>
            <li
                key={i.toString()}>
                <img src={item.poster} alt />
                <h6>{item.title}</h6>
            </li>
        );

        return (
            <div className='search'>
                <input type='text' onChange={this.handleChange.bind(this)}/>
                <ul>
                    {lis}
                </ul>
            </div>
        );
    }
}

ReactDOM.render(
    <Navigation />,
    document.getElementById('app')
);
