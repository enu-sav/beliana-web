!function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}__webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{enumerable:!0,get:getter})},__webpack_require__.r=function(exports){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.t=function(value,mode){if(1&mode&&(value=__webpack_require__(value)),8&mode)return value;if(4&mode&&"object"==typeof value&&value&&value.__esModule)return value;var ns=Object.create(null);if(__webpack_require__.r(ns),Object.defineProperty(ns,"default",{enumerable:!0,value:value}),2&mode&&"string"!=typeof value)for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module.default}:function getModuleExports(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=96)}([function(module,exports){var global=module.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=global)},function(module,exports){module.exports=function(it){return"object"==typeof it?null!==it:"function"==typeof it}},function(module,exports,__webpack_require__){var store=__webpack_require__(11)("wks"),uid=__webpack_require__(10),Symbol=__webpack_require__(0).Symbol,USE_SYMBOL="function"==typeof Symbol;(module.exports=function(name){return store[name]||(store[name]=USE_SYMBOL&&Symbol[name]||(USE_SYMBOL?Symbol:uid)("Symbol."+name))}).store=store},function(module,exports,__webpack_require__){module.exports=!__webpack_require__(4)((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},function(module,exports){module.exports=function(exec){try{return!!exec()}catch(e){return!0}}},function(module,exports,__webpack_require__){var dP=__webpack_require__(15),createDesc=__webpack_require__(20);module.exports=__webpack_require__(3)?function(object,key,value){return dP.f(object,key,createDesc(1,value))}:function(object,key,value){return object[key]=value,object}},function(module,exports,__webpack_require__){var isObject=__webpack_require__(1);module.exports=function(it){if(!isObject(it))throw TypeError(it+" is not an object!");return it}},function(module,exports){var core=module.exports={version:"2.6.12"};"number"==typeof __e&&(__e=core)},function(module,exports){var toString={}.toString;module.exports=function(it){return toString.call(it).slice(8,-1)}},function(module,exports,__webpack_require__){var toInteger=__webpack_require__(12),min=Math.min;module.exports=function(it){return it>0?min(toInteger(it),9007199254740991):0}},function(module,exports){var id=0,px=Math.random();module.exports=function(key){return"Symbol(".concat(void 0===key?"":key,")_",(++id+px).toString(36))}},function(module,exports,__webpack_require__){var core=__webpack_require__(7),global=__webpack_require__(0),store=global["__core-js_shared__"]||(global["__core-js_shared__"]={});(module.exports=function(key,value){return store[key]||(store[key]=void 0!==value?value:{})})("versions",[]).push({version:core.version,mode:__webpack_require__(21)?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},function(module,exports){var ceil=Math.ceil,floor=Math.floor;module.exports=function(it){return isNaN(it=+it)?0:(it>0?floor:ceil)(it)}},function(module,exports,__webpack_require__){var global=__webpack_require__(0),hide=__webpack_require__(5),has=__webpack_require__(18),SRC=__webpack_require__(10)("src"),$toString=__webpack_require__(27),TPL=(""+$toString).split("toString");__webpack_require__(7).inspectSource=function(it){return $toString.call(it)},(module.exports=function(O,key,val,safe){var isFunction="function"==typeof val;isFunction&&(has(val,"name")||hide(val,"name",key)),O[key]!==val&&(isFunction&&(has(val,SRC)||hide(val,SRC,O[key]?""+O[key]:TPL.join(String(key)))),O===global?O[key]=val:safe?O[key]?O[key]=val:hide(O,key,val):(delete O[key],hide(O,key,val)))})(Function.prototype,"toString",(function toString(){return"function"==typeof this&&this[SRC]||$toString.call(this)}))},function(module,exports){module.exports=function(it){if(null==it)throw TypeError("Can't call method on  "+it);return it}},function(module,exports,__webpack_require__){var anObject=__webpack_require__(6),IE8_DOM_DEFINE=__webpack_require__(24),toPrimitive=__webpack_require__(22),dP=Object.defineProperty;exports.f=__webpack_require__(3)?Object.defineProperty:function defineProperty(O,P,Attributes){if(anObject(O),P=toPrimitive(P,!0),anObject(Attributes),IE8_DOM_DEFINE)try{return dP(O,P,Attributes)}catch(e){}if("get"in Attributes||"set"in Attributes)throw TypeError("Accessors not supported!");return"value"in Attributes&&(O[P]=Attributes.value),O}},function(module,exports,__webpack_require__){var aFunction=__webpack_require__(23);module.exports=function(fn,that,length){if(aFunction(fn),void 0===that)return fn;switch(length){case 1:return function(a){return fn.call(that,a)};case 2:return function(a,b){return fn.call(that,a,b)};case 3:return function(a,b,c){return fn.call(that,a,b,c)}}return function(){return fn.apply(that,arguments)}}},function(module,exports,__webpack_require__){var global=__webpack_require__(0),core=__webpack_require__(7),hide=__webpack_require__(5),redefine=__webpack_require__(13),ctx=__webpack_require__(16),$export=function(type,name,source){var key,own,out,exp,IS_FORCED=type&$export.F,IS_GLOBAL=type&$export.G,IS_STATIC=type&$export.S,IS_PROTO=type&$export.P,IS_BIND=type&$export.B,target=IS_GLOBAL?global:IS_STATIC?global[name]||(global[name]={}):(global[name]||{}).prototype,exports=IS_GLOBAL?core:core[name]||(core[name]={}),expProto=exports.prototype||(exports.prototype={});for(key in IS_GLOBAL&&(source=name),source)out=((own=!IS_FORCED&&target&&void 0!==target[key])?target:source)[key],exp=IS_BIND&&own?ctx(out,global):IS_PROTO&&"function"==typeof out?ctx(Function.call,out):out,target&&redefine(target,key,out,type&$export.U),exports[key]!=out&&hide(exports,key,exp),IS_PROTO&&expProto[key]!=out&&(expProto[key]=out)};global.core=core,$export.F=1,$export.G=2,$export.S=4,$export.P=8,$export.B=16,$export.W=32,$export.U=64,$export.R=128,module.exports=$export},function(module,exports){var hasOwnProperty={}.hasOwnProperty;module.exports=function(it,key){return hasOwnProperty.call(it,key)}},function(module,exports,__webpack_require__){var defined=__webpack_require__(14);module.exports=function(it){return Object(defined(it))}},function(module,exports){module.exports=function(bitmap,value){return{enumerable:!(1&bitmap),configurable:!(2&bitmap),writable:!(4&bitmap),value:value}}},function(module,exports){module.exports=!1},function(module,exports,__webpack_require__){var isObject=__webpack_require__(1);module.exports=function(it,S){if(!isObject(it))return it;var fn,val;if(S&&"function"==typeof(fn=it.toString)&&!isObject(val=fn.call(it)))return val;if("function"==typeof(fn=it.valueOf)&&!isObject(val=fn.call(it)))return val;if(!S&&"function"==typeof(fn=it.toString)&&!isObject(val=fn.call(it)))return val;throw TypeError("Can't convert object to primitive value")}},function(module,exports){module.exports=function(it){if("function"!=typeof it)throw TypeError(it+" is not a function!");return it}},function(module,exports,__webpack_require__){module.exports=!__webpack_require__(3)&&!__webpack_require__(4)((function(){return 7!=Object.defineProperty(__webpack_require__(25)("div"),"a",{get:function(){return 7}}).a}))},function(module,exports,__webpack_require__){var isObject=__webpack_require__(1),document=__webpack_require__(0).document,is=isObject(document)&&isObject(document.createElement);module.exports=function(it){return is?document.createElement(it):{}}},function(module,exports,__webpack_require__){var cof=__webpack_require__(8);module.exports=Object("z").propertyIsEnumerable(0)?Object:function(it){return"String"==cof(it)?it.split(""):Object(it)}},function(module,exports,__webpack_require__){module.exports=__webpack_require__(11)("native-function-to-string",Function.toString)},function(module,exports,__webpack_require__){var cof=__webpack_require__(8);module.exports=Array.isArray||function isArray(arg){return"Array"==cof(arg)}},function(module,exports,__webpack_require__){var ctx=__webpack_require__(16),IObject=__webpack_require__(26),toObject=__webpack_require__(19),toLength=__webpack_require__(9),asc=__webpack_require__(30);module.exports=function(TYPE,$create){var IS_MAP=1==TYPE,IS_FILTER=2==TYPE,IS_SOME=3==TYPE,IS_EVERY=4==TYPE,IS_FIND_INDEX=6==TYPE,NO_HOLES=5==TYPE||IS_FIND_INDEX,create=$create||asc;return function($this,callbackfn,that){for(var val,res,O=toObject($this),self=IObject(O),f=ctx(callbackfn,that,3),length=toLength(self.length),index=0,result=IS_MAP?create($this,length):IS_FILTER?create($this,0):void 0;length>index;index++)if((NO_HOLES||index in self)&&(res=f(val=self[index],index,O),TYPE))if(IS_MAP)result[index]=res;else if(res)switch(TYPE){case 3:return!0;case 5:return val;case 6:return index;case 2:result.push(val)}else if(IS_EVERY)return!1;return IS_FIND_INDEX?-1:IS_SOME||IS_EVERY?IS_EVERY:result}}},function(module,exports,__webpack_require__){var speciesConstructor=__webpack_require__(31);module.exports=function(original,length){return new(speciesConstructor(original))(length)}},function(module,exports,__webpack_require__){var isObject=__webpack_require__(1),isArray=__webpack_require__(28),SPECIES=__webpack_require__(2)("species");module.exports=function(original){var C;return isArray(original)&&("function"!=typeof(C=original.constructor)||C!==Array&&!isArray(C.prototype)||(C=void 0),isObject(C)&&null===(C=C[SPECIES])&&(C=void 0)),void 0===C?Array:C}},,,,,,function(module,exports,__webpack_require__){var UNSCOPABLES=__webpack_require__(2)("unscopables"),ArrayProto=Array.prototype;null==ArrayProto[UNSCOPABLES]&&__webpack_require__(5)(ArrayProto,UNSCOPABLES,{}),module.exports=function(key){ArrayProto[UNSCOPABLES][key]=!0}},function(module,exports,__webpack_require__){"use strict";var $export=__webpack_require__(17),$find=__webpack_require__(29)(5),forced=!0;"find"in[]&&Array(1).find((function(){forced=!1})),$export($export.P+$export.F*forced,"Array",{find:function find(callbackfn){return $find(this,callbackfn,arguments.length>1?arguments[1]:void 0)}}),__webpack_require__(37)("find")},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(38);!function($,Drupal){Drupal.behaviors.click_change_media_image_more_info={attach:function attach(context,settings){$(context).find(".more-info").once("structure-process").each((function(){$(this).on("click","h3",(function(e){$(this).parent().hasClass("open")?($(this).parent().removeClass("open"),$(this).parent().find(".detail").css("display","none"),$(this).attr("aria-expanded",!1),$(this).attr("aria-label",Drupal.t("aria-label-section-more-info-is-closed"))):($(this).parent().removeClass("open"),$(this).parent().addClass("open"),$(this).parent().find(".detail").css("display","block"),$(this).attr("aria-expanded",!0),$(this).attr("aria-label",Drupal.t("aria-label-section-more-info-is-open")))}))}))}}}(jQuery,Drupal)}]);