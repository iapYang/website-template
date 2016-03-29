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

    var items, totalCount, options;
    var loadCount = 0;

    var defaultOptions = {
        className: 'preload',
        done: function() {},
        end: function() {},
    };

    var Picture = function() {

    };

    Picture.load = function(opts) {
        options = merge({}, defaultOptions, opts);

        items = document.getElementsByClassName(options.className);
        totalCount = items.length;

        if (totalCount === 0) {
            endHandler();
        }

        for (var i = 0; i < totalCount; ++i) {
            startLoad(items[i]);
        }
    };

    function startLoad(item) {
        if(item.classList.contains('done')) return;

        var src = item.getAttribute(dataName);
        var image = new Image();

        image.onload = function() {
            item.classList.add('done');
            item.appendChild(this);
            DoneHandler(image);
        };
        image.onerror = function() {
            item.classList.add('done');
            DoneHandler(image);
        };

        image.src = src;
    }

    function DoneHandler(image) {
        ++loadCount;

        options.done(image, loadCount, totalCount);

        if (loadCount == totalCount) {
            endHandler();
        }
    }

    function endHandler() {
        options.end(loadCount, totalCount);
    }



    window.Picture = Picture;

    return Picture;
}));
