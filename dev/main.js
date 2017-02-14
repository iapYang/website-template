import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import Index from './index.js';
import './style/_reset.scss';

ReactDOM.render(
    <div style={{
        maxWidth: 1605,
        margin: '0 auto',
        boxShadow: '-1px 0 4px 0 #e2e2e2',
        borderRight: '1px solid #e2e2e2',
        borderLeft: '1px solid #e2e2e2',
    }}>
        <Index />
    </div>,
    document.getElementById('app')
);
