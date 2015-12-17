// var $ = require('jquery');
// var Handlebars = require('handlebars');
//
// var source   = $("#entry-template").html();
// var template = Handlebars.compile(source);
//
//
// let arr = [
//     {name: 'a', age: 11, sex: 'f'},
//     {name: 'b', age: 12, sex: 'm'},
//     {name: 'c', age: 13, sex: 'f'},
//     {name: 'd', age: 14, sex: 'm'},
//     {name: 'e', age: 15, sex: 'f'}
// ];
//
// for(let item of arr){
//     let html = template(item);
//
//     $('.list').append(html);
// }

let a = 2;
let b = 'abc';

let obj = {
    a,
    b,
    test(){
        console.log(1);
    }
}

console.log(obj);
obj.test();
