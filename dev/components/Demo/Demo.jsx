import React, {Component} from 'react';
import classnames from 'classnames';

import scss from './Demo.scss';
import reset from '../../style/reset.scss';

import data from '../../json/data.json';

class Demo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            needFix: false,
            reachEnd: false,
            pos: -1,
        };
    }

    componentDidMount() {
        const HEAD_HEIGHT = 118;

        const contents = this.contentList.children;
        const lastContent = contents[contents.length - 1];

        this.bgEnd.style.bottom = lastContent.getBoundingClientRect().height + 'px';

        function adjust() {
            const FLAG_IN_FIX = this.bgNormal.getBoundingClientRect().top <= HEAD_HEIGHT;
            const EDGE = this.bgFix.clientHeight + HEAD_HEIGHT;
            const FLAG_REACH_END = lastContent.getBoundingClientRect().top <= EDGE;

            this.setState({
                needFix: FLAG_IN_FIX,
            });

            this.setState({
                reachEnd: FLAG_REACH_END,
            });

            if (FLAG_IN_FIX) {
                let target = -1;

                for (let i = 0; i < contents.length; ++i) {
                    const RECT = contents[i].getBoundingClientRect();

                    if (RECT.top <= EDGE && RECT.bottom > EDGE) {
                        target = i;
                        break;
                    }

                    target = i;
                }

                this.setState({
                    pos: target,
                });
            }
        }

        window.addEventListener('scroll', adjust.bind(this));
    }

    render() {
        const contents = data.content.map((item, i) =>
            <div key={i} className={scss.content}>{item}</div>
        );

        return (
            <div className={classnames(
                scss.Demo,
                reset.root
            )}>
                <div className={classnames(
                    scss.bg,
                    scss['bg-fix'], {
                        [scss.pos0]: this.state.pos === 0,
                        [scss.pos1]: this.state.pos === 1,
                        [scss.pos2]: this.state.pos === 2,
                        [scss.pos3]: this.state.pos === 3,
                        [scss.hidden]: this.state.reachEnd,
                        [scss.active]: this.state.needFix,
                    }
                )} ref={el => {
                    this.bgFix = el;
                }}></div>

                <div className={classnames(
                    scss.bg,
                    scss.pos0,
                    scss['bg-normal'], {
                        [scss.pos0]: this.state.pos === 0,
                        [scss.pos1]: this.state.pos === 1,
                        [scss.pos2]: this.state.pos === 2,
                        [scss.pos3]: this.state.pos === 3,
                        [scss.hidden]: this.state.needFix,
                    }
                )} ref={el => {
                    this.bgNormal = el;
                }}></div>

                <div className={classnames(
                    scss.bg,
                    scss.pos0,
                    scss['bg-end'], {
                        [scss.pos0]: this.state.pos === 0,
                        [scss.pos1]: this.state.pos === 1,
                        [scss.pos2]: this.state.pos === 2,
                        [scss.pos3]: this.state.pos === 3,
                        [scss.active]: this.state.needFix && this.state.reachEnd,
                    }
                )} ref={el => {
                    this.bgEnd = el;
                }}></div>


                <div className={scss['content-list']}
                ref={el => {
                    this.contentList = el;
                }}>
                    {contents}
                </div>
            </div>
        );
    }
}

export default Demo;
