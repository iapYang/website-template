(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory();
	} else {
		// Browser global
		factory();
	}
}(this, function() {
    var ua = window.navigator.userAgent.toLowerCase();
    var html = document.getElementsByTagName('html')[0];

    window.Platform = {
        isiPad: ua.match(/ipad/i) !== null,
        isNexus7: ua.match(/Nexus 7/gi) !== null,
        isMobile: ua.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i) !== null && ua.match(/Mobile/i) !== null,
        isiPhone: ua.match(/iphone/i) !== null,
        isAndroid: ua.match(/android/i) !== null,
        isS4: ua.match(/(gt\-i95)|(sph\-l720)/i) !== null,
        isS5: ua.match(/sm\-g900/i) !== null,
        isIE: ua.match(/(msie|trident)/i) !==null, // /(msie|trident)/i.test(navigator.userAgent),
        isIE11: ua.match(/Trident\/7\.0/i) !== null,
        isEdge: ua.match(/edge/i) !== null,
        isChrome: ua.match(/Chrome/gi) !== null,
        isFirefox: ua.match(/firefox/gi) !== null,
        hasTouch: ('ontouchstart' in window),
    };

    window.Platform.isAndroidPad = Platform.isAndroid && !Platform.isMobile;
    window.Platform.isTablet = Platform.isiPad || Platform.isAndroidPad;
    window.Platform.isDesktop = !(Platform.isMobile || Platform.isTablet);
    window.Platform.isIOS = Platform.isiPad || Platform.isiPhone;
    window.Platform.isSafari = Platform.isDesktop && (!Platform.isIE) && (!Platform.isChrome) && (!Platform.isFirefox);


    if (Platform.isDesktop) html.classList.add('desktop');
    if (Platform.isIE) html.classList.add('ie');
    if (!Platform.isIE) html.classList.add('not-ie');
    if (Platform.isIE11) html.classList.add('ie11');
    if (Platform.isEdge) html.classList.add('edge');
    if (!Platform.isEdge) html.classList.add('not-edge');
    if (Platform.isChrome) html.classList.add('chrome');
    if (Platform.isFirefox) html.classList.add('firefox');
    if (Platform.isSafari) html.classList.add('safari');

    if (Platform.isTablet) html.classList.add('tablet');
    if (Platform.isiPad) html.classList.add('ipad');
    if (Platform.isAndroidPad) html.classList.add('android-pad');
    if (Platform.isNexus7) html.classList.add('nexus7');

    if (Platform.isMobile) html.classList.add('mobile');
    if (Platform.isiPhone) html.classList.add('iphone');
    if (Platform.isS4) html.classList.add('s4');
    if (Platform.isS5) html.classList.add('s5');

    if (Platform.isIOS) html.classList.add('ios');
    if (Platform.isAndroid) html.classList.add('android');

    if (Platform.hasTouch) html.classList.add('has-touch');
    if (!Platform.hasTouch) html.classList.add('no-touch');



    return window.Platform;
}));
