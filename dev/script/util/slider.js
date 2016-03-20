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




    var defaultOptions = {
        currentIndex: 0,
        speed: 1000
    }

    var Slider = function(opts){
        var options = merge({}, defaultOptions, opts);

        this.container = options.container;
        this.currentIndex = options.currentIndex;
        this.speed = options.speed;
        this.prevBtn = options.prevBtn;
        this.nextBtn = options.nextBtn;



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

        initStyle(this);
        calcOrder(this);
        registerEvent(this);
    }

    Slider.prototype.slidePrev = function(){
        if(this.animating) return;
        this.animating = true;

        this.wrapper.style.transitionDuration = this.speed + 'ms';
        this.wrapper.style.transform = 'translateX(100%)';

        var that = this;
        setTimeout(function(){
            that.currentIndex = getPrevIndex(that);

            slideEnd(that);
        }, this.speed)
    }

    Slider.prototype.slideNext = function(){
        if(this.animating) return;
        this.animating = true;

        this.wrapper.style.transitionDuration = this.speed + 'ms';
        this.wrapper.style.transform = 'translateX(-100%)';

        var that = this;
        setTimeout(function(){
            that.currentIndex = getNextIndex(that);

            slideEnd(that);
        }, this.speed)
    }

    Slider.prototype.slideTo = function(targetIndex){
        targetIndex = parseInt(targetIndex);

        if(targetIndex == this.currentIndex) return;
        if(targetIndex < 0) return;
        if(targetIndex >= this.length) return;

        if(this.animating) return;
        this.animating = true;


        hideItemsExcept(this, [this.currentIndex, targetIndex]);

        if(targetIndex < this.currentIndex){
            this.items[targetIndex].style.left = '-100%';
            // this.slidePrev();
            this.wrapper.style.transitionDuration = this.speed + 'ms';
            this.wrapper.style.transform = 'translateX(100%)';
        }

        if(targetIndex > this.currentIndex){
            this.items[targetIndex].style.left = '100%';
            // this.slideNext();
            this.wrapper.style.transitionDuration = this.speed + 'ms';
            this.wrapper.style.transform = 'translateX(-100%)';
        }

        var that = this;
        setTimeout(function(){
            that.currentIndex = targetIndex;

            slideEnd(that);
        }, this.speed)
    }


    function initStyle(slider){
        slider.container.style.overflow = 'hidden';

        slider.wrapper.style.position = 'relative';

        slider.items[0].style.position = 'relative';
        for(var i = 1, length = slider.items.length; i < length; ++i){
            slider.items[i].style.position = 'absolute';
            slider.items[i].style.top = 0;
        }
    }

    function calcOrder(slider){
        var currentIndex = slider.currentIndex;
        var prevIndex = getPrevIndex(slider);
        var nextIndex = getNextIndex(slider);

        hideItemsExcept(slider, [currentIndex, prevIndex, nextIndex]);

        slider.items[currentIndex].style.left = '0%';
        slider.items[prevIndex].style.left = '-100%';
        slider.items[nextIndex].style.left = '100%';
    }

    function hideItemsExcept(slider, exceptArr){
        for(var i = 0, length = slider.items.length; i < length; ++i){
            if(exceptArr.indexOf(i) == -1){
                slider.items[i].style.visibility = 'hidden';
            }else{
                slider.items[i].style.visibility = 'visible';
            }
        }
    }

    function getPrevIndex(slider){
        var length = slider.items.length;

        return (length + slider.currentIndex - 1) % length;
    }

    function getNextIndex(slider){
        return (slider.currentIndex + 1) % slider.items.length;
    }

    function registerEvent(slider){
        if(slider.prevBtn) slider.prevBtn.addEventListener('click', slider.slidePrev.bind(slider), false);
        if(slider.nextBtn) slider.nextBtn.addEventListener('click', slider.slideNext.bind(slider), false);
    }

    function slideEnd(slider){
        slider.wrapper.style.transitionDuration = 0 + 'ms';
        slider.wrapper.style.transform = 'translateX(0%)';

        slider.animating = false;

        calcOrder(slider);
    }





    window.Slider = Slider;

    return Slider;
}));
