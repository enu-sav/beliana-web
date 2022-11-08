!function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}__webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{enumerable:!0,get:getter})},__webpack_require__.r=function(exports){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.t=function(value,mode){if(1&mode&&(value=__webpack_require__(value)),8&mode)return value;if(4&mode&&"object"==typeof value&&value&&value.__esModule)return value;var ns=Object.create(null);if(__webpack_require__.r(ns),Object.defineProperty(ns,"default",{enumerable:!0,value:value}),2&mode&&"string"!=typeof value)for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module.default}:function getModuleExports(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=105)}([function(module,exports){var global=module.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=global)},function(module,exports,__webpack_require__){var store=__webpack_require__(15)("wks"),uid=__webpack_require__(11),Symbol=__webpack_require__(0).Symbol,USE_SYMBOL="function"==typeof Symbol;(module.exports=function(name){return store[name]||(store[name]=USE_SYMBOL&&Symbol[name]||(USE_SYMBOL?Symbol:uid)("Symbol."+name))}).store=store},function(module,exports){module.exports=function(it){return"object"==typeof it?null!==it:"function"==typeof it}},function(module,exports,__webpack_require__){module.exports=!__webpack_require__(4)((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},function(module,exports){module.exports=function(exec){try{return!!exec()}catch(e){return!0}}},function(module,exports,__webpack_require__){var isObject=__webpack_require__(2);module.exports=function(it){if(!isObject(it))throw TypeError(it+" is not an object!");return it}},function(module,exports,__webpack_require__){var dP=__webpack_require__(12),createDesc=__webpack_require__(19);module.exports=__webpack_require__(3)?function(object,key,value){return dP.f(object,key,createDesc(1,value))}:function(object,key,value){return object[key]=value,object}},function(module,exports){var core=module.exports={version:"2.6.12"};"number"==typeof __e&&(__e=core)},function(module,exports){var toString={}.toString;module.exports=function(it){return toString.call(it).slice(8,-1)}},function(module,exports,__webpack_require__){var toInteger=__webpack_require__(14),min=Math.min;module.exports=function(it){return it>0?min(toInteger(it),9007199254740991):0}},function(module,exports,__webpack_require__){var global=__webpack_require__(0),hide=__webpack_require__(6),has=__webpack_require__(16),SRC=__webpack_require__(11)("src"),$toString=__webpack_require__(28),TPL=(""+$toString).split("toString");__webpack_require__(7).inspectSource=function(it){return $toString.call(it)},(module.exports=function(O,key,val,safe){var isFunction="function"==typeof val;isFunction&&(has(val,"name")||hide(val,"name",key)),O[key]!==val&&(isFunction&&(has(val,SRC)||hide(val,SRC,O[key]?""+O[key]:TPL.join(String(key)))),O===global?O[key]=val:safe?O[key]?O[key]=val:hide(O,key,val):(delete O[key],hide(O,key,val)))})(Function.prototype,"toString",(function toString(){return"function"==typeof this&&this[SRC]||$toString.call(this)}))},function(module,exports){var id=0,px=Math.random();module.exports=function(key){return"Symbol(".concat(void 0===key?"":key,")_",(++id+px).toString(36))}},function(module,exports,__webpack_require__){var anObject=__webpack_require__(5),IE8_DOM_DEFINE=__webpack_require__(23),toPrimitive=__webpack_require__(22),dP=Object.defineProperty;exports.f=__webpack_require__(3)?Object.defineProperty:function defineProperty(O,P,Attributes){if(anObject(O),P=toPrimitive(P,!0),anObject(Attributes),IE8_DOM_DEFINE)try{return dP(O,P,Attributes)}catch(e){}if("get"in Attributes||"set"in Attributes)throw TypeError("Accessors not supported!");return"value"in Attributes&&(O[P]=Attributes.value),O}},function(module,exports){module.exports=function(it){if(null==it)throw TypeError("Can't call method on  "+it);return it}},function(module,exports){var ceil=Math.ceil,floor=Math.floor;module.exports=function(it){return isNaN(it=+it)?0:(it>0?floor:ceil)(it)}},function(module,exports,__webpack_require__){var core=__webpack_require__(7),global=__webpack_require__(0),store=global["__core-js_shared__"]||(global["__core-js_shared__"]={});(module.exports=function(key,value){return store[key]||(store[key]=void 0!==value?value:{})})("versions",[]).push({version:core.version,mode:__webpack_require__(21)?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},function(module,exports){var hasOwnProperty={}.hasOwnProperty;module.exports=function(it,key){return hasOwnProperty.call(it,key)}},function(module,exports,__webpack_require__){var global=__webpack_require__(0),core=__webpack_require__(7),hide=__webpack_require__(6),redefine=__webpack_require__(10),ctx=__webpack_require__(18),$export=function(type,name,source){var key,own,out,exp,IS_FORCED=type&$export.F,IS_GLOBAL=type&$export.G,IS_STATIC=type&$export.S,IS_PROTO=type&$export.P,IS_BIND=type&$export.B,target=IS_GLOBAL?global:IS_STATIC?global[name]||(global[name]={}):(global[name]||{}).prototype,exports=IS_GLOBAL?core:core[name]||(core[name]={}),expProto=exports.prototype||(exports.prototype={});for(key in IS_GLOBAL&&(source=name),source)out=((own=!IS_FORCED&&target&&void 0!==target[key])?target:source)[key],exp=IS_BIND&&own?ctx(out,global):IS_PROTO&&"function"==typeof out?ctx(Function.call,out):out,target&&redefine(target,key,out,type&$export.U),exports[key]!=out&&hide(exports,key,exp),IS_PROTO&&expProto[key]!=out&&(expProto[key]=out)};global.core=core,$export.F=1,$export.G=2,$export.S=4,$export.P=8,$export.B=16,$export.W=32,$export.U=64,$export.R=128,module.exports=$export},function(module,exports,__webpack_require__){var aFunction=__webpack_require__(24);module.exports=function(fn,that,length){if(aFunction(fn),void 0===that)return fn;switch(length){case 1:return function(a){return fn.call(that,a)};case 2:return function(a,b){return fn.call(that,a,b)};case 3:return function(a,b,c){return fn.call(that,a,b,c)}}return function(){return fn.apply(that,arguments)}}},function(module,exports){module.exports=function(bitmap,value){return{enumerable:!(1&bitmap),configurable:!(2&bitmap),writable:!(4&bitmap),value:value}}},function(module,exports,__webpack_require__){var defined=__webpack_require__(13);module.exports=function(it){return Object(defined(it))}},function(module,exports){module.exports=!1},function(module,exports,__webpack_require__){var isObject=__webpack_require__(2);module.exports=function(it,S){if(!isObject(it))return it;var fn,val;if(S&&"function"==typeof(fn=it.toString)&&!isObject(val=fn.call(it)))return val;if("function"==typeof(fn=it.valueOf)&&!isObject(val=fn.call(it)))return val;if(!S&&"function"==typeof(fn=it.toString)&&!isObject(val=fn.call(it)))return val;throw TypeError("Can't convert object to primitive value")}},function(module,exports,__webpack_require__){module.exports=!__webpack_require__(3)&&!__webpack_require__(4)((function(){return 7!=Object.defineProperty(__webpack_require__(26)("div"),"a",{get:function(){return 7}}).a}))},function(module,exports){module.exports=function(it){if("function"!=typeof it)throw TypeError(it+" is not a function!");return it}},function(module,exports,__webpack_require__){"use strict";var re1,re2,regexpFlags=__webpack_require__(34),nativeExec=RegExp.prototype.exec,nativeReplace=String.prototype.replace,patchedExec=nativeExec,UPDATES_LAST_INDEX_WRONG=(re1=/a/,re2=/b*/g,nativeExec.call(re1,"a"),nativeExec.call(re2,"a"),0!==re1.lastIndex||0!==re2.lastIndex),NPCG_INCLUDED=void 0!==/()??/.exec("")[1];(UPDATES_LAST_INDEX_WRONG||NPCG_INCLUDED)&&(patchedExec=function exec(str){var lastIndex,reCopy,match,i,re=this;return NPCG_INCLUDED&&(reCopy=new RegExp("^"+re.source+"$(?!\\s)",regexpFlags.call(re))),UPDATES_LAST_INDEX_WRONG&&(lastIndex=re.lastIndex),match=nativeExec.call(re,str),UPDATES_LAST_INDEX_WRONG&&match&&(re.lastIndex=re.global?match.index+match[0].length:lastIndex),NPCG_INCLUDED&&match&&match.length>1&&nativeReplace.call(match[0],reCopy,(function(){for(i=1;i<arguments.length-2;i++)void 0===arguments[i]&&(match[i]=void 0)})),match}),module.exports=patchedExec},function(module,exports,__webpack_require__){var isObject=__webpack_require__(2),document=__webpack_require__(0).document,is=isObject(document)&&isObject(document.createElement);module.exports=function(it){return is?document.createElement(it):{}}},function(module,exports,__webpack_require__){var cof=__webpack_require__(8);module.exports=Object("z").propertyIsEnumerable(0)?Object:function(it){return"String"==cof(it)?it.split(""):Object(it)}},function(module,exports,__webpack_require__){module.exports=__webpack_require__(15)("native-function-to-string",Function.toString)},function(module,exports,__webpack_require__){"use strict";var classof=__webpack_require__(36),builtinExec=RegExp.prototype.exec;module.exports=function(R,S){var exec=R.exec;if("function"==typeof exec){var result=exec.call(R,S);if("object"!=typeof result)throw new TypeError("RegExp exec method returned something other than an Object or null");return result}if("RegExp"!==classof(R))throw new TypeError("RegExp#exec called on incompatible receiver");return builtinExec.call(R,S)}},function(module,exports,__webpack_require__){"use strict";__webpack_require__(41);var redefine=__webpack_require__(10),hide=__webpack_require__(6),fails=__webpack_require__(4),defined=__webpack_require__(13),wks=__webpack_require__(1),regexpExec=__webpack_require__(25),SPECIES=wks("species"),REPLACE_SUPPORTS_NAMED_GROUPS=!fails((function(){var re=/./;return re.exec=function(){var result=[];return result.groups={a:"7"},result},"7"!=="".replace(re,"$<a>")})),SPLIT_WORKS_WITH_OVERWRITTEN_EXEC=function(){var re=/(?:)/,originalExec=re.exec;re.exec=function(){return originalExec.apply(this,arguments)};var result="ab".split(re);return 2===result.length&&"a"===result[0]&&"b"===result[1]}();module.exports=function(KEY,length,exec){var SYMBOL=wks(KEY),DELEGATES_TO_SYMBOL=!fails((function(){var O={};return O[SYMBOL]=function(){return 7},7!=""[KEY](O)})),DELEGATES_TO_EXEC=DELEGATES_TO_SYMBOL?!fails((function(){var execCalled=!1,re=/a/;return re.exec=function(){return execCalled=!0,null},"split"===KEY&&(re.constructor={},re.constructor[SPECIES]=function(){return re}),re[SYMBOL](""),!execCalled})):void 0;if(!DELEGATES_TO_SYMBOL||!DELEGATES_TO_EXEC||"replace"===KEY&&!REPLACE_SUPPORTS_NAMED_GROUPS||"split"===KEY&&!SPLIT_WORKS_WITH_OVERWRITTEN_EXEC){var nativeRegExpMethod=/./[SYMBOL],fns=exec(defined,SYMBOL,""[KEY],(function maybeCallNative(nativeMethod,regexp,str,arg2,forceStringMethod){return regexp.exec===regexpExec?DELEGATES_TO_SYMBOL&&!forceStringMethod?{done:!0,value:nativeRegExpMethod.call(regexp,str,arg2)}:{done:!0,value:nativeMethod.call(str,regexp,arg2)}:{done:!1}})),strfn=fns[0],rxfn=fns[1];redefine(String.prototype,KEY,strfn),hide(RegExp.prototype,SYMBOL,2==length?function(string,arg){return rxfn.call(string,this,arg)}:function(string){return rxfn.call(string,this)})}}},function(module,exports,__webpack_require__){var IObject=__webpack_require__(27),defined=__webpack_require__(13);module.exports=function(it){return IObject(defined(it))}},function(module,exports,__webpack_require__){"use strict";var at=__webpack_require__(40)(!0);module.exports=function(S,index,unicode){return index+(unicode?at(S,index).length:1)}},function(module,exports,__webpack_require__){var cof=__webpack_require__(8);module.exports=Array.isArray||function isArray(arg){return"Array"==cof(arg)}},function(module,exports,__webpack_require__){"use strict";var anObject=__webpack_require__(5);module.exports=function(){var that=anObject(this),result="";return that.global&&(result+="g"),that.ignoreCase&&(result+="i"),that.multiline&&(result+="m"),that.unicode&&(result+="u"),that.sticky&&(result+="y"),result}},function(module,exports,__webpack_require__){var ctx=__webpack_require__(18),IObject=__webpack_require__(27),toObject=__webpack_require__(20),toLength=__webpack_require__(9),asc=__webpack_require__(37);module.exports=function(TYPE,$create){var IS_MAP=1==TYPE,IS_FILTER=2==TYPE,IS_SOME=3==TYPE,IS_EVERY=4==TYPE,IS_FIND_INDEX=6==TYPE,NO_HOLES=5==TYPE||IS_FIND_INDEX,create=$create||asc;return function($this,callbackfn,that){for(var val,res,O=toObject($this),self=IObject(O),f=ctx(callbackfn,that,3),length=toLength(self.length),index=0,result=IS_MAP?create($this,length):IS_FILTER?create($this,0):void 0;length>index;index++)if((NO_HOLES||index in self)&&(res=f(val=self[index],index,O),TYPE))if(IS_MAP)result[index]=res;else if(res)switch(TYPE){case 3:return!0;case 5:return val;case 6:return index;case 2:result.push(val)}else if(IS_EVERY)return!1;return IS_FIND_INDEX?-1:IS_SOME||IS_EVERY?IS_EVERY:result}}},function(module,exports,__webpack_require__){var cof=__webpack_require__(8),TAG=__webpack_require__(1)("toStringTag"),ARG="Arguments"==cof(function(){return arguments}());module.exports=function(it){var O,T,B;return void 0===it?"Undefined":null===it?"Null":"string"==typeof(T=function(it,key){try{return it[key]}catch(e){}}(O=Object(it),TAG))?T:ARG?cof(O):"Object"==(B=cof(O))&&"function"==typeof O.callee?"Arguments":B}},function(module,exports,__webpack_require__){var speciesConstructor=__webpack_require__(38);module.exports=function(original,length){return new(speciesConstructor(original))(length)}},function(module,exports,__webpack_require__){var isObject=__webpack_require__(2),isArray=__webpack_require__(33),SPECIES=__webpack_require__(1)("species");module.exports=function(original){var C;return isArray(original)&&("function"!=typeof(C=original.constructor)||C!==Array&&!isArray(C.prototype)||(C=void 0),isObject(C)&&null===(C=C[SPECIES])&&(C=void 0)),void 0===C?Array:C}},function(module,exports,__webpack_require__){var UNSCOPABLES=__webpack_require__(1)("unscopables"),ArrayProto=Array.prototype;null==ArrayProto[UNSCOPABLES]&&__webpack_require__(6)(ArrayProto,UNSCOPABLES,{}),module.exports=function(key){ArrayProto[UNSCOPABLES][key]=!0}},function(module,exports,__webpack_require__){var toInteger=__webpack_require__(14),defined=__webpack_require__(13);module.exports=function(TO_STRING){return function(that,pos){var a,b,s=String(defined(that)),i=toInteger(pos),l=s.length;return i<0||i>=l?TO_STRING?"":void 0:(a=s.charCodeAt(i))<55296||a>56319||i+1===l||(b=s.charCodeAt(i+1))<56320||b>57343?TO_STRING?s.charAt(i):a:TO_STRING?s.slice(i,i+2):b-56320+(a-55296<<10)+65536}}},function(module,exports,__webpack_require__){"use strict";var regexpExec=__webpack_require__(25);__webpack_require__(17)({target:"RegExp",proto:!0,forced:regexpExec!==/./.exec},{exec:regexpExec})},function(module,exports,__webpack_require__){var toInteger=__webpack_require__(14),max=Math.max,min=Math.min;module.exports=function(index,length){return(index=toInteger(index))<0?max(index+length,0):min(index,length)}},function(module,exports,__webpack_require__){"use strict";var $export=__webpack_require__(17),$find=__webpack_require__(35)(5),forced=!0;"find"in[]&&Array(1).find((function(){forced=!1})),$export($export.P+$export.F*forced,"Array",{find:function find(callbackfn){return $find(this,callbackfn,arguments.length>1?arguments[1]:void 0)}}),__webpack_require__(39)("find")},function(module,exports,__webpack_require__){var shared=__webpack_require__(15)("keys"),uid=__webpack_require__(11);module.exports=function(key){return shared[key]||(shared[key]=uid(key))}},function(module,exports){module.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(module,exports,__webpack_require__){"use strict";var anObject=__webpack_require__(5),toObject=__webpack_require__(20),toLength=__webpack_require__(9),toInteger=__webpack_require__(14),advanceStringIndex=__webpack_require__(32),regExpExec=__webpack_require__(29),max=Math.max,min=Math.min,floor=Math.floor,SUBSTITUTION_SYMBOLS=/\$([$&`']|\d\d?|<[^>]*>)/g,SUBSTITUTION_SYMBOLS_NO_NAMED=/\$([$&`']|\d\d?)/g;__webpack_require__(30)("replace",2,(function(defined,REPLACE,$replace,maybeCallNative){return[function replace(searchValue,replaceValue){var O=defined(this),fn=null==searchValue?void 0:searchValue[REPLACE];return void 0!==fn?fn.call(searchValue,O,replaceValue):$replace.call(String(O),searchValue,replaceValue)},function(regexp,replaceValue){var res=maybeCallNative($replace,regexp,this,replaceValue);if(res.done)return res.value;var rx=anObject(regexp),S=String(this),functionalReplace="function"==typeof replaceValue;functionalReplace||(replaceValue=String(replaceValue));var global=rx.global;if(global){var fullUnicode=rx.unicode;rx.lastIndex=0}for(var results=[];;){var result=regExpExec(rx,S);if(null===result)break;if(results.push(result),!global)break;""===String(result[0])&&(rx.lastIndex=advanceStringIndex(S,toLength(rx.lastIndex),fullUnicode))}for(var it,accumulatedResult="",nextSourcePosition=0,i=0;i<results.length;i++){result=results[i];for(var matched=String(result[0]),position=max(min(toInteger(result.index),S.length),0),captures=[],j=1;j<result.length;j++)captures.push(void 0===(it=result[j])?it:String(it));var namedCaptures=result.groups;if(functionalReplace){var replacerArgs=[matched].concat(captures,position,S);void 0!==namedCaptures&&replacerArgs.push(namedCaptures);var replacement=String(replaceValue.apply(void 0,replacerArgs))}else replacement=getSubstitution(matched,S,position,captures,namedCaptures,replaceValue);position>=nextSourcePosition&&(accumulatedResult+=S.slice(nextSourcePosition,position)+replacement,nextSourcePosition=position+matched.length)}return accumulatedResult+S.slice(nextSourcePosition)}];function getSubstitution(matched,str,position,captures,namedCaptures,replacement){var tailPos=position+matched.length,m=captures.length,symbols=SUBSTITUTION_SYMBOLS_NO_NAMED;return void 0!==namedCaptures&&(namedCaptures=toObject(namedCaptures),symbols=SUBSTITUTION_SYMBOLS),$replace.call(replacement,symbols,(function(match,ch){var capture;switch(ch.charAt(0)){case"$":return"$";case"&":return matched;case"`":return str.slice(0,position);case"'":return str.slice(tailPos);case"<":capture=namedCaptures[ch.slice(1,-1)];break;default:var n=+ch;if(0===n)return match;if(n>m){var f=floor(n/10);return 0===f?match:f<=m?void 0===captures[f-1]?ch.charAt(1):captures[f-1]+ch.charAt(1):match}capture=captures[n-1]}return void 0===capture?"":capture}))}}))},function(module,exports,__webpack_require__){var isObject=__webpack_require__(2),cof=__webpack_require__(8),MATCH=__webpack_require__(1)("match");module.exports=function(it){var isRegExp;return isObject(it)&&(void 0!==(isRegExp=it[MATCH])?!!isRegExp:"RegExp"==cof(it))}},,function(module,exports,__webpack_require__){var has=__webpack_require__(16),toIObject=__webpack_require__(31),arrayIndexOf=__webpack_require__(54)(!1),IE_PROTO=__webpack_require__(44)("IE_PROTO");module.exports=function(object,names){var key,O=toIObject(object),i=0,result=[];for(key in O)key!=IE_PROTO&&has(O,key)&&result.push(key);for(;names.length>i;)has(O,key=names[i++])&&(~arrayIndexOf(result,key)||result.push(key));return result}},function(module,exports,__webpack_require__){"use strict";var anObject=__webpack_require__(5),toLength=__webpack_require__(9),advanceStringIndex=__webpack_require__(32),regExpExec=__webpack_require__(29);__webpack_require__(30)("match",1,(function(defined,MATCH,$match,maybeCallNative){return[function match(regexp){var O=defined(this),fn=null==regexp?void 0:regexp[MATCH];return void 0!==fn?fn.call(regexp,O):new RegExp(regexp)[MATCH](String(O))},function(regexp){var res=maybeCallNative($match,regexp,this);if(res.done)return res.value;var rx=anObject(regexp),S=String(this);if(!rx.global)return regExpExec(rx,S);var fullUnicode=rx.unicode;rx.lastIndex=0;for(var result,A=[],n=0;null!==(result=regExpExec(rx,S));){var matchStr=String(result[0]);A[n]=matchStr,""===matchStr&&(rx.lastIndex=advanceStringIndex(S,toLength(rx.lastIndex),fullUnicode)),n++}return 0===n?null:A}]}))},,function(module,exports){exports.f={}.propertyIsEnumerable},function(module,exports,__webpack_require__){var $keys=__webpack_require__(49),hiddenKeys=__webpack_require__(45).concat("length","prototype");exports.f=Object.getOwnPropertyNames||function getOwnPropertyNames(O){return $keys(O,hiddenKeys)}},function(module,exports,__webpack_require__){var toIObject=__webpack_require__(31),toLength=__webpack_require__(9),toAbsoluteIndex=__webpack_require__(42);module.exports=function(IS_INCLUDES){return function($this,el,fromIndex){var value,O=toIObject($this),length=toLength(O.length),index=toAbsoluteIndex(fromIndex,length);if(IS_INCLUDES&&el!=el){for(;length>index;)if((value=O[index++])!=value)return!0}else for(;length>index;index++)if((IS_INCLUDES||index in O)&&O[index]===el)return IS_INCLUDES||index||0;return!IS_INCLUDES&&-1}}},,function(module,exports,__webpack_require__){var pIE=__webpack_require__(52),createDesc=__webpack_require__(19),toIObject=__webpack_require__(31),toPrimitive=__webpack_require__(22),has=__webpack_require__(16),IE8_DOM_DEFINE=__webpack_require__(23),gOPD=Object.getOwnPropertyDescriptor;exports.f=__webpack_require__(3)?gOPD:function getOwnPropertyDescriptor(O,P){if(O=toIObject(O),P=toPrimitive(P,!0),IE8_DOM_DEFINE)try{return gOPD(O,P)}catch(e){}if(has(O,P))return createDesc(!pIE.f.call(O,P),O[P])}},function(module,exports,__webpack_require__){"use strict";var isRegExp=__webpack_require__(47),anObject=__webpack_require__(5),speciesConstructor=__webpack_require__(58),advanceStringIndex=__webpack_require__(32),toLength=__webpack_require__(9),callRegExpExec=__webpack_require__(29),regexpExec=__webpack_require__(25),fails=__webpack_require__(4),$min=Math.min,$push=[].push,LENGTH="length",SUPPORTS_Y=!fails((function(){RegExp(4294967295,"y")}));__webpack_require__(30)("split",2,(function(defined,SPLIT,$split,maybeCallNative){var internalSplit;return internalSplit="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1)[LENGTH]||2!="ab".split(/(?:ab)*/)[LENGTH]||4!=".".split(/(.?)(.?)/)[LENGTH]||".".split(/()()/)[LENGTH]>1||"".split(/.?/)[LENGTH]?function(separator,limit){var string=String(this);if(void 0===separator&&0===limit)return[];if(!isRegExp(separator))return $split.call(string,separator,limit);for(var match,lastIndex,lastLength,output=[],flags=(separator.ignoreCase?"i":"")+(separator.multiline?"m":"")+(separator.unicode?"u":"")+(separator.sticky?"y":""),lastLastIndex=0,splitLimit=void 0===limit?4294967295:limit>>>0,separatorCopy=new RegExp(separator.source,flags+"g");(match=regexpExec.call(separatorCopy,string))&&!((lastIndex=separatorCopy.lastIndex)>lastLastIndex&&(output.push(string.slice(lastLastIndex,match.index)),match[LENGTH]>1&&match.index<string[LENGTH]&&$push.apply(output,match.slice(1)),lastLength=match[0][LENGTH],lastLastIndex=lastIndex,output[LENGTH]>=splitLimit));)separatorCopy.lastIndex===match.index&&separatorCopy.lastIndex++;return lastLastIndex===string[LENGTH]?!lastLength&&separatorCopy.test("")||output.push(""):output.push(string.slice(lastLastIndex)),output[LENGTH]>splitLimit?output.slice(0,splitLimit):output}:"0".split(void 0,0)[LENGTH]?function(separator,limit){return void 0===separator&&0===limit?[]:$split.call(this,separator,limit)}:$split,[function split(separator,limit){var O=defined(this),splitter=null==separator?void 0:separator[SPLIT];return void 0!==splitter?splitter.call(separator,O,limit):internalSplit.call(String(O),separator,limit)},function(regexp,limit){var res=maybeCallNative(internalSplit,regexp,this,limit,internalSplit!==$split);if(res.done)return res.value;var rx=anObject(regexp),S=String(this),C=speciesConstructor(rx,RegExp),unicodeMatching=rx.unicode,flags=(rx.ignoreCase?"i":"")+(rx.multiline?"m":"")+(rx.unicode?"u":"")+(SUPPORTS_Y?"y":"g"),splitter=new C(SUPPORTS_Y?rx:"^(?:"+rx.source+")",flags),lim=void 0===limit?4294967295:limit>>>0;if(0===lim)return[];if(0===S.length)return null===callRegExpExec(splitter,S)?[S]:[];for(var p=0,q=0,A=[];q<S.length;){splitter.lastIndex=SUPPORTS_Y?q:0;var e,z=callRegExpExec(splitter,SUPPORTS_Y?S:S.slice(q));if(null===z||(e=$min(toLength(splitter.lastIndex+(SUPPORTS_Y?0:q)),S.length))===p)q=advanceStringIndex(S,q,unicodeMatching);else{if(A.push(S.slice(p,q)),A.length===lim)return A;for(var i=1;i<=z.length-1;i++)if(A.push(z[i]),A.length===lim)return A;q=p=e}}return A.push(S.slice(p)),A}]}))},function(module,exports,__webpack_require__){var anObject=__webpack_require__(5),aFunction=__webpack_require__(24),SPECIES=__webpack_require__(1)("species");module.exports=function(O,D){var S,C=anObject(O).constructor;return void 0===C||null==(S=anObject(C)[SPECIES])?D:aFunction(S)}},,function(module,exports,__webpack_require__){var global=__webpack_require__(0),inheritIfRequired=__webpack_require__(61),dP=__webpack_require__(12).f,gOPN=__webpack_require__(53).f,isRegExp=__webpack_require__(47),$flags=__webpack_require__(34),$RegExp=global.RegExp,Base=$RegExp,proto=$RegExp.prototype,re1=/a/g,re2=/a/g,CORRECT_NEW=new $RegExp(re1)!==re1;if(__webpack_require__(3)&&(!CORRECT_NEW||__webpack_require__(4)((function(){return re2[__webpack_require__(1)("match")]=!1,$RegExp(re1)!=re1||$RegExp(re2)==re2||"/a/i"!=$RegExp(re1,"i")})))){$RegExp=function RegExp(p,f){var tiRE=this instanceof $RegExp,piRE=isRegExp(p),fiU=void 0===f;return!tiRE&&piRE&&p.constructor===$RegExp&&fiU?p:inheritIfRequired(CORRECT_NEW?new Base(piRE&&!fiU?p.source:p,f):Base((piRE=p instanceof $RegExp)?p.source:p,piRE&&fiU?$flags.call(p):f),tiRE?this:proto,$RegExp)};for(var proxy=function(key){key in $RegExp||dP($RegExp,key,{configurable:!0,get:function(){return Base[key]},set:function(it){Base[key]=it}})},keys=gOPN(Base),i=0;keys.length>i;)proxy(keys[i++]);proto.constructor=$RegExp,$RegExp.prototype=proto,__webpack_require__(10)(global,"RegExp",$RegExp)}__webpack_require__(63)("RegExp")},function(module,exports,__webpack_require__){var isObject=__webpack_require__(2),setPrototypeOf=__webpack_require__(62).set;module.exports=function(that,target,C){var P,S=target.constructor;return S!==C&&"function"==typeof S&&(P=S.prototype)!==C.prototype&&isObject(P)&&setPrototypeOf&&setPrototypeOf(that,P),that}},function(module,exports,__webpack_require__){var isObject=__webpack_require__(2),anObject=__webpack_require__(5),check=function(O,proto){if(anObject(O),!isObject(proto)&&null!==proto)throw TypeError(proto+": can't set as prototype!")};module.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(test,buggy,set){try{(set=__webpack_require__(18)(Function.call,__webpack_require__(56).f(Object.prototype,"__proto__").set,2))(test,[]),buggy=!(test instanceof Array)}catch(e){buggy=!0}return function setPrototypeOf(O,proto){return check(O,proto),buggy?O.__proto__=proto:set(O,proto),O}}({},!1):void 0),check:check}},function(module,exports,__webpack_require__){"use strict";var global=__webpack_require__(0),dP=__webpack_require__(12),DESCRIPTORS=__webpack_require__(3),SPECIES=__webpack_require__(1)("species");module.exports=function(KEY){var C=global[KEY];DESCRIPTORS&&C&&!C[SPECIES]&&dP.f(C,SPECIES,{configurable:!0,get:function(){return this}})}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(43),__webpack_require__(50),__webpack_require__(60),__webpack_require__(57),__webpack_require__(46);!function($,Drupal){Drupal.behaviors.click_change_node_word_citation={attach:function attach(context,settings){$(context).find("article > .word").once("structure-process").each((function(){var $word=$(this);$.each(["desktop","mobile"],(function(i,selector){var $wrapper=$word.find(".node__content."+selector),$sidebar_wrapper=$word.find(".node__sidebar."+selector),$images=$word.find(".word-illustration .media-image");if($.each(["IMG","IMGX"],(function(key,tag){if($wrapper.length){var matches=$wrapper.html().match(new RegExp("\\["+tag+"-[0-9]+\\]","g"));$.each(matches,(function(key,match){var id=match.split("-")[1].replace("]","")-1,$tag=$wrapper.find("p:contains("+match+")"),$image=$($images[id]);"IMGX"==tag&&$image.addClass("hide-description"),$($image[0].outerHTML).insertAfter($tag),$image.addClass("moved"),$tag.remove()}))}})),$wrapper.find("h2, h3").length){var $sidebar=$sidebar_wrapper.find(".structure");$sidebar.append("<h3>"+Drupal.t("label-content")+"</h3><ul></ul>"),$wrapper.find("h2, h3").each((function(i,item){var type=$(item).is("h2")?"large":"small";$(item).attr("data-id",i).after('<span class="scroll-up">'+Drupal.t("label-back-to-content")+"</span>"),$sidebar.find("ul").append('<li class="'+type+'"><a href="#" data-id="'+i+'">'+$(item).text()+"</a></li>")})),$sidebar.on("click","ul > li > a",(function(e){e.preventDefault();var offset=$("body").hasClass("adminimal-admin-toolbar")?220:160;"mobile"==selector&&(offset=$("body").hasClass("adminimal-admin-toolbar")?180:150),$("html, body").animate({scrollTop:$wrapper.find('h2[data-id="'+$(this).data("id")+'"], h3[data-id="'+$(this).data("id")+'"]').offset().top-offset},300)})),$sidebar.removeClass("hidden")}$sidebar_wrapper.find("article.media-image.view-mode-in-word:not(.moved)").length||$sidebar_wrapper.find(".field--name-field-table").length||$sidebar_wrapper.find(".structure > ul").length||$sidebar_wrapper.hide()})),$word.on("click","span.scroll-up",(function(e){$("html, body").animate({scrollTop:0},300)})),$word.on("click",".citation h3",(function(e){$(this).parent().hasClass("open")?($(this).parent().removeClass("open"),$(this).parent().find("#dialog-desc").css("display","none"),$(this).attr("aria-expanded",!1),$(this).attr("aria-label",Drupal.t("aria-label-section-citation-is-closed"))):($(this).parent().removeClass("open"),$(this).parent().addClass("open"),$(this).parent().find("#dialog-desc").css("display","block"),$(this).attr("aria-expanded",!0),$(this).attr("aria-label",Drupal.t("aria-label-section-citation-is-open")))}))}))}}}(jQuery,Drupal)}]);