(function(factory){
    if ( typeof module === 'object' && typeof module.exports === 'object' ){
            console.log('Slider load with commonJS');
            module.exports = factory();
    }else{
        console.log('Slider load with normal');
        factory();
    }
}(function(){
    function merge(){
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




    var defaultOptions = {
        currentIndex: 0,
        speed: 1000,
        interactiveSpeed: 200,
        interactiveDistance: 100,
        ease: 'ease-in-out',
        onChangeStart: function(i, next){},
        onChangeEnd: function(i, prev){}
    }

    var Slider = function(opts){
        var options = merge({}, defaultOptions, opts);

        // options which user can config
        this.container = options.container;
        this.prevBtn = options.prevBtn;
        this.nextBtn = options.nextBtn;
        this.currentIndex = options.currentIndex;
        this.speed = options.speed;
        this.interactiveSpeed = options.interactiveSpeed;
        this.interactiveDistance = options.interactiveDistance;
        this.ease = options.ease;
        this.onChangeStart = options.onChangeStart;
        this.onChangeEnd = options.onChangeEnd;



        // check
        if(!this.container){
            throw new Error('the slider need a initialize element');
        }
        if(this.container && this.container.length){
            throw new Error('the slider container need to be a dom element');
        }


        // init vars
        this.wrapper = this.container.querySelectorAll('ul')[0];
        this.items = this.wrapper.querySelectorAll('li');
        this.animating = false;
        this.length = this.items.length;
        this.wrapper.style.transitionTimingFunction = this.ease;

        initStyle.call(this);
        calcOrder.call(this);
        registerEvent.call(this);
    }

    Slider.prototype.slidePrev = function(speed){
        var targetIndex = getPrevIndex.call(this);
        var calcSpeed = isNumeric(speed) ? speed : this.speed;

        slideFunc.call(this, targetIndex, 'prev', calcSpeed);
    }

    Slider.prototype.slideNext = function(speed){
        var targetIndex = getNextIndex.call(this)
        var calcSpeed = isNumeric(speed) ? speed : this.speed;

        slideFunc.call(this, targetIndex, 'next', calcSpeed);
    }

    Slider.prototype.slideTo = function(targetIndex, speed){
        var calcSpeed = isNumeric(speed) ? speed : this.speed;

        slideFunc.call(this, targetIndex, null, calcSpeed);
    }

    function initStyle(){
        this.container.style.overflow = 'hidden';

        this.wrapper.style.position = 'relative';

        this.items[0].style.position = 'relative';
        for(var i = 1, length = this.items.length; i < length; ++i){
            this.items[i].style.position = 'absolute';
            this.items[i].style.top = 0;
        }
    }

    function calcOrder(){
        var currentIndex = this.currentIndex;
        var prevIndex = getPrevIndex.call(this);
        var nextIndex = getNextIndex.call(this);

        hideItemsExcept.call(this, [currentIndex, prevIndex, nextIndex]);

        this.items[currentIndex].style.left = '0%';
        this.items[prevIndex].style.left = '-100%';
        this.items[nextIndex].style.left = '100%';
    }

    function hideItemsExcept(exceptArr){
        for(var i = 0, length = this.items.length; i < length; ++i){
            if(exceptArr.indexOf(i) == -1){
                this.items[i].style.visibility = 'hidden';
            }else{
                this.items[i].style.visibility = 'visible';
            }
        }
    }

    function getPrevIndex(){
        var length = this.items.length;

        return (length + this.currentIndex - 1) % length;
    }

    function getNextIndex(){
        return (this.currentIndex + 1) % this.items.length;
    }

    function slideFunc(targetIndex, direct, speed){
        targetIndex = parseInt(targetIndex);

        if(targetIndex == this.currentIndex) return;
        if(targetIndex < 0) return;
        if(targetIndex >= this.length) return;

        if(this.animating) return;
        this.animating = true;

        this.onChangeStart(this.currentIndex, targetIndex);
        hideItemsExcept.call(this, [this.currentIndex, targetIndex]);

        if(direct == null){
            direct = this.currentIndex > targetIndex ? 'prev' : 'next';
        }

        this.wrapper.style.transitionDuration = speed + 'ms';

        if(direct == 'prev'){
            this.items[targetIndex].style.left = '-100%';
            this.wrapper.style.transform = 'translateX(100%)';
        }else{
            this.items[targetIndex].style.left = '100%';
            this.wrapper.style.transform = 'translateX(-100%)';
        }

        var that = this;
        setTimeout(function(){
            slideEnd.call(that, targetIndex);
        }, speed);
    }

    function slideEnd(endIndex){
        this.onChangeEnd(endIndex, this.currentIndex);

        this.currentIndex = endIndex;

        this.wrapper.style.transitionDuration = '0ms';
        this.wrapper.style.transform = 'translateX(0%)';

        this.animating = false;

        calcOrder.call(this);
    }

    function registerEvent(){
        if(this.prevBtn) this.prevBtn.addEventListener('click', this.slidePrev.bind(this), false);
        if(this.nextBtn) this.nextBtn.addEventListener('click', this.slideNext.bind(this), false);

        this.container.addEventListener('mousedown', startMove.bind(this), false);
        this.container.addEventListener('mousemove', duringMove.bind(this), false);
        this.container.addEventListener('mouseup', endMove.bind(this), false);
        this.container.addEventListener('mouseleave', endMove.bind(this), false);
    }

    function startMove(e){
        if(this.animating) return;
        if(this.interactived) return;

        this.interactived = true;
        this.startOffsetX = e.screenX;
        this.wrapper.style.transitionDuration ='0ms';
    }

    function duringMove(e){
        if(!this.interactived) return;

        var moveX = e.screenX - this.startOffsetX;

        this.wrapper.style.transform = 'translateX(' + moveX + 'px)';
    }

    function endMove(e){
        if(!this.interactived) return;
        this.interactived = false;

        var moveX = e.screenX - this.startOffsetX;
        var finalIndex;

        this.wrapper.style.transitionDuration = this.interactiveSpeed + 'ms';
        this.animating = true;

        if(Math.abs(moveX) > this.interactiveDistance){
            if(moveX > 0){
                this.wrapper.style.transform = 'translateX(100%)';
                finalIndex = getPrevIndex.call(this);
            }else{
                this.wrapper.style.transform = 'translateX(-100%)';
                finalIndex = getNextIndex.call(this);
            }

            this.onChangeStart(this.currentIndex, finalIndex);
        }else{
            this.wrapper.style.transform = 'translateX(0px)';
            finalIndex = this.currentIndex;
        }

        var that = this;
        setTimeout(function(){
            slideEnd.call(that, finalIndex);
        }, that.interactiveSpeed);
    }





    window.Slider = Slider;

    return Slider;
}));
