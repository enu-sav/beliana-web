!function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=91)}([function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},function(t,n,e){var r=e(16)("wks"),o=e(14),i=e(0).Symbol,a="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=a&&i[t]||(a?i:o)("Symbol."+t))}).store=r},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,e){var r=e(2);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,n,e){t.exports=!e(5)((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n,e){var r=e(8),o=e(18);t.exports=e(4)?function(t,n,e){return r.f(t,n,o(1,e))}:function(t,n,e){return t[n]=e,t}},function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},function(t,n,e){var r=e(3),o=e(25),i=e(20),a=Object.defineProperty;n.f=e(4)?Object.defineProperty:function(t,n,e){if(r(t),n=i(n,!0),r(e),o)try{return a(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},function(t,n,e){var r=e(0),o=e(6),i=e(13),a=e(14)("src"),c=e(31),s=(""+c).split("toString");e(11).inspectSource=function(t){return c.call(t)},(t.exports=function(t,n,e,c){var u="function"==typeof e;u&&(i(e,"name")||o(e,"name",n)),t[n]!==e&&(u&&(i(e,a)||o(e,a,t[n]?""+t[n]:s.join(String(n)))),t===r?t[n]=e:c?t[n]?t[n]=e:o(t,n,e):(delete t[n],o(t,n,e)))})(Function.prototype,"toString",(function(){return"function"==typeof this&&this[a]||c.call(this)}))},function(t,n,e){var r=e(12),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,n){var e=t.exports={version:"2.6.12"};"number"==typeof __e&&(__e=e)},function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},function(t,n){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,e){var r=e(11),o=e(0),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,n){return i[t]||(i[t]=void 0!==n?n:{})})("versions",[]).push({version:r.version,mode:e(21)?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},function(t,n,e){var r=e(0),o=e(11),i=e(6),a=e(9),c=e(19),s=function(t,n,e){var u,l,f,p,h=t&s.F,d=t&s.G,b=t&s.S,v=t&s.P,y=t&s.B,g=d?r:b?r[n]||(r[n]={}):(r[n]||{}).prototype,m=d?o:o[n]||(o[n]={}),w=m.prototype||(m.prototype={});for(u in d&&(e=n),e)f=((l=!h&&g&&void 0!==g[u])?g:e)[u],p=y&&l?c(f,r):v&&"function"==typeof f?c(Function.call,f):f,g&&a(g,u,f,t&s.U),m[u]!=f&&i(m,u,p),v&&w[u]!=f&&(w[u]=f)};r.core=o,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,e){var r=e(26);t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,o){return t.call(n,e,r,o)}}return function(){return t.apply(n,arguments)}}},function(t,n,e){var r=e(2);t.exports=function(t,n){if(!r(t))return t;var e,o;if(n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;if("function"==typeof(e=t.valueOf)&&!r(o=e.call(t)))return o;if(!n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,n){t.exports=!1},function(t,n,e){var r=e(15);t.exports=function(t){return Object(r(t))}},,,function(t,n,e){t.exports=!e(4)&&!e(5)((function(){return 7!=Object.defineProperty(e(30)("div"),"a",{get:function(){return 7}}).a}))},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},,,,function(t,n,e){var r=e(2),o=e(0).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,n,e){t.exports=e(16)("native-function-to-string",Function.toString)},function(t,n,e){var r=e(7);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},,,,,,function(t,n,e){var r=e(7);t.exports=Array.isArray||function(t){return"Array"==r(t)}},,,,,,,,,,,,,function(t,n,e){var r=e(19),o=e(32),i=e(22),a=e(10),c=e(52);t.exports=function(t,n){var e=1==t,s=2==t,u=3==t,l=4==t,f=6==t,p=5==t||f,h=n||c;return function(n,c,d){for(var b,v,y=i(n),g=o(y),m=r(c,d,3),w=a(g.length),x=0,_=e?h(n,w):s?h(n,0):void 0;w>x;x++)if((p||x in g)&&(v=m(b=g[x],x,y),t))if(e)_[x]=v;else if(v)switch(t){case 3:return!0;case 5:return b;case 6:return x;case 2:_.push(b)}else if(l)return!1;return f?-1:u||l?l:_}}},function(t,n,e){var r=e(53);t.exports=function(t,n){return new(r(t))(n)}},function(t,n,e){var r=e(2),o=e(38),i=e(1)("species");t.exports=function(t){var n;return o(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!o(n.prototype)||(n=void 0),r(n)&&null===(n=n[i])&&(n=void 0)),void 0===n?Array:n}},,,,,,,,,,,,function(t,n,e){var r=e(1)("unscopables"),o=Array.prototype;null==o[r]&&e(6)(o,r,{}),t.exports=function(t){o[r][t]=!0}},,,,,,,,,,,,,,,,,,,,,,,,,,function(t,n,e){"use strict";e.r(n);e(92);!function(t,n){n.behaviors.alphabetical_accessible_menu={attach:function(n,e){t(".accessible-alphabetical").accessibleMegaMenu({uuidPrefix:"accessible-alphabetical-menu",menuClass:"facet-inactive",topNavItemClass:"facet-item--expanded",panelClass:"facets-widget",panelGroupClass:"sub-nav",hoverClass:"hover",focusClass:"focus",openClass:"open"})}},n.behaviors.black_white={attach:function(e,r){var o=t(e).find(".wcag-icons .icon-black-white");"black-white"==(localStorage.getItem("black-white")||"normal")&&(t("html").addClass("black-white"),o.attr("aria-pressed",!0),o.attr("aria-label",n.t("wcag-accessible-version-of-the-site-is-turned-on"))),t(e).find(".wcag-icons").on("click",".wcag-black-white",(function(){t("html").hasClass("black-white")?(t("html").removeClass("black-white"),o.attr("aria-pressed",!1),o.attr("aria-label",n.t("wcag-accessible-version-of-the-site-is-turned-off")),localStorage.setItem("black-white","normal")):(t("html").addClass("black-white"),o.attr("aria-pressed",!0),o.attr("aria-label",n.t("wcag-accessible-version-of-the-site-is-turned-on")),localStorage.setItem("black-white","black-white"))}))}},n.behaviors.click_change_format_zoznam_tools={attach:function(e,r){t(".list-tools .truncate-button").on("click","li a",(function(){var e=t(this);e.hasClass("word-short")?(t(".views-element-container .heslo").each((function(){t(this).height()>120&&(t(this).addClass("truncate-wrapper"),t(this).children("#gradient").css("display","block"))})),e.parent().parent().parent().find(".label").attr("aria-label",n.t("wcag-display-options-the-beginning-of-the-password-is-set"))):(t(".views-element-container .heslo").removeClass("truncate-wrapper"),t(".views-element-container .heslo #gradient").css("display","none"),e.parent().parent().parent().find(".label").attr("aria-label",n.t("wcag-display-options-the-entire-password-is-set"))),t(".truncate-button .label").html(e.text()+'<b class="button"></b>'),localStorage.setItem("word_search_sort",e.attr("class"))})),t(".list-tools .sort-button").on("click","li",(function(){var n=t(this);t(".sort-button .label").html(n.text()+'<b class="button"></b>'),t(".sort-button").toggleClass("active"),localStorage.setItem("word_search_sort",n.attr("class"))}))}},n.behaviors.click_change_citation={attach:function(e,r){$word.on("click",".citation h3",(function(e){t(this).parent().hasClass("open")?(t(this).parent().removeClass("open"),t(this).parent().find("#dialog-desc").css("display","none"),t(this).attr("aria-expanded",!1),t(this).attr("aria-label",n.t("aria-label-section-citation-is-closed"))):(t(this).parent().removeClass("open"),t(this).parent().addClass("open"),t(this).parent().find("#dialog-desc").css("display","block"),t(this).attr("aria-expanded",!0),t(this).attr("aria-label",n.t("aria-label-section-citation-is-open")))}))}}}(jQuery,Drupal)},function(t,n,e){"use strict";var r=e(17),o=e(51)(5),i=!0;"find"in[]&&Array(1).find((function(){i=!1})),r(r.P+r.F*i,"Array",{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),e(65)("find")}]);