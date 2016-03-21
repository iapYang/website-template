(function(factory){
    if ( typeof module === 'object' && typeof module.exports === 'object' ){
            console.log('Util load with commonJS');
            module.exports = factory();
    }else{
        console.log('Util load with normal');
        factory();
    }
}(function(){

    var Util = function(){

    }

    Util.merge = function(){
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

    Util.parseDom = function(str){
        var div = document.createElement('div');
        div.innerHTML = str;

        return div.childNodes[0];
    }






    window.Util = Util;

    return Util;
}));
