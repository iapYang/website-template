import PictureLoader from './component/pictureLoader';
import Platform from './component/platform';
import Slider from './component/slider';
import Util from './component/util';

import IScroll from 'iscroll';

const body = document.body;
let slider;

PictureLoader.timeout = 1000 * 60;

function init() {
    generateStruct();
    registerEvents();

    new PictureLoader({
        className: 'preload',
    }).load({
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
        // loop: false,
        dragable: true,
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

    Array.from(document.getElementsByClassName('scroll-wrapper')).forEach((el, i) => {
        window.iscroll = new IScroll(el, {

        });
    });
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
        el.addEventListener('click', (e) => {
            if(slider.updating) return;

            alert(i);
        });
    });
}




window.addEventListener('load', init, false);
