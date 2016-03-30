(function(factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        console.log('PictureLoader load with commonJS');
        module.exports = factory();
    } else {
        console.log('PictureLoader load with normal');
        factory();
    }
}(function() {
    function merge() {
        var obj = {},
            i = 0,
            il = arguments.length,
            key;

        for (; i < il; ++i) {
            for (key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    obj[key] = arguments[i][key];
                }
            }
        }

        return obj;
    }

    var timeoutValue = 1000 * 60;
    var dataName = 'data-source';
    var loadQueue = [];
    var queueFlag;

    var initialOptions = {
        className: 'preload',
    };

    var loadOptions = {
        done: function() {},
        end: function() {},
    };

    var PictureLoader = function(opts) {
        var options = merge({}, initialOptions, opts);

        this.className = options.className;

        /************/

        this.items = [].slice.call(document.getElementsByClassName(this.className));
        this.totalCount = this.items.length;
        this.loadCount = 0;
    };

    PictureLoader.pushQueue = function(sourceArr){
        Array.prototype.push.apply(loadQueue, sourceArr);
    };

    PictureLoader.startQueue = function(){
        queueFlag = setInterval(function(){
            if(loadQueue.length === 0) return;

            var src = loadQueue.shift();
            startLoad(src);
        }, 10);
    };

    PictureLoader.stopQueue = function(){
        clearInterval(queueFlag);
    };

    PictureLoader.prototype.load = function(opts) {
        var options = merge({}, loadOptions, opts);

        this.done = options.done;
        this.end = options.end;

        if (this.totalCount === 0) {
            endHandler.call(this);
            return;
        }

        var that = this;
        this.items.forEach(function(item, i){
            var src = item.getAttribute(dataName);
            startLoad.call(that, src, item);
        });
    };

    function startLoad(src, item) {
        var that = this;
        var image = new Image();

        var storageObj = JSON.parse(localStorage.getItem(src)) || {};
        var timestamp = storageObj.timestamp;
        var liveUntil = timestamp + timeoutValue;

        if (timestamp !== undefined && liveUntil > Date.now()) {
            // load from cache
            image.src = storageObj.source;

            if(item !== undefined){
                item.appendChild(image);
                DoneHandler.call(that, image);
            }
        } else {
            // load from file
            image.onload = function() {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);

                storageObj.source = canvas.toDataURL('image/png');
                storageObj.timestamp = Date.now();

                localStorage.setItem(src, JSON.stringify(storageObj));

                if(item !== undefined){
                    item.appendChild(image);
                    DoneHandler.call(that, image);
                }
            };
            image.onerror = function() {
                DoneHandler.call(that, image);
            };

            image.src = src;
        }
    }

    function DoneHandler(image) {
        ++this.loadCount;

        this.done(image, this.loadCount, this.totalCount);

        if (this.loadCount == this.totalCount) {
            endHandler.call(this);
        }
    }

    function endHandler() {
        this.end(this.loadCount, this.totalCount);
    }



    window.PictureLoader = PictureLoader;

    return PictureLoader;
}));
