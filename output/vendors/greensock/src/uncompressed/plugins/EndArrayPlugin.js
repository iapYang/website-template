/*!
 * VERSION: 0.1.2
 * DATE: 2014-07-17
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */

var _gsScope=typeof module!="undefined"&&module.exports&&typeof global!="undefined"?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){_gsScope._gsDefine.plugin({propName:"endArray",API:2,version:"0.1.2",init:function(e,t,n){var r=t.length,i=this.a=[],s,o;this.target=e,this._round=!1;if(!r)return!1;while(--r>-1)s=e[r],o=t[r],s!==o&&i.push({i:r,s:s,c:o-s});return!0},round:function(e){"endArray"in e&&(this._round=!0)},set:function(e){var t=this.target,n=this.a,r=n.length,i,s;if(this._round)while(--r>-1)i=n[r],t[i.i]=Math.round(i.s+i.c*e);else while(--r>-1)i=n[r],s=i.s+i.c*e,t[i.i]=s<1e-6&&s>-0.000001?0:s}})}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();