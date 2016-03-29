import Picture from './util/picture.js';
import Platform from './util/platform.js';
import Slider from './util/slider.js';
import Util from './util/util.js';

const body = document.body;
let slider;


function init() {
    generateStruct();
    registerEvents();

    new Picture({
        className: 'preload',
        done: function(image, count, total) {
            console.log('==========', image, (count / total * 100) + '%');

            if (Platform.isIE) {
                setTimeout(() => {
                    image.removeAttribute('width', '');
                    image.removeAttribute('height', '');
                }, 10);
            }
        },
        end: function() {
            // console.log('==========end');
        }
    }).load();
}

function generateStruct() {
    slider = new Slider({
        container: document.getElementsByClassName('slider')[0], //dom
        prevBtn: document.getElementsByClassName('btn-prev')[0], //dom
        nextBtn: document.getElementsByClassName('btn-next')[0], //dom
        currentIndex: 0,
        speed: 800, //ms
        interactiveSpeed: 300, //ms
        interactiveDistance: 200, //px
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)', //string
        onChangeStart: function(i, next) {
            console.log('==========', i, next);
        },
        onChangeEnd: function(i, prev) {
            console.log('==========', i, prev);
        }
    });

    // slider.currentIndex
    //slider.slidePrev(t)
    //slider.slideNext(t)
    //slider.slideTo(i, t)
}

function registerEvents() {
    body.addEventListener('touchmove', () => {
        event.preventDefault();
    });

    document.getElementsByClassName('btn-go')[0].addEventListener('click', () => {
        var value = document.getElementById('page').value;

        slider.slideTo(value);
    }, false);
}




window.addEventListener('load', init, false);
