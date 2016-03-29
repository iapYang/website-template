(function(factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        console.log('Picture load with commonJS');
        module.exports = factory();
    } else {
        console.log('Picture load with normal');
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

    var defaultOptions = {
        className: 'preload',
        done: function() {},
        end: function() {},
    };

    var Picture = function(opts) {
        var options = merge({}, defaultOptions, opts);

        this.className = options.className;
        this.done = options.done;
        this.end = options.end;

        /************/

        this.items = document.getElementsByClassName(this.className);
        this.totalCount = this.items.length;
        this.loadCount = 0;
    };

    Picture.prototype.load = function(){
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

        this.image = image;
        image.src = src;
    }

    function DoneHandler(item) {
        item.classList.add('done');
        ++this.loadCount;

        this.done(this.image, this.loadCount, this.totalCount);

        if (this.loadCount == this.totalCount) {
            endHandler.call(this);
        }
    }

    function endHandler() {
        this.end(this.loadCount, this.totalCount);
    }



    window.Picture = Picture;

    return Picture;
}));
