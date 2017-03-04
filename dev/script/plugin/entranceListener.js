(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory();
    } else {
        // Browser global
        factory();
    }
}(this, function() {
    //////////
    // Name //
    //////////

    var COMPONENT_NAME = 'EntranceListener';

    //////////
    // Tool //
    //////////

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

    ///////////////
    // Component //
    ///////////////

    var defaultOptions = {
        // triggered: false,
        // offset: 0,
        // enter: function() {},
        // leave: function() {},

        flagTopReachBottom: false,
        flagBottomReachTop: false,

        offsetTopEnterBottom: 0,
        offsetTopLeaveBottom: 0,
        offsetBottomEnterTop: 0,
        offsetBottomLeaveTop: 0,

        onTopEnterBottom: function() {},
        onTopLeaveBottom: function() {},
        onBottomEnterTop: function() {},
        onBottomLeaveTop: function() {},
    };

    var Component = function(opts) {
        var options = merge({}, defaultOptions, opts);

        Component.sourceQueue.push(options);

        window.addEventListener('scroll', entranceHandler);
        window.addEventListener('resize', entranceHandler);
    };

    Component.sourceQueue = [];

    function entranceHandler() {
        var innerHeight = window.innerHeight;

        Component.sourceQueue.forEach(function(item) {
            var rect = item.el.getBoundingClientRect();

            adjustElTopScreenBottom(item, rect, innerHeight);
            adjustElBottomScreenTop(item, rect, innerHeight);
        });
    }

    function adjustElTopScreenBottom(item, rect, innerHeight) {
        var flagTopHigherThanBottom = (rect.top + item.offsetTopEnterBottom) <= innerHeight;
        var flagTopLowerThanBottom = (rect.top + item.offsetTopLeaveBottom) > innerHeight;

        // top enter bottom
        if(flagTopHigherThanBottom && !item.flagTopReachBottom) {
            item.flagTopReachBottom = true;
            item.onTopEnterBottom.call(item.el);
        }

        // top leave bottom
        if(flagTopLowerThanBottom && item.flagTopReachBottom) {
            item.flagTopReachBottom = false;
            item.onTopLeaveBottom.call(item.el);
        }
    }

    function adjustElBottomScreenTop(item, rect, innerHeight) {
        var flagBottomHigherThanTop = rect.bottom < 0;
        var flagBottomLowerThanTop = rect.bottom >= 0;

        // bottom leave top
        if(flagBottomHigherThanTop && item.flagBottomReachTop) {
            item.flagBottomReachTop = false;
            item.onBottomLeaveTop.call(item.el);
        }

        // bottom enter top
        if(flagBottomLowerThanTop && !item.flagBottomReachTop) {
            item.flagBottomReachTop = true;
            item.onBottomEnterTop.call(item.el);
        }
    }

    if (window[COMPONENT_NAME] === undefined) {
        window[COMPONENT_NAME] = Component;
    }

    return Component;
}));
