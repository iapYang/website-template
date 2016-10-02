let Vue = require('vue');

import PictureLoader from './plugin/pictureLoader';
import Platform from './plugin/platform';
import Slider from './plugin/slider';
import Util from './plugin/util';

// import App from '../component/App.vue';

// new Vue({
//     el: 'body',
//     components: {
//         App
//     }
// });


new Vue({
    el: '#dv',
    data: {
        msg: 'hhh'
    }
});


// function init() {
//     generateStruct();
//     registerEvents();
//
//     new PictureLoader().load({
//         done: (image, count, total) => {
//
//         },
//         end: () => {
//             console.log('==========2');
//         }
//     });
// }
//
// function generateStruct() {
//
// }
//
// function registerEvents() {
//
// }
//
// window.addEventListener('load', init, false);
