var $ = require('jquery');
var TweenMax = require('gsap');

TweenMax.to('.container', 0.5, {
    x: 100,
    y: 200,
    scale: 2
});
