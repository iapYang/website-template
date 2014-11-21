/*!
 * VERSION: beta 0.2.1
 * DATE: 2014-07-17
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

var _gsScope=typeof module!="undefined"&&module.exports&&typeof global!="undefined"?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){_gsScope._gsDefine.plugin({propName:"directionalRotation",version:"0.2.1",API:2,init:function(e,t,n){typeof t!="object"&&(t={rotation:t}),this.finals={};var r=t.useRadians===!0?Math.PI*2:360,i=1e-6,s,o,u,a,f,l;for(s in t)if(s!=="useRadians"){l=(t[s]+"").split("_"),o=l[0],u=parseFloat(typeof e[s]!="function"?e[s]:e[s.indexOf("set")||typeof e["get"+s.substr(3)]!="function"?s:"get"+s.substr(3)]()),a=this.finals[s]=typeof o=="string"&&o.charAt(1)==="="?u+parseInt(o.charAt(0)+"1",10)*Number(o.substr(2)):Number(o)||0,f=a-u,l.length&&(o=l.join("_"),o.indexOf("short")!==-1&&(f%=r,f!==f%(r/2)&&(f=f<0?f+r:f-r)),o.indexOf("_cw")!==-1&&f<0?f=(f+r*9999999999)%r-(f/r|0)*r:o.indexOf("ccw")!==-1&&f>0&&(f=(f-r*9999999999)%r-(f/r|0)*r));if(f>i||f<-i)this._addTween(e,s,u,u+f,s),this._overwriteProps.push(s)}return!0},set:function(e){var t;if(e!==1)this._super.setRatio.call(this,e);else{t=this._firstPT;while(t)t.f?t.t[t.p](this.finals[t.p]):t.t[t.p]=this.finals[t.p],t=t._next}}})._autoCSS=!0}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();