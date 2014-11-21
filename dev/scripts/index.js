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
        'bootstrap': 'vendors/bootstrap/dist/js/bootstrap.min',
        'parallax': 'vendors/parallax/deploy/jquery.parallax.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'parallax': {
            deps: ['jquery']
        }
    },
    packages: [
        { name: 'greensock', main: '', location: 'vendors/greensock/src/uncompressed' },
        { name: 'joshua', main: '', location: 'vendors/joshua.js/dev' }
    ]
});




require(['jquery',
        'joshua/ui/Rain',
        'greensock/TweenMax',
        'parallax',
        'domReady!'], 
    function($, Rain){

    new Rain($('.falldown'), {
        source: ['images/yellow.png', 'images/blue.png', 'images/pink.png'],
        count: 15,
        minSpeed: 6,
        maxSpeed: 10,
        minDelay: 2,
        maxDelay: 10
    });

    $('#scene').parallax();
});

