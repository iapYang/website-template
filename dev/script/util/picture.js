(function(factory){
    if ( typeof module === 'object' && typeof module.exports === 'object' ){
            console.log('Picture load with commonJS');
            module.exports = factory();
    }else{
        console.log('Picture load with normal');
        factory();
    }
}(function(){
    var className = 'preload';
    var dataName = 'data-source';

    var items;
    var loadCount = 0;
    var totalCount;
    var options;

    var defaultOptions = {
        load: function(){},
        end: function(){}
    }

    var Picture = function(){

    }

    Picture.preload = function(opts){
        options = Object.assign({}, defaultOptions, opts);

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
            doLoad();
        };
        image.onerror = function(){
            doLoad();
        }

        image.src = src;
    }

    function doLoad(){
        ++loadCount;

        options.load(loadCount, totalCount);

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
