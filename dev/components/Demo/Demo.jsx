import React, {Component} from 'react';
import classnames from 'classnames';

import scss from './Demo.scss';

class Demo extends Component {
    render() {
        return (
            <div className={classnames(
                scss.Demo
            )}>
                <h1>hello</h1>
            </div>
        );
    }
}

export default Demo;
