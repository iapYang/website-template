import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import classNames from 'classnames';

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


ReactDOM.render(
    <Editor />,
    document.getElementById('app'));
