import React, {Component} from 'react';
import classnames from 'classnames';

import scss from './Demo.scss';
import reset from '../../style/reset.scss';

import data from '../../json/data.json';

class Demo extends Component {
    render() {
        return (
            <div className={classnames(
                scss.Demo,
                reset.root
            )}>
                <img className={classnames(
                        scss.bg,
                        scss['bg-fix']
                    )} src={require(`../../images/bg.jpg`)}/>
                <img className={classnames(
                        scss.bg,
                        scss['bg-normal']
                    )} src={require(`../../images/bg.jpg`)}/>
            </div>
        );
    }
}

export default Demo;
