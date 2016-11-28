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
        const lis = this.state.items.map((item, i) => {
            const className = this.state.activeIndex === i ? 'active' : '';

            return <li key={i}
                className={className}
                onClick={() => this.clickHandler(i)}>{item}</li>;
        });


        return (
            <div className="navigation">
                <ul>
                    {lis}
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
