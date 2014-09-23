// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
(function (con) {
    'use strict';
    var prop, method;
    var empty = {};
    var dummy = function () { };
    var properties = 'memory'.split(',');
    var methods = ('assert,count,debug,dir,dirxml,error,exception,group,' +
        'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' +
        'time,timeEnd,trace,warn').split(',');
    while (prop = properties.pop()) con[prop] = con[prop] || empty;
    while (method = methods.pop()) con[method] = con[method] || dummy;
})(window.console = window.console || {});

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();




require.config({
    baseUrl: metaData.baseUrl ? metaData.baseUrl : './',
    waitSeconds: 0,
    paths: {
        "jquery": "vendors/jquery/dist/jquery", // export: $
        'domReady': 'vendors/requirejs-domready/domReady',
        'modernizr': 'vendors/modernizr/modernizr',
        'backbone': 'vendors/backbone/backbone',
        'underscore': 'vendors/underscore/underscore',
        'backbone.localstorage': 'vendors/Backbone.localStorage/backbone.localStorage',
        'bootstrap': 'vendors/bootstrap/dist/js/bootstrap.min',
        'chartjs': 'vendors/chartjs/Chart.min', // export: null
        'onepage-scroll': 'vendors/onepage-scroll/jquery.onepage-scroll.min' // export: null, need css
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'onepage-scroll': {
            deps: ['jquery']
        }
    },
    packages: [
        { name: 'greensock', main: '', location: 'vendors/greensock/src/uncompressed' },
        { name: 'joshua', main: '', location: 'vendors/joshua.js/dev' }
    ]
});

require(['scripts/pages/index.js', 'domReady!'], function (index) {
    
});


