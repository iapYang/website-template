/*
* @fileOverview TouchSwipe - jQuery Plugin
* @version 1.6.6
*
* @author Matt Bryson http://www.github.com/mattbryson
* @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* @see http://labs.skinkers.com/touchSwipe/
* @see http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson
* Dual licensed under the MIT or GPL Version 2 licenses.
*
*/

/*
*
* Changelog
* $Date: 2010-12-12 (Wed, 12 Dec 2010) $
* $version: 1.0.0
* $version: 1.0.1 - removed multibyte comments
*
* $Date: 2011-21-02 (Mon, 21 Feb 2011) $
* $version: 1.1.0 	- added allowPageScroll property to allow swiping and scrolling of page
*					- changed handler signatures so one handler can be used for multiple events
* $Date: 2011-23-02 (Wed, 23 Feb 2011) $
* $version: 1.2.0 	- added click handler. This is fired if the user simply clicks and does not swipe. The event object and click target are passed to handler.
*					- If you use the http://code.google.com/p/jquery-ui-for-ipad-and-iphone/ plugin, you can also assign jQuery mouse events to children of a touchSwipe object.
* $version: 1.2.1 	- removed console log!
*
* $version: 1.2.2 	- Fixed bug where scope was not preserved in callback methods.
*
* $Date: 2011-28-04 (Thurs, 28 April 2011) $
* $version: 1.2.4 	- Changed licence terms to be MIT or GPL inline with jQuery. Added check for support of touch events to stop non compatible browsers erroring.
*
* $Date: 2011-27-09 (Tues, 27 September 2011) $
* $version: 1.2.5 	- Added support for testing swipes with mouse on desktop browser (thanks to https://github.com/joelhy)
*
* $Date: 2012-14-05 (Mon, 14 May 2012) $
* $version: 1.2.6 	- Added timeThreshold between start and end touch, so user can ignore slow swipes (thanks to Mark Chase). Default is null, all swipes are detected
*
* $Date: 2012-05-06 (Tues, 05 June 2012) $
* $version: 1.2.7 	- Changed time threshold to have null default for backwards compatibility. Added duration param passed back in events, and refactored how time is handled.
*
* $Date: 2012-05-06 (Tues, 05 June 2012) $
* $version: 1.2.8 	- Added the possibility to return a value like null or false in the trigger callback. In that way we can control when the touch start/move should take effect or not (simply by returning in some cases return null; or return false;) This effects the ontouchstart/ontouchmove event.
*
* $Date: 2012-06-06 (Wed, 06 June 2012) $
* $version: 1.3.0 	- Refactored whole plugin to allow for methods to be executed, as well as exposed defaults for user override. Added 'enable', 'disable', and 'destroy' methods
*
* $Date: 2012-05-06 (Fri, 05 June 2012) $
* $version: 1.3.1 	- Bug fixes  - bind() with false as last argument is no longer supported in jQuery 1.6, also, if you just click, the duration is now returned correctly.
*
* $Date: 2012-29-07 (Sun, 29 July 2012) $
* $version: 1.3.2	- Added fallbackToMouseEvents option to NOT capture mouse events on non touch devices.
* 			- Added "all" fingers value to the fingers property, so any combination of fingers triggers the swipe, allowing event handlers to check the finger count
*
* $Date: 2012-09-08 (Thurs, 9 Aug 2012) $
* $version: 1.3.3	- Code tidy prep for minefied version
*
* $Date: 2012-04-10 (wed, 4 Oct 2012) $
* $version: 1.4.0	- Added pinch support, pinchIn and pinchOut
*
* $Date: 2012-11-10 (Thurs, 11 Oct 2012) $
* $version: 1.5.0	- Added excludedElements, a jquery selector that specifies child elements that do NOT trigger swipes. By default, this is one select that removes all form, input select, button and anchor elements.
*
* $Date: 2012-22-10 (Mon, 22 Oct 2012) $
* $version: 1.5.1	- Fixed bug with jQuery 1.8 and trailing comma in excludedElements
*					- Fixed bug with IE and eventPreventDefault()
* $Date: 2013-01-12 (Fri, 12 Jan 2013) $
* $version: 1.6.0	- Fixed bugs with pinching, mainly when both pinch and swipe enabled, as well as adding time threshold for multifinger gestures, so releasing one finger beofre the other doesnt trigger as single finger gesture.
*					- made the demo site all static local HTML pages so they can be run locally by a developer
*					- added jsDoc comments and added documentation for the plugin	
*					- code tidy
*					- added triggerOnTouchLeave property that will end the event when the user swipes off the element.
* $Date: 2013-03-23 (Sat, 23 Mar 2013) $
* $version: 1.6.1	- Added support for ie8 touch events
* $version: 1.6.2	- Added support for events binding with on / off / bind in jQ for all callback names.
*                   - Deprecated the 'click' handler in favour of tap.
*                   - added cancelThreshold property
*                   - added option method to update init options at runtime
* $version 1.6.3    - added doubletap, longtap events and longTapThreshold, doubleTapThreshold property
*
* $Date: 2013-04-04 (Thurs, 04 April 2013) $
* $version 1.6.4    - Fixed bug with cancelThreshold introduced in 1.6.3, where swipe status no longer fired start event, and stopped once swiping back.
*
* $Date: 2013-08-24 (Sat, 24 Aug 2013) $
* $version 1.6.5    - Merged a few pull requests fixing various bugs, added AMD support.
*
* $Date: 2014-06-04 (Wed, 04 June 2014) $
* $version 1.6.6 	- Merge of pull requests.
*    				- IE10 touch support 
*    				- Only prevent default event handling on valid swipe
*    				- Separate license/changelog comment
*    				- Detect if the swipe is valid at the end of the touch event.
*    				- Pass fingerdata to event handlers. 
*    				- Add 'hold' gesture 
*    				- Be more tolerant about the tap distance
*    				- Typos and minor fixes
*/

(function(e){typeof define=="function"&&define.amd&&define.amd.jQuery?define(["jquery"],e):e(jQuery)})(function(e){function L(t){return t&&t.allowPageScroll===undefined&&(t.swipe!==undefined||t.swipeStatus!==undefined)&&(t.allowPageScroll=u),t.click!==undefined&&t.tap===undefined&&(t.tap=t.click),t||(t={}),t=e.extend({},e.fn.swipe.defaults,t),this.each(function(){var n=e(this),r=n.data(C);r||(r=new A(this,t),n.data(C,r))})}function A(d,k){function nt(t){if(jt())return;if(e(t.target).closest(k.excludedElements,z).length>0)return;var n=t.originalEvent?t.originalEvent:t,r,i=x?n.touches[0]:n;W=b,x?X=n.touches.length:t.preventDefault(),P=0,H=null,R=null,B=0,j=0,F=0,I=1,q=0,V=Ut(),U=Xt(),Ht();if(!x||X===k.fingers||k.fingers===g||gt()){It(0,i),J=en(),X==2&&(It(1,n.touches[1]),j=F=Jt(V[0].start,V[1].start));if(k.swipeStatus||k.pinchStatus)r=ft(n,W)}else r=!1;return r===!1?(W=S,ft(n,W),r):(k.hold&&(et=setTimeout(e.proxy(function(){z.trigger("hold",[n.target]),k.hold&&(r=k.hold.call(z,n,n.target))},this),k.longTapThreshold)),Ft(!0),null)}function rt(e){var t=e.originalEvent?e.originalEvent:e;if(W===E||W===S||Bt())return;var n,r=x?t.touches[0]:t,i=qt(r);K=en(),x&&(X=t.touches.length),k.hold&&clearTimeout(et),W=w,X==2&&(j==0?(It(1,t.touches[1]),j=F=Jt(V[0].start,V[1].start)):(qt(t.touches[1]),F=Jt(V[0].end,V[1].end),R=Qt(V[0].end,V[1].end)),I=Kt(j,F),q=Math.abs(j-F));if(X===k.fingers||k.fingers===g||!x||gt()){H=Zt(i.start,i.end),vt(e,H),P=Gt(i.start,i.end),B=$t(),zt(H,P);if(k.swipeStatus||k.pinchStatus)n=ft(t,W);if(!k.triggerOnTouchEnd||k.triggerOnTouchLeave){var s=!0;if(k.triggerOnTouchLeave){var o=tn(this);s=nn(i.end,o)}!k.triggerOnTouchEnd&&s?W=at(w):k.triggerOnTouchLeave&&!s&&(W=at(E)),(W==S||W==E)&&ft(t,W)}}else W=S,ft(t,W);n===!1&&(W=S,ft(t,W))}function it(e){var t=e.originalEvent;return x&&t.touches.length>0?(Pt(),!0):(Bt()&&(X=G),K=en(),B=$t(),ht()||!ct()?(W=S,ft(t,W)):k.triggerOnTouchEnd||k.triggerOnTouchEnd==0&&W===w?(e.preventDefault(),W=E,ft(t,W)):!k.triggerOnTouchEnd&&Tt()?(W=E,lt(t,W,c)):W===w&&(W=S,ft(t,W)),Ft(!1),null)}function st(){X=0,K=0,J=0,j=0,F=0,I=1,Ht(),Ft(!1)}function ot(e){var t=e.originalEvent;k.triggerOnTouchLeave&&(W=at(E),ft(t,W))}function ut(){z.unbind(A,nt),z.unbind(D,st),z.unbind(O,rt),z.unbind(M,it),_&&z.unbind(_,ot),Ft(!1)}function at(e){var t=e,n=dt(),r=ct(),i=ht();return!n||i?t=S:r&&e==w&&(!k.triggerOnTouchEnd||k.triggerOnTouchLeave)?t=E:!r&&e==E&&k.triggerOnTouchLeave&&(t=S),t}function ft(e,t){var n=undefined;return Et()||wt()?n=lt(e,t,f):(yt()||gt())&&n!==!1&&(n=lt(e,t,l)),_t()&&n!==!1?n=lt(e,t,h):Dt()&&n!==!1?n=lt(e,t,p):Mt()&&n!==!1&&(n=lt(e,t,c)),t===S&&st(e),t===E&&(x?e.touches.length==0&&st(e):st(e)),n}function lt(u,a,d){var v=undefined;if(d==f){z.trigger("swipeStatus",[a,H||null,P||0,B||0,X,V]);if(k.swipeStatus){v=k.swipeStatus.call(z,u,a,H||null,P||0,B||0,X,V);if(v===!1)return!1}if(a==E&&bt()){z.trigger("swipe",[H,P,B,X,V]);if(k.swipe){v=k.swipe.call(z,u,H,P,B,X,V);if(v===!1)return!1}switch(H){case t:z.trigger("swipeLeft",[H,P,B,X,V]),k.swipeLeft&&(v=k.swipeLeft.call(z,u,H,P,B,X,V));break;case n:z.trigger("swipeRight",[H,P,B,X,V]),k.swipeRight&&(v=k.swipeRight.call(z,u,H,P,B,X,V));break;case r:z.trigger("swipeUp",[H,P,B,X,V]),k.swipeUp&&(v=k.swipeUp.call(z,u,H,P,B,X,V));break;case i:z.trigger("swipeDown",[H,P,B,X,V]),k.swipeDown&&(v=k.swipeDown.call(z,u,H,P,B,X,V))}}}if(d==l){z.trigger("pinchStatus",[a,R||null,q||0,B||0,X,I,V]);if(k.pinchStatus){v=k.pinchStatus.call(z,u,a,R||null,q||0,B||0,X,I,V);if(v===!1)return!1}if(a==E&&mt())switch(R){case s:z.trigger("pinchIn",[R||null,q||0,B||0,X,I,V]),k.pinchIn&&(v=k.pinchIn.call(z,u,R||null,q||0,B||0,X,I,V));break;case o:z.trigger("pinchOut",[R||null,q||0,B||0,X,I,V]),k.pinchOut&&(v=k.pinchOut.call(z,u,R||null,q||0,B||0,X,I,V))}}if(d==c){if(a===S||a===E)clearTimeout(Z),clearTimeout(et),Nt()&&!Lt()?(Y=en(),Z=setTimeout(e.proxy(function(){Y=null,z.trigger("tap",[u.target]),k.tap&&(v=k.tap.call(z,u,u.target))},this),k.doubleTapThreshold)):(Y=null,z.trigger("tap",[u.target]),k.tap&&(v=k.tap.call(z,u,u.target)))}else if(d==h){if(a===S||a===E)clearTimeout(Z),Y=null,z.trigger("doubletap",[u.target]),k.doubleTap&&(v=k.doubleTap.call(z,u,u.target))}else d==p&&(a===S||a===E)&&(clearTimeout(Z),Y=null,z.trigger("longtap",[u.target]),k.longTap&&(v=k.longTap.call(z,u,u.target)));return v}function ct(){var e=!0;return k.threshold!==null&&(e=P>=k.threshold),e}function ht(){var e=!1;return k.cancelThreshold!==null&&H!==null&&(e=Wt(H)-P>=k.cancelThreshold),e}function pt(){return k.pinchThreshold!==null?q>=k.pinchThreshold:!0}function dt(){var e;return k.maxTimeThreshold?B>=k.maxTimeThreshold?e=!1:e=!0:e=!0,e}function vt(e,s){if(k.allowPageScroll===u||gt())e.preventDefault();else{var o=k.allowPageScroll===a;switch(s){case t:(k.swipeLeft&&o||!o&&k.allowPageScroll!=v)&&e.preventDefault();break;case n:(k.swipeRight&&o||!o&&k.allowPageScroll!=v)&&e.preventDefault();break;case r:(k.swipeUp&&o||!o&&k.allowPageScroll!=m)&&e.preventDefault();break;case i:(k.swipeDown&&o||!o&&k.allowPageScroll!=m)&&e.preventDefault()}}}function mt(){var e=St(),t=xt(),n=pt();return e&&t&&n}function gt(){return!!(k.pinchStatus||k.pinchIn||k.pinchOut)}function yt(){return!!mt()&&!!gt()}function bt(){var e=dt(),t=ct(),n=St(),r=xt(),i=ht(),s=!i&&r&&n&&t&&e;return s}function wt(){return!!(k.swipe||k.swipeStatus||k.swipeLeft||k.swipeRight||k.swipeUp||k.swipeDown)}function Et(){return!!bt()&&!!wt()}function St(){return X===k.fingers||k.fingers===g||!x}function xt(){return V[0].end.x!==0}function Tt(){return!!k.tap}function Nt(){return!!k.doubleTap}function Ct(){return!!k.longTap}function kt(){if(Y==null)return!1;var e=en();return Nt()&&e-Y<=k.doubleTapThreshold}function Lt(){return kt()}function At(){return(X===1||!x)&&(isNaN(P)||P<k.threshold)}function Ot(){return B>k.longTapThreshold&&P<y}function Mt(){return!!At()&&!!Tt()}function _t(){return!!kt()&&!!Nt()}function Dt(){return!!Ot()&&!!Ct()}function Pt(){Q=en(),G=event.touches.length+1}function Ht(){Q=0,G=0}function Bt(){var e=!1;if(Q){var t=en()-Q;t<=k.fingerReleaseThreshold&&(e=!0)}return e}function jt(){return z.data(C+"_intouch")===!0}function Ft(e){e===!0?(z.bind(O,rt),z.bind(M,it),_&&z.bind(_,ot)):(z.unbind(O,rt,!1),z.unbind(M,it,!1),_&&z.unbind(_,ot,!1)),z.data(C+"_intouch",e===!0)}function It(e,t){var n=t.identifier!==undefined?t.identifier:0;return V[e].identifier=n,V[e].start.x=V[e].end.x=t.pageX||t.clientX,V[e].start.y=V[e].end.y=t.pageY||t.clientY,V[e]}function qt(e){var t=e.identifier!==undefined?e.identifier:0,n=Rt(t);return n.end.x=e.pageX||e.clientX,n.end.y=e.pageY||e.clientY,n}function Rt(e){for(var t=0;t<V.length;t++)if(V[t].identifier==e)return V[t]}function Ut(){var e=[];for(var t=0;t<=5;t++)e.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0});return e}function zt(e,t){t=Math.max(t,Wt(e)),U[e].distance=t}function Wt(e){return U[e]?U[e].distance:undefined}function Xt(){var e={};return e[t]=Vt(t),e[n]=Vt(n),e[r]=Vt(r),e[i]=Vt(i),e}function Vt(e){return{direction:e,distance:0}}function $t(){return K-J}function Jt(e,t){var n=Math.abs(e.x-t.x),r=Math.abs(e.y-t.y);return Math.round(Math.sqrt(n*n+r*r))}function Kt(e,t){var n=t/e*1;return n.toFixed(2)}function Qt(){return I<1?o:s}function Gt(e,t){return Math.round(Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)))}function Yt(e,t){var n=e.x-t.x,r=t.y-e.y,i=Math.atan2(r,n),s=Math.round(i*180/Math.PI);return s<0&&(s=360-Math.abs(s)),s}function Zt(e,s){var o=Yt(e,s);return o<=45&&o>=0?t:o<=360&&o>=315?t:o>=135&&o<=225?n:o>45&&o<135?i:r}function en(){var e=new Date;return e.getTime()}function tn(t){t=e(t);var n=t.offset(),r={left:n.left,right:n.left+t.outerWidth(),top:n.top,bottom:n.top+t.outerHeight()};return r}function nn(e,t){return e.x>t.left&&e.x<t.right&&e.y>t.top&&e.y<t.bottom}var L=x||N||!k.fallbackToMouseEvents,A=L?N?T?"MSPointerDown":"pointerdown":"touchstart":"mousedown",O=L?N?T?"MSPointerMove":"pointermove":"touchmove":"mousemove",M=L?N?T?"MSPointerUp":"pointerup":"touchend":"mouseup",_=L?null:"mouseleave",D=N?T?"MSPointerCancel":"pointercancel":"touchcancel",P=0,H=null,B=0,j=0,F=0,I=1,q=0,R=0,U=null,z=e(d),W="start",X=0,V=null,J=0,K=0,Q=0,G=0,Y=0,Z=null,et=null;try{z.bind(A,nt),z.bind(D,st)}catch(tt){e.error("events not supported "+A+","+D+" on jQuery.swipe")}this.enable=function(){return z.bind(A,nt),z.bind(D,st),z},this.disable=function(){return ut(),z},this.destroy=function(){return ut(),z.data(C,null),z},this.option=function(t,n){if(k[t]!==undefined){if(n===undefined)return k[t];k[t]=n}else e.error("Option "+t+" does not exist on jQuery.swipe.options");return null}}var t="left",n="right",r="up",i="down",s="in",o="out",u="none",a="auto",f="swipe",l="pinch",c="tap",h="doubletap",p="longtap",d="hold",v="horizontal",m="vertical",g="all",y=10,b="start",w="move",E="end",S="cancel",x="ontouchstart"in window,T=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,N=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,C="TouchSwipe",k={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:!0,triggerOnTouchLeave:!1,allowPageScroll:"auto",fallbackToMouseEvents:!0,excludedElements:"label, button, input, select, textarea, a, .noSwipe"};e.fn.swipe=function(t){var n=e(this),r=n.data(C);if(r&&typeof t=="string"){if(r[t])return r[t].apply(this,Array.prototype.slice.call(arguments,1));e.error("Method "+t+" does not exist on jQuery.swipe")}else if(!r&&(typeof t=="object"||!t))return L.apply(this,arguments);return n},e.fn.swipe.defaults=k,e.fn.swipe.phases={PHASE_START:b,PHASE_MOVE:w,PHASE_END:E,PHASE_CANCEL:S},e.fn.swipe.directions={LEFT:t,RIGHT:n,UP:r,DOWN:i,IN:s,OUT:o},e.fn.swipe.pageScroll={NONE:u,HORIZONTAL:v,VERTICAL:m,AUTO:a},e.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:g}});