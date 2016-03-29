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


    var dataName = 'data-source';

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

        this.items = document.getElementsByClassName(this.className);
        this.totalCount = this.items.length;
        this.loadCount = 0;
    };

    PictureLoader.prototype.load = function(opts){
        var options = merge({}, loadOptions, opts);

        this.done = options.done;
        this.end = options.end;

        if(this.totalCount === 0){
            endHandler.call(this);
            return;
        }

        for(var i = 0; i < this.totalCount; ++i){
            startLoad.call(this, this.items[i]);
        }
    };

    function startLoad(item) {
        if(item.classList.contains('done')) return;

        var that = this;
        var src = item.getAttribute(dataName);
        var image = new Image();

        image.onload = function() {
            item.appendChild(image);

            DoneHandler.call(that, item);
        };
        image.onerror = function() {
            DoneHandler.call(that, item);
        };

        item.image = image;
        image.src = src;
    }

    function DoneHandler(item) {
        item.classList.add('done');
        ++this.loadCount;

        this.done(item.image, this.loadCount, this.totalCount);

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
