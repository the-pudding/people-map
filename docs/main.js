parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"or4r":[function(require,module,exports) {
var global = arguments[3];
var t=arguments[3],e="Expected a function",n=NaN,r="[object Symbol]",i=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,f=/^0o[0-7]+$/i,c=parseInt,a="object"==typeof t&&t&&t.Object===Object&&t,s="object"==typeof self&&self&&self.Object===Object&&self,v=a||s||Function("return this")(),l=Object.prototype,p=l.toString,b=Math.max,m=Math.min,y=function(){return v.Date.now()};function d(t,n,r){var i,o,u,f,c,a,s=0,v=!1,l=!1,p=!0;if("function"!=typeof t)throw new TypeError(e);function d(e){var n=i,r=o;return i=o=void 0,s=e,f=t.apply(r,n)}function g(t){var e=t-a;return void 0===a||e>=n||e<0||l&&t-s>=u}function O(){var t=y();if(g(t))return x(t);c=setTimeout(O,function(t){var e=n-(t-a);return l?m(e,u-(t-s)):e}(t))}function x(t){return c=void 0,p&&i?d(t):(i=o=void 0,f)}function T(){var t=y(),e=g(t);if(i=arguments,o=this,a=t,e){if(void 0===c)return function(t){return s=t,c=setTimeout(O,n),v?d(t):f}(a);if(l)return c=setTimeout(O,n),d(a)}return void 0===c&&(c=setTimeout(O,n)),f}return n=h(n)||0,j(r)&&(v=!!r.leading,u=(l="maxWait"in r)?b(h(r.maxWait)||0,n):u,p="trailing"in r?!!r.trailing:p),T.cancel=function(){void 0!==c&&clearTimeout(c),s=0,i=a=o=c=void 0},T.flush=function(){return void 0===c?f:x(y())},T}function j(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function g(t){return!!t&&"object"==typeof t}function O(t){return"symbol"==typeof t||g(t)&&p.call(t)==r}function h(t){if("number"==typeof t)return t;if(O(t))return n;if(j(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=j(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var r=u.test(t);return r||f.test(t)?c(t.slice(2),r?2:8):o.test(t)?n:+t}module.exports=d;
},{}],"WEtf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e={android:()=>navigator.userAgent.match(/Android/i),blackberry:()=>navigator.userAgent.match(/BlackBerry/i),ios:()=>navigator.userAgent.match(/iPhone|iPad|iPod/i),opera:()=>navigator.userAgent.match(/Opera Mini/i),windows:()=>navigator.userAgent.match(/IEMobile/i),any:()=>e.android()||e.blackberry()||e.ios()||e.opera()||e.windows()};var a=e;exports.default=a;
},{}],"TAPd":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;let e=null;function t(){}function o(t){e.setLayoutProperty(t,"text-field",["format",["get","name_clean"],{"font-scale":1},"\n",{},["get","city"],{"font-scale":.75,"text-font":["literal",["Atlas Grotesk Black","Roboto Mono Regular"]]}])}function a(){["small","med-small","med"].forEach(o)}function n(){mapboxgl.accessToken="pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2p2Z3gxc2trMGNlaDQzb2NwamRtZW5reSJ9.EXF5uVYDl1EO1HLnWOsi5A",(e=new mapboxgl.Map({container:"map",style:"mapbox://styles/dock4242/cjv6zwo1e3mdx1fpmeybn7crm?fresh=true",center:[-98.57,39.82],zoom:3})).on("load",a)}function l(){n()}var r={init:l,resize:t};exports.default=r;
},{}],"v9Q8":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e=[{image:"2018_02_stand-up",url:"2018/02/stand-up",hed:"The Structure of Stand-Up Comedy"},{image:"2018_04_birthday-paradox",url:"2018/04/birthday-paradox",hed:"The Birthday Paradox Experiment"},{image:"2018_11_boy-bands",url:"2018/11/boy-bands",hed:"Internet Boy Band Database"},{image:"2018_08_pockets",url:"2018/08/pockets",hed:"Women’s Pockets are Inferior"}];let t=null;function n(e,t){const n=document.getElementsByTagName("script")[0],o=document.createElement("script");return o.src=e,o.async=!0,n.parentNode.insertBefore(o,n),t&&"function"==typeof t&&(o.onload=t),o}function o(t){const n=new XMLHttpRequest,o=`https://pudding.cool/assets/data/stories.json?v=${Date.now()}`;n.open("GET",o,!0),n.onload=(()=>{if(n.status>=200&&n.status<400){const e=JSON.parse(n.responseText);t(e)}else t(e)}),n.onerror=(()=>t(e)),n.send()}function s(e){return`\n\t<a class='footer-recirc__article' href='https://pudding.cool/${e.url}' target='_blank'>\n\t\t<img class='article__img' src='https://pudding.cool/common/assets/thumbnails/640/${e.image}.jpg' alt='${e.hed}'>\n\t\t<p class='article__headline'>${e.hed}</p>\n\t</a>\n\t`}function r(){const e=window.location.href,n=t.filter(t=>!e.includes(t.url)).slice(0,4).map(s).join("");d3.select(".pudding-footer .footer-recirc__articles").html(n)}function a(){!function(e,t,n){let o;const s=e.getElementsByTagName(t)[0];e.getElementById(n)||((o=e.createElement(t)).id=n,o.src="//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7",s.parentNode.insertBefore(o,s))}(document,"script","facebook-jssdk"),n("https://platform.twitter.com/widgets.js")}function c(){o(e=>{t=e,r(),a()})}var i={init:c};exports.default=i;
},{}],"epB2":[function(require,module,exports) {
"use strict";var e=l(require("lodash.debounce")),s=l(require("./utils/is-mobile")),i=l(require("./graphic")),t=l(require("./footer"));function l(e){return e&&e.__esModule?e:{default:e}}const c=d3.select("body");let d=0;function n(){const e=c.node().offsetWidth;d!==e&&(d=e,i.default.resize())}function o(){if(c.select("header").classed("is-sticky")){const e=c.select(".header__menu"),s=c.select(".header__toggle");s.on("click",()=>{const i=e.classed("is-visible");e.classed("is-visible",!i),s.classed("is-visible",!i)})}}function r(){c.classed("is-mobile",s.default.any()),window.addEventListener("resize",(0,e.default)(n,150)),o(),i.default.init()}r();
},{"lodash.debounce":"or4r","./utils/is-mobile":"WEtf","./graphic":"TAPd","./footer":"v9Q8"}]},{},["epB2"], null)