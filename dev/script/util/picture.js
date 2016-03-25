(function(factory){
    if ( typeof module === 'object' && typeof module.exports === 'object' ){
            console.log('Picture load with commonJS');
            module.exports = factory();
    }else{
        console.log('Picture load with normal');
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


    var className = 'preload';
    var dataName = 'data-source';

    var items, totalCount, options;
    var loadCount = 0;

    var defaultOptions = {
        load: function(){},
        end: function(){},
    }

    var Picture = function(){

    }

    Picture.preload = function(opts){
        options = merge({}, defaultOptions, opts);

        items = document.getElementsByClassName(className);
        totalCount = items.length;

        if(totalCount == 0){
            doEnd();
        }

        for(var i = 0; i < totalCount; ++i){
            startLoad(items[i]);
        }
    }

    function startLoad(item){
        var src = item.getAttribute(dataName);
        var image = new Image();

        image.onload = function(){
            item.appendChild(this);
            doLoad(image);
        };
        image.onerror = function(){
            doLoad(image);
        }

        image.src = src;
    }

    function doLoad(image){
        ++loadCount;

        options.load(image, loadCount, totalCount);

        if(loadCount == totalCount){
            doEnd();
        }
    }

    function doEnd(){
        options.end(loadCount, totalCount);
    }



    window.Picture = Picture;

    return Picture;
}));
