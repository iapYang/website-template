import PictureLoader from './component/pictureLoader';
import Platform from './component/platform';
import Slider from './component/slider';
import Util from './component/util';


PictureLoader.timeout = 1000 * 60;

function init() {
    generateStruct();
    registerEvents();

    new PictureLoader().load({
        done: (image, count, total) => {

        },
        end: () => {
            console.log('==========');
        }
    });
}

function generateStruct() {

}

function registerEvents() {

}

window.addEventListener('load', init, false);
