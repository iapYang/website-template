/*!
 * VERSION: 0.3.3
 * DATE: 2014-07-17
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */

var _gsScope=typeof module!="undefined"&&module.exports&&typeof global!="undefined"?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){_gsScope._gsDefine.plugin({propName:"attr",API:2,version:"0.3.3",init:function(e,t,n){var r,i,s;if(typeof e.setAttribute!="function")return!1;this._target=e,this._proxy={},this._start={},this._end={};for(r in t)this._start[r]=this._proxy[r]=i=e.getAttribute(r),s=this._addTween(this._proxy,r,parseFloat(i),t[r],r),this._end[r]=s?s.s+s.c:t[r],this._overwriteProps.push(r);return!0},set:function(e){this._super.setRatio.call(this,e);var t=this._overwriteProps,n=t.length,r=e===1?this._end:e?this._proxy:this._start,i;while(--n>-1)i=t[n],this._target.setAttribute(i,r[i]+"")}})}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();