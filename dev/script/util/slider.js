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
    }

    function initStyle(slider){
        slider.items[0].style.position = 'relative';
    }



    window.Slider = Slider;

    return Slider;
}));
