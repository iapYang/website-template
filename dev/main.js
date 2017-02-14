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
        <div style={{
            position: 'fixed',
            maxWidth: 1605,
            height: 118,
            backgroundColor: 'gray',
            left: 0,
            top: 0,
            right: 0,
            margin: '0 auto',
            boxShadow: '-1px 0 4px 0 #e2e2e2',
            borderRight: '1px solid #e2e2e2',
            borderLeft: '1px solid #e2e2e2',
            fontSize: 30,
        }}>header</div>

        <div style={{
            marginTop: 118,
        }}>
            <Index />

            <div style={{
                height: 118,
                backgroundColor: 'gray',
                fontSize: 30,
            }}>footer</div>
        </div>
    </div>,
    document.getElementById('app')
);
