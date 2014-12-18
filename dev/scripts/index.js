window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

require.config({
    baseUrl: './',
    waitSeconds: 0,
    paths: {
        'jquery': 'vendors/jquery/dist/jquery',
        'domReady': 'vendors/requirejs-domready/domReady',
        'modernizr': 'vendors/modernizr/modernizr',
        'bootstrap': 'vendors/bootstrap/dist/js/bootstrap.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        }
    },
    packages: [
        { name: 'greensock', main: '', location: 'vendors/greensock/src/uncompressed' },
        { name: 'joshua', main: '', location: 'vendors/joshua.js/dev' }
    ]
});




require(['jquery',
        'joshua/ui/Picture',
        'greensock/TweenMax',
        'domReady!'], 
    function($, Picture){

    Picture.preload({
        onLoad: function(loadCount, totalCount){},
        onComplete: function(){}
    });
});

