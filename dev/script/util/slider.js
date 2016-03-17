(function(factory){
    if ( typeof module === 'object' && typeof module.exports === 'object' ){
            console.log('Slider load with commonJS');
            module.exports = factory();
    }else{
        console.log('Slider load with normal');
        factory();
    }
}(function(){

    var defaultOptions = {
        
    }

    var Slider = function(opts){
        var options = Object.assign({}, defaultOptions, opts);

        this.container = options.container;


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

    }




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



    window.Slider = Slider;

    return Slider;
}));
