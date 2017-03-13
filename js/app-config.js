require.config({
    paths: {
        TweenLite: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenLite.min',
        TimelineLite: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TimelineLite.min',
        TweenMax: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min',
        TimelineMax: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TimelineMax.min',
        EasePack: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/easing/EasePack.min',
        BezierPlugin: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/plugins/BezierPlugin.min',
        ScrollMagic: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min',
        ScrollMagicAddIndicators: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/debug.addIndicators.min',
        ScrollMagicJquery: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/jquery.ScrollMagic.min',
        ScrollMagicGSAP: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.min',
        'slick-carousel': 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.8/slick.min',
        JKSizeClassEventHandler: "ford-gt/bower_components/JKSizeClassEventHandler/js/JKSizeClassEventHandler.min",
    	SupportsContinuousScrollEvents: "ford-gt/bower_components/SupportsContinuousScrollEvents/js/SupportsContinuousScrollEvents.min",
        d3: "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.12/d3.min",
        'fastclick': "ford-gtcopy/bower_components/fastclick/lib/fastclick",

        'utils':PaidPost.assets + "js/lib/utils",
        'cjsLoader':PaidPost.assets + "js/lib/cjsLoader"

        // 'createjs':'https://code.createjs.com/createjs-2015.11.26.min',
    },
    packages: [

    ],
    shim: {
        // 'ani_name':['createjs']
    }
});

var ua = window.navigator.userAgent.toLowerCase();
window.platform = {
    isAndroid412: ua.match(/android 4\.1\.2/i) !== null,
    isDuos: ua.match(/gt\-s7562/i) !== null,
    isI9300: ua.match(/gt\-i9300/i) !== null,
    isI9500: ua.match(/gt\-i9500/i) !== null,
    hasTouch: ('ontouchstart' in window),
    isiPod: ua.match(/ipod/i) !== null,
    isiPad: ua.match(/ipad/i) !== null,
    isiPhone: ua.match(/iphone/i) !== null,
    isAndroid: ua.match(/android/i) !== null,
    isBustedAndroid: ua.match(/android 2\.[12]/) !== null,
    isIE: window.navigator.appName.indexOf("Microsoft") != -1,
    isIE10: ua.match(/msie 10/) !== null,
    isIE11: ua.match(/trident.*rv\:11\./) !== null,
    isEdge: ua.indexOf('edge/')>0,
    isChrome: ua.match(/Chrome/gi) !== null,
    isFirefox: ua.match(/firefox/gi) !== null,
    isSafari: ua.indexOf('safari') != -1 && ua.indexOf('chrome') == -1,
    isWebkit: ua.match(/webkit/gi) !== null,
    isGecko: ua.match(/gecko/gi) !== null,
    isOpera: ua.match(/opera/gi) !== null,
    isMac: ua.match('mac') !== null,
    isIOS8: ua.match(/(iphone|ipod|ipad).* os 8_/) !== null,
    supportsSvg: !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect
}
platform.isMobile = platform.isiPhone || platform.isAndroid;
platform.isTablet = platform.isiPad;
platform.isDesktop = !(platform.isMobile || platform.isTablet);
platform.isIE = platform.isIE10 || platform.isIE11 || platform.isEdge;
platform.isIos = platform.isiPhone || platform.isiPad;

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


var G = G || {};
// var projectDetails = 'Ford GT - ',
// deviceType = (platform.isMobile) ? 'mobile' : 'desktop';

// Category, Action, Label, Value
// Quiz Response
// Click
// Quiz Question #
// Correct Boolean
G.track = function(category, action, opt_label, opt_value, opt_noninteraction) {
    if(typeof window.ga !== "undefined") {
        console.log('ga.track :: send, track,', category, action, opt_label, opt_value);

        // ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
        window.ga('send','event', category, action, opt_label, opt_value);
    }
};
window.G = G;