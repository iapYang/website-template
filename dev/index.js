import React from 'react';
import Platform from './plugin/platform.js';

import {
    PaidPostArticle,
    BodyCopy,
} from './paidpost-core';

import Demo from './components/Demo';

import scss from './style/main.scss';

export default class extends React.Component {
    render() {
        return (
            <PaidPostArticle className={scss.PaidPostArticle}>
                <Demo />
            </PaidPostArticle>
        );
    }
}
