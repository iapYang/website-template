import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import Index from './index.js';
import './style/reset.scss';

ReactDOM.render(
    <article id="story"
        style={{
            maxWidth: 414,
            margin: '0 auto',
            boxShadow: '-1px 0 4px 0 #e2e2e2',
            borderRight: '1px solid #e2e2e2',
            borderLeft: '1px solid #e2e2e2',
        }}>

        <div className="header"
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                right: 0,
                zIndex: 99999,
                maxWidth: 414,
                height: 118,
                backgroundColor: 'gray',
                margin: '0 auto',
                boxShadow: '-1px 0 4px 0 #e2e2e2',
                borderRight: '1px solid #e2e2e2',
                borderLeft: '1px solid #e2e2e2',
                fontSize: 30,
            }}>header</div>

        <div className="wrapper"
            style={{
                marginTop: 118,
            }}>

            <Index />

            <div className="footer"
                style={{
                    height: 118,
                    backgroundColor: 'gray',
                    fontSize: 30,
                }}>footer</div>
        </div>
    </article>,
    document.getElementById('app')
);
