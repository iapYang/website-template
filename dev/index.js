import React from 'react';
import Platform from './plugin/platform.js';

import Demo from './components/Demo';

// import {
//     PaidPostArticle,
//     BodyCopy,
// } from 'paidpost-core';

export default class extends React.Component {
    render() {
        return (
            <div>
                <Demo />
            </div>
        );
    }
}
