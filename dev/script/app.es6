var $ = require('jquery');
var TweenMax = require('gsap');
var Picture = require('./util/picture.js');

Picture.preload({
    load: function(count, total){
        console.log('==========', (count / total * 100) + '%');
    },
    end: function(){
        console.log('==========end');
    }
});
