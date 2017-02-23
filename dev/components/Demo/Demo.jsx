import React, {Component} from 'react';
import classnames from 'classnames';

import scss from './Demo.scss';
import reset from '../../style/reset.scss';

import data from '../../json/data.json';

// import {
//     BodyCopy,
// } from '../../paidpost-core';

// function require(str) {
//     return str;
// }

class Demo extends Component {
    render() {
        return (
            <div className={classnames(
                scss.Demo,
                reset.root
            )}>
                <h1>hello</h1>
                <img src={require(`../../${data.cover}`)} />
            </div>
        );
    }
}

export default Demo;
