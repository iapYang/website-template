/*!
 * VERSION: beta 1.4.1
 * DATE: 2014-07-17
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

var _gsScope=typeof module!="undefined"&&module.exports&&typeof global!="undefined"?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){var e=_gsScope._gsDefine.plugin({propName:"roundProps",version:"1.4.1",priority:-1,API:2,init:function(e,t,n){return this._tween=n,!0}}),t=e.prototype;t._onInitAllProps=function(){var e=this._tween,t=e.vars.roundProps instanceof Array?e.vars.roundProps:e.vars.roundProps.split(","),n=t.length,r={},i=e._propLookup.roundProps,s,o,u;while(--n>-1)r[t[n]]=1;n=t.length;while(--n>-1){s=t[n],o=e._firstPT;while(o)u=o._next,o.pg?o.t._roundProps(r,!0):o.n===s&&(this._add(o.t,s,o.s,o.c),u&&(u._prev=o._prev),o._prev?o._prev._next=u:e._firstPT===o&&(e._firstPT=u),o._next=o._prev=null,e._propLookup[s]=i),o=u}return!1},t._add=function(e,t,n,r){this._addTween(e,t,n,n+r,t,!0),this._overwriteProps.push(t)}}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();