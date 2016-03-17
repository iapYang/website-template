window.$ = require('jquery');
window.TweenMax = require('gsap');
window.Picture = require('./util/picture.js');
window.Platform = require('./util/platform.js');
window.Slider = require('./util/slider.js');


Picture.preload({
    load: function(count, total){
        // console.log('==========', (count / total * 100) + '%');
    },
    end: function(){
        // console.log('==========end');
    }
});


var slider = new Slider({
    container: document.getElementsByClassName('slider')[0],//dom
});
console.log(slider);



// let [a, b, c] = [1, 2, 3];
//
// console.log(a, b, c);
