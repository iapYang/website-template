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
        const source = this.getSource();

        return new Promise((resolve, reject) => {
            const image = new Image();
            image.crossOrigin = 'anonymous';

            image.onload = resolve;
            image.onerror = reject;
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

    save(survivalTime) {
        if(!this.needStore) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = this.image.width;
        canvas.height = this.image.height;
        ctx.drawImage(this.image, 0, 0);

        const storageObj = {
            expiration: Date.now() + survivalTime,
            source: canvas.toDataURL('image/png'),
        };

        try {
            sessionStorage.setItem(this.src, JSON.stringify(storageObj));
        } catch (e) {
            console.log(e.message);
        }
    }

    getSource() {
        const storageObj = JSON.parse(sessionStorage.getItem(this.src)) || {};
        const expiration = storageObj.expiration;

        this.needStore = expiration === undefined || expiration < Date.now();

        return !this.needStore ? storageObj.source : this.src;
    }
}
