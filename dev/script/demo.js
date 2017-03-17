import 'babel-polyfill';

import '../style/demo.scss';

// import PictureLoader from './plugin/PictureLoader/old.js';
import Platform from './plugin/Platform';
import Slider from './plugin/Slider';
import Util from './plugin/Util';
import ArrivalListener from './plugin/ArrivalListener';
import Sensitive from './plugin/Sensitive';

import ttt from './plugin/PictureLoader';

// import IScroll from 'iscroll';

const body = document.body;
let slider;


function generateStruct() {
    window.slider = slider = new Slider({
        container: document.getElementById('slider'), // dom
        prevBtn: document.getElementById('btn-prev'), // dom
        nextBtn: document.getElementById('btn-next'), // dom
        indicator: document.getElementById('indicator'), // dom
        // loop: false,
        dragable: false,
        currentIndex: 0,
        speed: 800, // ms
        interactiveSpeed: 300, // ms
        interactiveDistance: 100, // px
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)', // string
        onChangeStart: (i, next) => {
            // console.log('==========', i, next);
        },
        onChangeEnd: (i, prev) => {
            console.log('==========', i, prev);
        },
    });

    Array.from(document.getElementsByClassName('scroll-wrapper')).forEach((el, i) => {
        // window.iscroll = new IScroll(el, {
        //
        // });
    });
}

function registerEvents() {
    body.addEventListener('touchmove', () => {
        event.preventDefault();
    });

    document.getElementById('btn-go').addEventListener('click', () => {
        const value = document.getElementById('page').value;

        slider.slideTo(value);
    }, false);

    document.getElementById('prepend-slide').addEventListener('click', () => {
        const dom = Util.parseDom('<li></li>');

        slider.prependSlide(dom);
    }, false);

    document.getElementById('append-slide').addEventListener('click', () => {
        const dom = Util.parseDom('<li></li>');

        slider.appendSlide(dom);
    }, false);

    document.getElementById('remove-slide').addEventListener('click', () => {
        const value = document.getElementById('page').value;

        slider.removeSlide(value);
    });

    Array.from(document.getElementById('slider').querySelectorAll('button')).forEach((el, i) => {
        el.addEventListener('click', e => {
            if (slider.updating) return;

            alert(i);
        });
    });
}

function init() {
    generateStruct();
    registerEvents();

    // new PictureLoader({
    //     className: 'preload',
    // }).load({
    //     done: (image, count, total) => {
    //         // console.log('==========', image, (count / total * 100) + '%');
    //
    //         if (Platform.isIE) {
    //             setTimeout(() => {
    //                 image.removeAttribute('width', '');
    //                 image.removeAttribute('height', '');
    //             }, 10);
    //         }
    //     },
    //     end: () => {
    //     },
    // });




    new ArrivalListener({
        el: document.getElementById('dv2'),
        offsetTopEnterBottom: 500,
        // offsetTopLeaveBottom: 100,
        offsetBottomReachTop: -100,
        onTopEnterBottom() {
            console.log('==========onTopEnterBottom1');
            this.classList.add('active');
        },
        onTopLeaveBottom() {
            console.log('==========onTopLeaveBottom1');
            this.classList.remove('active');
        },
        onBottomEnterTop() {
            console.log('==========onBottomEnterTop1');
        },
        onBottomLeaveTop() {
            console.log('==========onBottomLeaveTop1');
        },
    });

    // new ArrivalListener({
    //     el: document.getElementById('dv4'),
    //     onTopEnterBottom() {
    //         console.log('==========onTopEnterBottom2');
    //     },
    //     onTopLeaveBottom() {
    //         console.log('==========onTopLeaveBottom2');
    //     },
    //     onBottomEnterTop() {
    //         console.log('==========onBottomEnterTop2');
    //     },
    //     onBottomLeaveTop() {
    //         console.log('==========onBottomLeaveTop2');
    //     },
    // });
}


window.addEventListener('load', init, false);


window.addEventListener('resize', Util.throttle(() => {
    console.log('==========');
}, 200));

// window.addEventListener('resize', () => {
//     console.log('==========');
// });

// console.log('==========', Sensitive.check('aa ass'));


// const aaa = new ArrivalListener({
//     flagTopReachBottom: true,
// });
// console.log('==========', aaa);
