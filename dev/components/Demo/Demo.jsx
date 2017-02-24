import React, {Component} from 'react';
import classnames from 'classnames';

import scss from './Demo.scss';
import reset from '../../style/reset.scss';

import data from '../../json/data.json';

class Demo extends Component {
    render() {
        const contentList = data.content.map((item, i) =>
            <div className={scss.content} key={i}>{item}</div>
        );
        const contentWrap = <div className={scss['content-list']}>{contentList}</div>;

        return (
            <div className={classnames(
                scss.Demo,
                reset.root
            )}>
                <div className={classnames(
                    scss.bg,
                    scss['bg-fix']
                )}></div>

                <div className={classnames(
                    scss.bg,
                    scss['bg-normal']
                )}></div>

                {contentWrap}
            </div>
        );
    }
}

export default Demo;
