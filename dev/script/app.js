import PictureLoader from './plugin/pictureLoader';
import Platform from './plugin/platform';
import Slider from './plugin/slider';
import Util from './plugin/util';


PictureLoader.timeout = 1000 * 60;

function init() {
    generateStruct();
    registerEvents();

    new PictureLoader().load({
        done: (image, count, total) => {

        },
        end: () => {
            console.log('==========2');
        }
    });
}

function generateStruct() {

}

function registerEvents() {

}

window.addEventListener('load', init, false);
