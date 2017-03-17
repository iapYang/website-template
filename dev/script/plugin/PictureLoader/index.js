import Picture from './Picture.js';

const ua = window.navigator.userAgent.toLowerCase();
const isMobile = ua.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i) !== null && ua.match(/Mobile/i) !== null;
const isiPad = ua.match(/ipad/i) !== null;
const isAndroid = ua.match(/android/i) !== null;
const isAndroidPad = isAndroid && !isMobile;
const isTablet = isiPad || isAndroidPad;
const isIE = /(msie|trident)/i.test(navigator.userAgent);
const isDesktop = !(isMobile || isTablet);

class Component {
    static dataName = 'data-source';
    static flagBg = 'data-bg';
    static timeout = 1000 * 60;
    static useStorage = isDesktop && !isIE;

    className = 'preload';
    loadOne = function() {};
    loadAll = function() {};

    loadCount = 0;
    pictureList = [];

    constructor(options) {
        for(const key in options) {
            this[key] = options[key];
        }

        if(this.sourceQueue === undefined) {
            for(const container of [...document.getElementsByClassName(this.className)]) {
                const src = container.getAttribute(Component.dataName);
                const useBg = container.getAttribute(Component.flagBg) !== null;

                const picture = new Picture({
                    src,
                    timeout: Component.timeout,
                    container,
                    useBg,
                });

                this.pictureList.push(picture);
            }
        } else {
            for(const src of this.sourceQueue) {
                const picture = new Picture({
                    src,
                    timeout: Component.timeout,
                });

                this.pictureList.push(picture);
            }
        }

        this.totalCount = this.pictureList.length;
    }

    load() {
        if(this.totalCount === 0) {
            this.loadAllHandler();
            return;
        }

        for(const picture of this.pictureList) {
            picture.load()
            .then((image) => {
                // success

                this.loadOneHandler();

                if(Component.useStorage) {
                    picture.save();
                }

                picture.setContent();

            }, (image) => {
                // fail

                this.loadOneHandler();
            });
        }
    }

    loadOneHandler() {
        this.loadCount += 1;

        this.loadOne(this.loadCount, this.totalCount);

        if (this.loadCount === this.totalCount) {
            this.loadAllHandler();
        }
    }

    loadAllHandler() {
        this.loadAll(this.totalCount);
    }
}




var ccc = new Component({
    loadOne() {
        // console.log('==========loadOne');
    },
    loadAll(totalCount) {
        // console.log('==========loadAll');
    }
});
ccc.load();
