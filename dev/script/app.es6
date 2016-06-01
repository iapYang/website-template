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
        loop: false,
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




// function moveEndToTop(arr){
//     var length = arr.length;
//     var t = arr[length - 1];
//
//     for(var i = length - 1; i > 0; --i){
//         arr[i] = arr[i - 1];
//     }
//
//     arr[0] = t;
// }
//
// function order(arr, n){
//     for(var i = 0; i < n; ++i){
//         moveEndToTop(arr);
//     }
// }
//
// var a = [1,2,3,4,5,6,7,8,9];
// order(a, 2);
// console.log(a);


window.addEventListener('load', init, false);
