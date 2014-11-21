/*!
 * VERSION: 0.5.1
 * DATE: 2014-07-17
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */

var _gsScope=typeof module!="undefined"&&module.exports&&typeof global!="undefined"?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){var e=function(t){var n=t.nodeType,r="";if(n===1||n===9||n===11){if(typeof t.textContent=="string")return t.textContent;for(t=t.firstChild;t;t=t.nextSibling)r+=e(t)}else if(n===3||n===4)return t.nodeValue;return r},t=_gsScope._gsDefine.plugin({propName:"text",API:2,version:"0.5.1",init:function(t,n,r){var i,s;if("innerHTML"in t){this._target=t,typeof n!="object"&&(n={value:n});if(n.value===undefined)return this._text=this._original=[""],!0;this._delimiter=n.delimiter||"",this._original=e(t).replace(/\s+/g," ").split(this._delimiter),this._text=n.value.replace(/\s+/g," ").split(this._delimiter),this._runBackwards=r.vars.runBackwards===!0,this._runBackwards&&(i=this._original,this._original=this._text,this._text=i),typeof n.newClass=="string"&&(this._newClass=n.newClass,this._hasClass=!0),typeof n.oldClass=="string"&&(this._oldClass=n.oldClass,this._hasClass=!0),i=this._original.length-this._text.length,s=i<0?this._original:this._text,this._fillChar=n.fillChar||(n.padSpace?"&nbsp;":""),i<0&&(i=-i);while(--i>-1)s.push(this._fillChar);return!0}return!1},set:function(e){e>1?e=1:e<0&&(e=0),this._runBackwards&&(e=1-e);var t=this._text.length,n=e*t+.5|0,r,i,s;this._hasClass?(r=this._newClass&&n!==0,i=this._oldClass&&n!==t,s=(r?"<span class='"+this._newClass+"'>":"")+this._text.slice(0,n).join(this._delimiter)+(r?"</span>":"")+(i?"<span class='"+this._oldClass+"'>":"")+this._delimiter+this._original.slice(n).join(this._delimiter)+(i?"</span>":"")):s=this._text.slice(0,n).join(this._delimiter)+this._delimiter+this._original.slice(n).join(this._delimiter),this._target.innerHTML=this._fillChar==="&nbsp;"&&s.indexOf("  ")!==-1?s.split("  ").join("&nbsp;&nbsp;"):s}}),n=t.prototype;n._newClass=n._oldClass=n._delimiter=""}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();