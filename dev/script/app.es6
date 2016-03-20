window.Picture = require('./util/picture.js');
window.Platform = require('./util/platform.js');
window.Slider = require('./util/slider.js');
window.Util = require('./util/util.js');

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
    currentIndex: 0,
    speed: 500,//ms
    prevBtn: document.getElementsByClassName('btn-prev')[0],//dom
    nextBtn: document.getElementsByClassName('btn-next')[0]//dom
});


document.getElementsByClassName('btn-go')[0].addEventListener('click', () => {
    var value = document.getElementById('page').value;

    slider.slideTo(value);
}, false);
