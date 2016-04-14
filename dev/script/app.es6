import PictureLoader from './util/pictureLoader.js';
import Platform from './util/platform.js';
import Slider from './util/slider.js';
import Util from './util/util.js';

PictureLoader.timeout = 1000 * 60;

const body = document.body;

let loaderClass = new PictureLoader({
    className: 'preload',
});
let loaderQueue = new PictureLoader({
    sourceQueue: [
        'image/1.jpg',
        'image/2.jpg',
        'image/3.jpg',
        'image/4.jpg',
        'image/5.jpg',
    ],
});
let slider;


function init() {
    generateStruct();
    registerEvents();

    loaderQueue.load();

    loaderClass.load({
        done: (image, count, total) => {
            // console.log('==========', image, (count / total * 100) + '%');

            if (Platform.isIE) {
                setTimeout(() => {
                    image.removeAttribute('width', '');
                    image.removeAttribute('height', '');
                }, 10);
            }
        },
        end: () => {
            console.log('==========end1');
        }
    });
}

function generateStruct() {
    window.slider = slider = new Slider({
        container: document.getElementById('slider'), //dom
        prevBtn: document.getElementById('btn-prev'), //dom
        nextBtn: document.getElementById('btn-next'), //dom
        indicator: document.getElementById('indicator'), //dom
        currentIndex: 0,
        speed: 800, //ms
        interactiveSpeed: 300, //ms
        interactiveDistance: 100, //px
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)', //string
        onChangeStart: (i, next) => {
            // console.log('==========', i, next);
        },
        onChangeEnd: (i, prev) => {
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

    document.getElementById('btn-go').addEventListener('click', () => {
        var value = document.getElementById('page').value;

        slider.slideTo(value);
    }, false);

    Array.from(document.getElementById('slider').querySelectorAll('button')).forEach((el, i) => {
        el.addEventListener('click', () => {
            alert(i);
        })
    });
}




window.addEventListener('load', init, false);
