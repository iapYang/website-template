import React, {Component} from 'react';
import classnames from 'classnames';

import scss from './Demo.scss';

import data from '../../json/data.json';

class Demo extends Component {
    render() {
        return (
            <div className={classnames(
                scss.Demo
            )}>
                <h1>hello</h1>
                <img src={`../../${data.cover}`} />
            </div>
        );
    }
}

export default Demo;
