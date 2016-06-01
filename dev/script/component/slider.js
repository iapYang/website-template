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

    var COMPONENT_NAME = 'Slider';

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

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    var ua = window.navigator.userAgent.toLowerCase();
    var hasTouch = 'ontouchstart' in window;
    var isIE = /(msie|trident)/i.test(navigator.userAgent);
    var isEdge = ua.match(/edge/i) !== null;

    var useTraditionalAnimation = isIE || isEdge;


    ///////////////
    // Component //
    ///////////////

    var defaultOptions = {
        dragable: true,
        currentIndex: 0,
        speed: 1000,
        interactiveSpeed: 200,
        interactiveDistance: 100,
        ease: 'ease-in-out',
        onChangeStart: function(i, next) {},
        onChangeEnd: function(i, prev) {}
    };

    var Component = function(opts) {
        var options = merge({}, defaultOptions, opts);

        // options which user can config
        this.container = options.container;
        this.prevBtn = options.prevBtn;
        this.nextBtn = options.nextBtn;
        this.indicator = options.indicator;
        this.dragable = options.dragable;
        this.currentIndex = options.currentIndex;
        this.speed = options.speed;
        this.interactiveSpeed = options.interactiveSpeed;
        this.interactiveDistance = options.interactiveDistance;
        this.ease = options.ease;
        this.onChangeStart = options.onChangeStart;
        this.onChangeEnd = options.onChangeEnd;



        // check
        if (!this.container) {
            throw new Error('the slider need a initialize element');
        }
        if (this.container && this.container.length) {
            throw new Error('the slider container need to be a dom element');
        }


        // init vars
        this.wrapper = this.container.children[0];
        this.items = [].slice.call(this.wrapper.children);
        if(this.indicator) this.indicatorElements = [].slice.call(this.indicator.children);
        this.animating = false;
        this.updating = false;
        this.length = this.items.length;
        this.wrapper.style.transitionTimingFunction = this.ease;

        initStyle.call(this);
        calcOrder.call(this);
        registerEvent.call(this);
    };

    Component.prototype.slidePrev = function(speed) {
        var targetIndex = getPrevIndex.call(this);
        var calcSpeed = isNumeric(speed) ? speed : this.speed;

        slideFunc.call(this, targetIndex, 'prev', calcSpeed);
    };

    Component.prototype.slideNext = function(speed) {
        var targetIndex = getNextIndex.call(this);
        var calcSpeed = isNumeric(speed) ? speed : this.speed;

        slideFunc.call(this, targetIndex, 'next', calcSpeed);
    };

    Component.prototype.slideTo = function(targetIndex, speed) {
        var calcSpeed = isNumeric(speed) ? speed : this.speed;

        slideFunc.call(this, targetIndex, null, calcSpeed);
    };

    function setDisplacement(value){
        if(useTraditionalAnimation){
            this.wrapper.style.left = value;
        }else{
            this.wrapper.style.transform = 'translateX(' + value + ')';
        }
    }

    function initStyle() {
        var self = this;

        this.container.style.overflow = 'hidden';
        this.wrapper.style.position = 'relative';
        setDisplacement.call(this, '0%');

        this.items[0].style.position = 'relative';

        this.items.forEach(function(el, i){
            if(i === 0){
                el.style.position = 'relative';
            }else{
                el.style.position = 'absolute';
                el.style.top = 0;
            }
        });

        if(this.indicatorElements){
            this.indicatorElements[this.currentIndex].classList.add('active');
        }
    }

    function calcOrder() {
        var currentIndex = this.currentIndex;
        var prevIndex = getPrevIndex.call(this);
        var nextIndex = getNextIndex.call(this);

        hideItemsExcept.call(this, [currentIndex, prevIndex, nextIndex]);

        this.items[currentIndex].style.left = '0%';
        this.items[prevIndex].style.left = '-100%';
        this.items[nextIndex].style.left = '100%';
    }

    function hideItemsExcept(exceptArr) {
        this.items.forEach(function(el, i){
            if (exceptArr.indexOf(i) == -1){
                el.style.visibility = 'hidden';
            }else{
                el.style.visibility = 'visible';
            }
        });
    }

    function registerEvent() {
        var self = this;
        var tapEvent = hasTouch ? 'touchend' : 'click';
        var downEvent = hasTouch ? 'touchstart' : 'mousedown';
        var moveEvent = hasTouch ? 'touchmove' : 'mousemove';
        var upEvent = hasTouch ? 'touchend' : 'mouseup';

        if (this.prevBtn) this.prevBtn.addEventListener(tapEvent, this.slidePrev.bind(this), false);
        if (this.nextBtn) this.nextBtn.addEventListener(tapEvent, this.slideNext.bind(this), false);
        if (this.indicatorElements){
            this.indicatorElements.forEach(function(el, i){
                el.addEventListener(tapEvent, self.slideTo.bind(self, i), false);
            });
        }

        // return;
        if(this.dragable){
            this.container.addEventListener(downEvent, startDrag.bind(this), false);
            this.container.addEventListener(moveEvent, duringDrag.bind(this), false);
            this.container.addEventListener(upEvent, endDrag.bind(this), false);
            this.container.addEventListener('mouseleave', endDrag.bind(this), false);
        }
    }

    function getPrevIndex() {
        var length = this.items.length;

        return (length + this.currentIndex - 1) % length;
    }

    function getNextIndex() {
        return (this.currentIndex + 1) % this.items.length;
    }

    function slideFunc(targetIndex, direct, speed) {
        targetIndex = parseInt(targetIndex);

        if (targetIndex == this.currentIndex) return;
        if (targetIndex < 0) return;
        if (targetIndex >= this.length) return;

        if (this.animating) return;
        this.animating = true;

        this.onChangeStart(this.currentIndex, targetIndex);

        // necessary when slide to a  random index
        hideItemsExcept.call(this, [this.currentIndex, targetIndex]);

        // change indicator
        changeIndicator.call(this, targetIndex);

        if (direct === null) {
            direct = this.currentIndex > targetIndex ? 'prev' : 'next';
        }

        this.wrapper.style.transitionDuration = speed + 'ms';

        if (direct == 'prev') {
            this.items[targetIndex].style.left = '-100%';
            setDisplacement.call(this, '100%');
        } else {
            this.items[targetIndex].style.left = '100%';
            setDisplacement.call(this, '-100%');
        }

        var that = this;
        setTimeout(slideEnd.bind(that, targetIndex), speed);
    }

    function slideEnd(endIndex, noTriggerEvent) {
        var prevIndex = this.currentIndex;

        this.currentIndex = endIndex;

        this.wrapper.style.transitionDuration = '0ms';
        setDisplacement.call(this, '0%');

        this.animating = false;
        this.updating = false;

        calcOrder.call(this);

        if(!noTriggerEvent){
            this.onChangeEnd(this.currentIndex, prevIndex);
        }
    }

    function startDrag(e) {
        var interactive_el = e.srcElement || e.target || e.toElement;
        if(interactive_el === this.prevBtn || interactive_el === this.nextBtn){
            return;
        }

        if (this.animating) return;
        if (this.interactived) return;

        this.interactived = true;
        this.moveX = 0;
        this.startOffsetX = hasTouch ? e.touches[0].screenX : e.screenX;
        this.wrapper.style.transitionDuration = '0ms';
    }

    function duringDrag(e) {
        if (!this.interactived) return;

        this.updating = true;

        var currentOffsetX = hasTouch ? e.touches[0].screenX : e.screenX;

        this.moveX = currentOffsetX - this.startOffsetX;

        setDisplacement.call(this, this.moveX + 'px');
    }

    function endDrag(e) {
        if (this.animating) return;
        if (!this.interactived) return;

        this.interactived = false;

        var targetIndex, noTriggerEnd;

        this.wrapper.style.transitionDuration = this.interactiveSpeed + 'ms';
        this.animating = true;

        if (Math.abs(this.moveX) > this.interactiveDistance) {
            noTriggerEnd = false;

            if (this.moveX > 0) {
                setDisplacement.call(this, '100%');
                targetIndex = getPrevIndex.call(this);
            } else {
                setDisplacement.call(this, '-100%');
                targetIndex = getNextIndex.call(this);
            }

            // change indicator
            changeIndicator.call(this, targetIndex);

            this.onChangeStart(this.currentIndex, targetIndex);
        } else {
            noTriggerEnd = true;

            setDisplacement.call(this, '0%');
            targetIndex = this.currentIndex;
        }

        setTimeout(slideEnd.bind(this, targetIndex, noTriggerEnd), this.interactiveSpeed);
    }

    function changeIndicator(targetIndex){
        if(this.indicatorElements){
            this.indicatorElements[this.currentIndex].classList.remove('active');
            this.indicatorElements[targetIndex].classList.add('active');
        }
    }





    window[COMPONENT_NAME] = Component;

    return Component;
}));
