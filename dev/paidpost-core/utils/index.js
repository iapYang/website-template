// TODO : ADD SIZECLASS EVENT HANDLER FUNCTION(S)

// TODO : ADD TRACKING FUNCTION(S)

export function CheckForTouch() {
    var hasTouch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    var touchmessage = hasTouch ? "touchevents" : "no-touchevents";
    return touchmessage;
}

// Test from Modernizr: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
export function HasTouch() {
    return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
}

export function ISTouchDevice(device) {
    device = device || 'any';
    var response;
    switch (device) {
        case "Android":
            response = navigator.userAgent.match(/Android/i);
            break;
        case "BlackBerry":
            response = navigator.userAgent.match(/BlackBerry/i);
            break;
        case "iOS":
            response = navigator.userAgent.match(/iPhone|iPad|iPod/i);
            break;
        case "CriOS":
            response = navigator.userAgent.match(/CriOS/i);
            break;
        case "Opera":
            response = navigator.userAgent.match(/Opera Mini/i);
            break;
        case "WindowsMobile":
            response = navigator.userAgent.match(/IEMobile/i);
            break;
        case "any":
            response = (this.isTouchDevice('Android') || this.isTouchDevice('BlackBerry') || this.isTouchDevice('iOS') || this.isTouchDevice('Opera') || this.isTouchDevice('WindowsMobile'));
            break;
    }

    return response;
}

// IS MOBILE LAYOUT?
export function ISMobile() {
    return (window.matchMedia("(max-width: 767px)").matches) ? true : false;
}

//IS TABLET LAYOUT?
export function ISTablet(orientation) {
    if (orientation === null || typeof orientation === 'undefined') {
        return (window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1024px)").matches) ? true : false;
    } else if (orientation === "portrait") {
        return (window.matchMedia("(min-width: 768px)").matches && !window.matchMedia("(min-width: 1024px)").matches) ? true : false;
    } else if (orientation === "landscape") {
        return (window.matchMedia("(min-width: 1024px)").matches && !window.matchMedia("(min-width: 1080px)").matches) ? true : false;
    }
}
