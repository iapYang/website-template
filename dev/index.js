import React from 'react';
import Platform from './plugin/platform.js';

// import {
//     PaidPostArticle,
//     BodyCopy,
// } from 'paidpost-core';

import Demo from './components/Demo';

import scss from './style/main.scss';

export default class extends React.Component {
    render() {
        return (
            <div className={scss.PaidPostArticle}>
                <Demo />
            </div>
        );
    }
}
