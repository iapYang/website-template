/*!
 * VERSION: 0.1.9
 * DATE: 2014-07-22
 * UPDATES AND DOCS AT: http://www.greensock.com/jquery-gsap-plugin/
 *
 * Requires TweenLite version 1.8.0 or higher and CSSPlugin.
 *
 * @license Copyright (c) 2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */

(function(e){var t=e.fn.animate,n=e.fn.stop,r=!0,i,s,o,u=function(e){var t={},n;for(n in e)t[n]=e[n];return t},a={overwrite:1,delay:1,useFrames:1,runBackwards:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,autoCSS:1},f=function(e,t){for(var n in a)a[n]&&e[n]!==undefined&&(t[n]=e[n])},l=function(e){return function(t){return e.getRatio(t)}},c={},h=function(){var t=window.GreenSockGlobals||window,n,r,u;i=t.TweenMax||t.TweenLite,i&&(n=(i.version+".0.0").split("."),r=!(Number(n[0])>0&&Number(n[1])>7),t=t.com.greensock,s=t.plugins.CSSPlugin,c=t.easing.Ease.map||{});if(!i||!s||r){i=null,!o&&window.console&&(window.console.log("The jquery.gsap.js plugin requires the TweenMax (or at least TweenLite and CSSPlugin) JavaScript file(s)."+(r?" Version "+n.join(".")+" is too old.":"")),o=!0);return}if(e.easing){for(u in c)e.easing[u]=l(c[u]);h=!1}};e.fn.animate=function(n,o,a,l){n=n||{};if(h){h();if(!i||!s)return t.call(this,n,o,a,l)}if(!r||n.skipGSAP===!0||typeof o=="object"&&typeof o.step=="function"||n.scrollTop!=null||n.scrollLeft!=null)return t.call(this,n,o,a,l);var p=e.speed(o,a,l),d={ease:c[p.easing]||(p.easing===!1?c.linear:c.swing)},v=this,m=typeof o=="object"?o.specialEasing:null,g,y,b,w;for(y in n){g=n[y],g instanceof Array&&c[g[1]]&&(m=m||{},m[y]=g[1],g=g[0]);if(g==="toggle"||g==="hide"||g==="show")return t.call(this,n,o,a,l);d[y.indexOf("-")===-1?y:e.camelCase(y)]=g}if(m){d=u(d),w=[];for(y in m)g=w[w.length]={},f(d,g),g.ease=c[m[y]]||d.ease,y.indexOf("-")!==-1&&(y=e.camelCase(y)),g[y]=d[y],delete d[y];w.length===0&&(w=null)}return b=function(t){var n=u(d),r;if(w){r=w.length;while(--r>-1)i.to(this,e.fx.off?0:p.duration/1e3,w[r])}n.onComplete=function(){t?t():p.old&&e(this).each(p.old)},i.to(this,e.fx.off?0:p.duration/1e3,n)},p.queue!==!1?(v.queue(p.queue,b),typeof p.old=="function"&&v.queue(p.queue,function(e){p.old.call(this),e()})):b.call(v),v},e.fn.stop=function(e,t){n.call(this,e,t);if(i){if(t){var r=i.getTweensOf(this),s=r.length,o;while(--s>-1)o=r[s].totalTime()/r[s].totalDuration(),o>0&&o<1&&r[s].seek(r[s].totalDuration())}i.killTweensOf(this)}return this},e.gsap={enabled:function(e){r=e},version:"0.1.9"}})(jQuery);