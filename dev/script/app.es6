$ = require('jquery');
TweenMax = require('gsap');
Picture = require('./util/picture.js');
Platform = require('./util/platform.js');
Slider = require('./util/slider.js');


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
