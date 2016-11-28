import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

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
                    You chose
                    <span>
                         {this.state.items[this.state.activeIndex]}
                    </span>
                </h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Navigation></Navigation>, document.getElementById('app'));
