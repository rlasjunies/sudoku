// // upatde 11 2018
// // from https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

// ///@ts-ignore
// // Opera 8.0+
// const isOpera = (!!(window as any).opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// // Firefox 1.0+
// ///@ts-ignore
// const isFirefox = typeof InstallTrigger !== 'undefined';

// // Safari 3.0+ "[object HTMLElementConstructor]" 
// ///@ts-ignore
// const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// // Internet Explorer 6-11
// ///@ts-ignore
// const isIE = /*@cc_on!@*/false || !!document.documentMode;

// // Edge 20+
// ///@ts-ignore
// const isEdge = !isIE && !!window.StyleMedia;

// // Chrome 1+
// ///@ts-ignore
// const isChrome = !!window.chrome && !!window.chrome.webstore;

// // Blink engine detection
// ///@ts-ignore
// const isBlink = (isChrome || isOpera) && !!window.CSS;


// // inspire by https://www.sitepoint.com/css3-animation-javascript-event-handlers/
// function eventPrefix(event:string){
//   const pfx = ["webkit", "moz", "MS", "o", ""];

//   isChrome
// }

// let prefix:string = isPrefix();
// function isPrefix():string{
//   if (prefix!=null) return prefix;

//   if(isOpera) return "o";
//   if(isFirefox) return "moz";
//   if(isSafari) return "webkit";
//   if(isIE) return "MS";

// }