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
        currentIndex: 0
    }

    var Slider = function(opts){
        var options = merge({}, defaultOptions, opts);

        this.container = options.container;
        this.currentIndex = options.currentIndex;


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

        initStyle(this);
        calcOrder(this);
    }

    function initStyle(slider){
        slider.wrapper.style.position = 'relative';

        slider.items[0].style.position = 'relative';
        for(var i = 1, length = slider.items.length; i < length; ++i){
            slider.items[i].style.position = 'absolute';
            slider.items[i].style.top = 0;
        }
    }

    function calcOrder(slider){
        console.log(getPrevIndex(slider));
    }

    function getNextIndex(slider){
        return (slider.currentIndex + 1) % slider.items.length;
    }

    function getPrevIndex(slider){
        var length = slider.items.length;

        return (length + slider.currentIndex - 1) % length;
    }




    window.Slider = Slider;

    return Slider;
}));
