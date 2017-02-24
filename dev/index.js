import React from 'react';
import Platform from './plugin/platform.js';

// import {
//     PaidPostArticle,
//     BodyCopy,
// } from './paidpost-core';

import Demo from './components/Demo';

import scss from './index.scss';

export default class extends React.Component {
    render() {
        return (
            <div>
                <div style={{
                    height: 500,
                    backgroundColor: '#777DA7',
                    fontSize: 50,
                    textAlign: 'center',
                }}>prev-content</div>

                <Demo />

                <div style={{
                    height: 500,
                    backgroundColor: '#885053',
                    fontSize: 50,
                    textAlign: 'center',
                }}>next-content</div>
            </div>
        );
    }
}
