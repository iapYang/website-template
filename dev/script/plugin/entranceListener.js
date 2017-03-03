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
            // var rect = item.el.getBoundingClientRect();
            // var reached = (rect.top + item.offset) < innerHeight;
            // var outed = rect.top >= innerHeight;
            //
            // if (reached && !item.triggered) {
            //     item.triggered = true;
            //     item.enter.call(item.el);
            // }
            //
            // if (outed && item.triggered) {
            //     item.triggered = false;
            //     item.leave.call(item.el);
            // }

            // console.log('==========',item);


            var rect = item.el.getBoundingClientRect();

            var flagTopHigherThanBottom = rect.top <= innerHeight;
            var flagTopLowerThanBottom = rect.top > innerHeight;

            var flagBottomHigherThanTop = rect.bottom < 0;
            var flagBottomLowerThanTop = rect.bottom >= 0;

            if(flagTopHigherThanBottom && !item.flagTopReachBottom) {
                item.flagTopReachBottom = true;
                item.onTopEnterBottom.call(item.el);
            }

            if(flagTopLowerThanBottom && item.flagTopReachBottom) {
                item.flagTopReachBottom = false;
                item.onTopLeaveBottom.call(item.el);
            }

            if(flagBottomHigherThanTop && item.flagBottomReachTop) {
                item.flagBottomReachTop = false;
                item.onBottomLeaveTop.call(item.el);
            }

            if(flagBottomLowerThanTop && !item.flagBottomReachTop) {
                item.flagBottomReachTop = true;
                item.onBottomEnterTop.call(item.el);
            }
        });
    }

    if (window[COMPONENT_NAME] === undefined) {
        window[COMPONENT_NAME] = Component;
    }

    return Component;
}));
