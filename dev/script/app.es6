var $ = require('jquery');
var TweenMax = require('gsap');

console.log('==========', TweenMax);

TweenMax.to('.container', 0.5, {
    x: 100
});
