export default class {
    // src
    // container
    // useBg

    constructor(options) {
        for(const key in options) {
            this[key] = options[key];
        }
    }

    load() {
        const {source} = this.getRealSource();

        return new Promise((resolve, reject) => {
            const image = new Image();
            image.setAttribute('crossOrigin', 'anonymous');

            image.onload = () => {
                resolve(image);
            }

            image.onerror = () => {
                reject(image);
            }

            image.src = source;

            this.image = image;
        });
    }

    setContent() {
        if(this.container === undefined) return;

        if(this.useBg) {
            this.container.style.backgroundImage = 'url(' + this.src + ')';
        } else {
            this.container.appendChild(this.image);
        }

        this.addLoadedClass();
    }

    addLoadedClass() {
        this.container.classList.add('loaded');
    }

    save() {
        const {inStorage} = this.getRealSource();

        if(inStorage) return;

        const storageObj = {};
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = this.image.width;
        canvas.height = this.image.height;
        ctx.drawImage(this.image, 0, 0);

        storageObj.timestamp = Date.now();
        storageObj.source = canvas.toDataURL('image/png');

        try {
            sessionStorage.setItem(this.src, JSON.stringify(storageObj));
        } catch (e) {
            console.log(e.message);
        }
    }

    getRealSource() {
        const storageObj = JSON.parse(sessionStorage.getItem(this.src)) || {};
        const timestamp = storageObj.timestamp;
        const liveUntil = timestamp + this.timeout;

        if (timestamp !== undefined && liveUntil > Date.now()) {
            return {
                inStorage: true,
                source: storageObj.source,
            };
        } else {
            return {
                inStorage: false,
                source: this.src,
            }
        }
    }
}
