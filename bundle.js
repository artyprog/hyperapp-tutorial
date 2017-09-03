(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var reducers = module.exports = {
    updateText: function updateText(state, actions, newValue) {
        return {
            'text': newValue
        };
    },

    updateCount: function updateCount(state, actions, newValue) {
        return {
            'count': 1 * newValue
        };
    },

    updateLoading: function updateLoading(_, __, loading) {
        return {
            loading: loading
        };
    },

    updatePeople: function updatePeople(state, actions, people) {
        return {
            people: people
        };
    },

    updatePerson: function updatePerson(state, actions, person) {
        return {
            person: person
        };
    },

    loadPeople: function loadPeople(state, actions, url) {
        actions.updateLoading(true);
        setTimeout(function () {
            return fetch(url).then(function (r) {
                return r.json();
            }).then(function (j) {
                console.log(j);
                actions.updatePeople(j);
                actions.updateLoading(false);
            });
        }, 100);
    },

    loadPerson: function loadPerson(state, actions, id) {
        setTimeout(function () {
            return fetch('https://swapi.co/api/people/' + id).then(function (r) {
                return r.json();
            }).then(function (j) {
                console.log(j);
                actions.updatePerson(j);
                actions.updateLoading(false);
            });
        }, 100);
    },

    loadPersonAndGo: function loadPersonAndGo(state, actions, id) {
        actions.updateLoading(true);
        console.log("ROUTER");
        actions.router.go('#/view/' + id);
    }
};

},{}],2:[function(require,module,exports){
'use strict';

var _require = require('hyperapp'),
    h = _require.h;

var Input = module.exports = function (_ref) {
  var text = _ref.text,
      update = _ref.update;
  return h('input', { onkeyup: function onkeyup(e) {
      return update(e.target.value);
    }, value: text });
};

},{"hyperapp":9}],3:[function(require,module,exports){
'use strict';

var _PersonRow = require('./PersonRow.js');

var _PersonRow2 = _interopRequireDefault(_PersonRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('hyperapp'),
    h = _require.h;

var People = module.exports = function (_ref) {
    var people = _ref.people,
        actions = _ref.actions;
    return h(
        'table',
        null,
        h(
            'thead',
            null,
            h(
                'tr',
                null,
                h(
                    'th',
                    null,
                    'Name'
                ),
                h(
                    'th',
                    null,
                    'Gender'
                ),
                h(
                    'th',
                    null,
                    'Birth year'
                ),
                h(
                    'th',
                    null,
                    'ID'
                ),
                h(
                    'th',
                    null,
                    'Modal'
                )
            )
        ),
        h(
            'tbody',
            null,
            people['results'].map(function (z) {
                return h(_PersonRow2.default, { person: z, actions: actions });
            })
        )
    );
};

},{"./PersonRow.js":4,"hyperapp":9}],4:[function(require,module,exports){
'use strict';

var _rambda = require('rambda');

var _rambda2 = _interopRequireDefault(_rambda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('hyperapp'),
    h = _require.h;

var PersonRow = module.exports = function (_ref) {
    var person = _ref.person,
        actions = _ref.actions;

    var id = person.url.match(/\/(\d+)\/$/)[1];
    return h(
        'tr',
        null,
        h(
            'td',
            null,
            person.name
        ),
        h(
            'td',
            null,
            person.gender
        ),
        h(
            'td',
            null,
            person.birth_year
        ),
        h(
            'td',
            null,
            h(
                'button',
                { 'class': 'btn btn-block', onclick: function onclick() {
                        return actions.loadPersonAndGo(id);
                    } },
                id
            )
        ),
        h(
            'td',
            null,
            h(
                'button',
                { 'class': 'btn btn-block btn-primary', onclick: function onclick() {
                        return actions.displayModal(id);
                    } },
                id
            )
        )
    );
};

},{"hyperapp":9,"rambda":10}],5:[function(require,module,exports){
"use strict";

var _require = require('hyperapp'),
    h = _require.h;

// OR <div class="loading loading-lg"></div>

var Spinner = module.exports = function () {
    return h(
        "div",
        { "class": "spinner" },
        h("div", { "class": "bounce1" }),
        h("div", { "class": "bounce2" }),
        h("div", { "class": "bounce3" })
    );
};

},{"hyperapp":9}],6:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('hyperapp'),
    h = _require.h;

var Table = module.exports = function (_ref) {
    var text = _ref.text,
        count = _ref.count,
        actions = _ref.actions;
    return h(
        'table',
        null,
        h(
            'thead',
            null,
            h(
                'tr',
                null,
                h(
                    'th',
                    null,
                    'VALUE'
                )
            )
        ),
        h(
            'tbody',
            null,
            (count * 1 == count ? [].concat(_toConsumableArray(Array(count).keys())) : []).map(function (z) {
                return h(
                    'tr',
                    null,
                    h(
                        'td',
                        null,
                        z,
                        ' ',
                        text
                    )
                );
            })
        )
    );
};

},{"hyperapp":9}],7:[function(require,module,exports){
"use strict";

var _hyperapp = require("hyperapp");

var _router = require("@hyperapp/router");

var _rambda = require("rambda");

var _rambda2 = _interopRequireDefault(_rambda);

var _actions = require("./actions.js");

var _actions2 = _interopRequireDefault(_actions);

var _views = require("./views.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://swapi.co/api/people/

(0, _hyperapp.app)({
    events: {
        load: function load(state, actions) {
            console.log("S");
            actions.loadPeople('https://swapi.co/api/people/');
        }
        /*
        ,
        route: (state, actions, data, emit) => {
            if(data.match == "/view/:id") {
              let id = data.params.id;
              actions.updateLoading(true);
              actions.loadPerson(id);
            }
        }
        */
    },
    state: {
        text: 'Hi!!!!!!!',
        count: 5,
        loading: true,
        person: undefined,
        people: {
            results: [],
            count: 0,
            next: null
        }
    },
    view: _views.home,
    actions: _actions2.default,
    root: document.getElementById("app")
});

},{"./actions.js":1,"./views.js":11,"@hyperapp/router":8,"hyperapp":9,"rambda":10}],8:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("hyperapp")):"function"==typeof define&&define.amd?define(["exports","hyperapp"],t):t(e.Router={},e.hyperapp)}(this,function(e,t){"use strict";function r(e){return{state:{router:{}},actions:{router:{set:function(e,t,r){return{router:r}},go:function(e,t,r){location.pathname+location.search!==r&&(history.pushState({},"",r),t.router.set({path:r}))}}},events:{load:function(e,t){addEventListener("popstate",function(){t.router.set({})})},render:function(t,r,o){return o[(t.router.index>=0?t:r.router.set(e("route",n(location.pathname,o)))).router.index][1]}}}}function n(e,t){for(var r,n,o={},u=0;u<t.length&&!r;u++){var i=t[u][0],a=[];e.replace(RegExp("*"===i?".*":"^"+i.replace(/\//g,"\\/").replace(/:([\w]+)/g,function(e,t){return a.push(t),"([-\\.%\\w\\(\\)]+)"})+"/?$","g"),function(){for(var e=1;e<arguments.length-2;){var t=arguments[e++];try{t=decodeURI(t)}catch(e){}o[a.shift()]=t}r=i,n=u})}return{match:r,index:n,params:o}}function o(e,r){return e.href=e.to,e.to=null,e.onclick=function(t){t.preventDefault(),e.go(e.href)},t.h("a",e,r)}e.Router=r,e.Link=o});

},{"hyperapp":9}],9:[function(require,module,exports){
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.hyperapp={})}(this,function(e){"use strict";function n(e,n){var t,o=[];for(r=arguments.length;r-- >2;)a.push(arguments[r]);for(;a.length;)if(Array.isArray(t=a.pop()))for(r=t.length;r--;)a.push(t[r]);else null!=t&&!0!==t&&!1!==t&&("number"==typeof t&&(t+=""),o.push(t));return"string"==typeof e?{tag:e,data:n||{},children:o}:e(n,o)}function t(e){function n(e,t,r){Object.keys(t||[]).map(function(o){var u=t[o],f=r?r+"."+o:o;"function"==typeof u?e[o]=function(e){i("action",{name:f,data:e});var n=i("resolve",u(p,m,e));return"function"==typeof n?n(a):a(n)}:n(e[o]||(e[o]={}),u,f)})}function t(e){for(x=v(w,x,h,h=i("render",y)(p,m),g=!g);e=o.pop();)e()}function r(){y&&!g&&requestAnimationFrame(t,g=!g)}function a(e){return e&&(e=i("update",u(p,e)))&&r(p=e),p}function i(e,n){return(b[e]||[]).map(function(e){var t=e(p,m,n);null!=t&&(n=t)}),n}function u(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function f(e){if(e&&(e=e.data))return e.key}function c(e,n){if("string"==typeof e)var t=document.createTextNode(e);else{var t=(n=n||"svg"===e.tag)?document.createElementNS("http://www.w3.org/2000/svg",e.tag):document.createElement(e.tag);e.data&&e.data.oncreate&&o.push(function(){e.data.oncreate(t)});for(var r in e.data)l(t,r,e.data[r]);for(var r=0;r<e.children.length;)t.appendChild(c(e.children[r++],n))}return t}function l(e,n,t,r){if("key"===n);else if("style"===n)for(var a in u(r,t=t||{}))e.style[a]=t[a]||"";else{try{e[n]=t}catch(e){}"function"!=typeof t&&(t?e.setAttribute(n,t):e.removeAttribute(n))}}function d(e,n,t){for(var r in u(n,t)){var a=t[r],i="value"===r||"checked"===r?e[r]:n[r];a!==i&&l(e,r,a,i)}t&&t.onupdate&&o.push(function(){t.onupdate(e,n)})}function s(e,n,t){t&&t.onremove?t.onremove(n):e.removeChild(n)}function v(e,n,t,r,a,o){if(null==t)n=e.insertBefore(c(r,a),n);else if(null!=r.tag&&r.tag===t.tag){d(n,t.data,r.data),a=a||"svg"===r.tag;for(var i=r.children.length,u=t.children.length,l={},p=[],h={},g=0;g<u;g++){var y=p[g]=n.childNodes[g],m=t.children[g],b=f(m);null!=b&&(l[b]=[y,m])}for(var g=0,k=0;k<i;){var y=p[g],m=t.children[g],w=r.children[k],b=f(m);if(h[b])g++;else{var x=f(w),A=l[x]||[];null==x?(null==b&&(v(n,y,m,w,a),k++),g++):(b===x?(v(n,A[0],A[1],w,a),g++):A[0]?(n.insertBefore(A[0],y),v(n,A[0],A[1],w,a)):v(n,y,null,w,a),k++,h[x]=w)}}for(;g<u;){var m=t.children[g],b=f(m);null==b&&s(n,p[g],m.data),g++}for(var g in l){var A=l[g],j=A[1];h[j.data.key]||s(n,A[0],j.data)}}else n&&r!==n.nodeValue&&(n=e.insertBefore(c(r,a),o=n),s(e,o,t.data));return n}for(var p,h,g,y=e.view,m={},b={},k=e.mixins||[],w=e.root||document.body,x=w.children[0],A=0;A<=k.length;A++){var j=k[A]?k[A](i):e;Object.keys(j.events||[]).map(function(e){b[e]=(b[e]||[]).concat(j.events[e])}),n(m,j.actions),p=u(p,j.state)}return r((h=i("load",x))===x&&(h=x=null)),i}var r,a=[],o=[];e.h=n,e.app=t});

},{}],10:[function(require,module,exports){
(function(c,d){typeof exports==='object'&&typeof module!=='undefined'?d(exports):typeof define==='function'&&define.amd?define(['exports'],d):d(c.R={});})(this,function(e){'use strict';function helper(g,x,y){if(x===void 0){return function(h,j){return helper(g,h,j);};}else if(y===void 0){return function(k){return helper(g,x,k);};}if(y[g]!==void 0){return y[g](x);}}function curry(l){return function(x,y){if(y===void 0){return function(m){return l(x,m);};}return l(x,y);};}function curryThree(n){return function(x,y,z){if(y===void 0){var helper=function helper(q,r){return n(x,q,r);};return curry(helper);}else if(z===void 0){return function(s){return n(x,y,s);};}return n(x,y,z);};}function mathHelper(t,x,y){switch(t){case'+':return x+y;case'-':return x-y;case'/':return x/y;case'*':return x*y;case'%':return x%y;}}var u=curryThree(mathHelper);function oppositeHelper(v,x,y){if(x===void 0){return function(w,A){return oppositeHelper(v,w,A);};}else if(y===void 0){return function(B){return oppositeHelper(v,x,B);};}if(x[v]!==void 0){return x[v](y);}}function propHelper(C,x){if(x===void 0){return function(D){return propHelper(C,D);};}return x[C];}function simpleHelper(E,x){if(x===void 0){return function(G){return simpleHelper(E,G);};}if(x[E]!==void 0){return x[E]();}}function addIndex(H){return function(I){for(var J=0,newFn=function newFn(){for(var K=arguments.length,L=Array(K),M=0;M<K;M++){L[M]=arguments[M];}return I.apply(null,[].concat(L,[J++]));},N=arguments.length,O=Array(N>1?N-1:0),P=1;P<N;P++){O[P-1]=arguments[P];}return H.apply(null,[newFn].concat(O));};}function adjust(Q,R,S){var U=S.concat();return U.map(function(V,W){if(W===R){return Q(S[R]);}return V;});}var X=curryThree(adjust);function filterObject(Y,Z){var a1={};for(var b1 in Z){if(Y(Z[b1])){a1[b1]=Z[b1];}}return a1;}function filter(fn,d1){if(d1.length===void 0){return filterObject(fn,d1);}var e1=-1,f1=0,g1=d1.length,h1=[];while(++e1<g1){var i1=d1[e1];if(fn(i1)){h1[f1++]=i1;}}return h1;}var j1=curry(filter);function all(k1,l1){if(arguments.length===1){return function(m1){return all(k1,m1);};}return j1(k1,l1).length===l1.length;}function any(fn,o1){var p1=0;while(p1<o1.length){if(fn(o1[p1])){return!0;}p1++;}return!1;}var q1=curry(any);function allPass(r1,x){if(arguments.length===1){return function(s1){return allPass(r1,s1);};}return!q1(function(t1){return!t1(x);})(r1);}function anyPass(u1,x){if(arguments.length===1){return function(v1){return anyPass(u1,v1);};}return q1(function(w1){return w1(x);})(u1);}function append(x1,y1){var z1=y1.concat();z1.push(x1);return z1;}var A1=curry(append);function both(x,y){return function(B1){return x(B1)&&y(B1);};}var C1=curry(both);function compose(){for(var D1=arguments.length,E1=Array(D1),F1=0;F1<D1;F1++){E1[F1]=arguments[F1];}return function(G1){var H1=E1.slice();while(H1.length>0){G1=H1.pop()(G1);}return G1;};}var I1=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(J1){return typeof J1;}:function(K1){return K1&&typeof Symbol==="function"&&K1.constructor===Symbol&&K1!==Symbol.prototype?"symbol":typeof K1;},toConsumableArray=function(L1){if(Array.isArray(L1)){for(var i=0,M1=Array(L1.length);i<L1.length;i++)M1[i]=L1[i];return M1;}else{return Array.from(L1);}};function type(a){var N1=typeof a==='undefined'?'undefined':I1(a);if(a===null){return'Null';}else if(a===void 0){return'Undefined';}else if(N1==='boolean'){return'Boolean';}else if(N1==='number'){return'Number';}else if(N1==='string'){return'String';}else if(Array.isArray(a)){return'Array';}else if(a instanceof RegExp){return'RegExp';}var O1=a.toString();if(O1.startsWith('async')){return'Async';}else if(O1==='[object Promise]'){return'Promise';}else if(O1.includes('function')||O1.includes('=>')){return'Function';}return'Object';}function equals(a,b){if(a===b){return!0;}var P1=type(a);if(P1!==type(b)){return!1;}if(P1==='Array'){var Q1=Array.from(a),R1=Array.from(b);return Q1.sort().toString()===R1.sort().toString();}if(P1==='Object'){var S1=Object.keys(a);if(S1.length===Object.keys(b).length){if(S1.length===0){return!0;}var T1=!0;S1.map(function(U1){if(T1){var V1=type(a[U1]),W1=type(b[U1]);if(V1===W1){if(V1==='Object'){if(Object.keys(a[U1]).length===Object.keys(b[U1]).length){if(Object.keys(a[U1]).length!==0){if(!equals(a[U1],b[U1])){T1=!1;}}}else{T1=!1;}}else if(!equals(a[U1],b[U1])){T1=!1;}}else{T1=!1;}}});return T1;}}return!1;}var X1=curry(equals);function contains(Y1,Z1){var a2=-1,b2=!1;while(++a2<Z1.length&&!b2){if(X1(Z1[a2],Y1)){b2=!0;}}return b2;}var c2=curry(contains);function curry$1(f){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return function(){for(var d2=arguments.length,p=Array(d2),e2=0;e2<d2;e2++){p[e2]=arguments[e2];}return function(o){return o.length>=f.length?f.apply(void 0,toConsumableArray(o)):curry$1(f,o);}([].concat(toConsumableArray(a),p));};}var dec=function(x){return x-1;};function defaultTo(f2,g2){if(arguments.length===1){return function(h2){return defaultTo(f2,h2);};}return g2===void 0||!(type(g2)===type(f2))?f2:g2;}function drop(i2,a){return a.slice(i2);}var j2=curry(drop);function dropLast(k2,a){return a.slice(0,-k2);}var l2=curry(dropLast);function either(x,y){return function(m2){return x(m2)||y(m2);};}var n2=curry(either),inc=function(x){return x+1;};function find(fn,p2){return p2.find(fn);}var q2=curry(find);function findIndex(fn,s2){var t2=s2.length,u2=-1;while(++u2<t2){if(fn(s2[u2])){return u2;}}return-1;}var v2=curry(findIndex);function flatten(w2,x2){x2=x2===void 0?[]:x2;for(var i=0;i<w2.length;i++){if(Array.isArray(w2[i])){flatten(w2[i],x2);}else{x2.push(w2[i]);}}return x2;}function flipExport(fn){return function(){for(var z2=arguments.length,A2=Array(z2),B2=0;B2<z2;B2++){A2[B2]=arguments[B2];}if(A2.length===1){return function(C2){return fn(C2,A2[0]);};}else if(A2.length===2){return fn(A2[1],A2[0]);}return void 0;};}function flip(fn){return flipExport(fn);}function has(E2,F2){return F2[E2]!==void 0;}var G2=curry(has);function head(a){if(typeof a==='string'){return a[0]||'';}return a[0];}function ifElse(H2,I2,J2){return function(K2){if(H2(K2)===!0){return I2(K2);}return J2(K2);};}var L2=curryThree(ifElse);function indexOf(x,M2){var N2=-1,O2=M2.length;while(++N2<O2){if(M2[N2]===x){return N2;}}return-1;}var P2=curry(indexOf);function baseSlice(Q2,R2,S2){var T2=-1,U2=Q2.length;S2=S2>U2?U2:S2;if(S2<0){S2+=U2;}U2=R2>S2?0:S2-R2>>>0;R2>>>=0;var V2=Array(U2);while(++T2<U2){V2[T2]=Q2[T2+R2];}return V2;}function init(a){if(typeof a==='string'){return a.slice(0,-1);}return a.length?baseSlice(a,0,-1):[];}function last(a){if(typeof a==='string'){return a[a.length-1]||'';}return a[a.length-1];}function mapObject(fn,X2){var Y2={};for(var Z2 in X2){Y2[Z2]=fn(X2[Z2]);}return Y2;}function map(fn,b3){if(b3.length===void 0){return mapObject(fn,b3);}var c3=-1,d3=b3.length,e3=Array(d3);while(++c3<d3){e3[c3]=fn(b3[c3]);}return e3;}var f3=curry(map);function match(g3,h3){var i3=h3.match(g3);return i3===null?[]:i3;}var j3=curry(match);function merge(k3,l3){return Object.assign({},k3,l3);}var m3=curry(merge);function omit(n3,o3){if(arguments.length===1){return function(p3){return omit(n3,p3);};}if(o3===void 0||o3===null){return void 0;}if(typeof n3==='string'){n3=n3.split(',').map(function(x){return x.trim();});}var q3={};for(var r3 in o3){if(!n3.includes(r3)){q3[r3]=o3[r3];}}return q3;}function partialCurry(fn){var t3=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return function(u3){if(type(fn)==='Async'||type(fn)==='Promise'){return new Promise(function(v3,w3){fn(m3(u3,t3)).then(v3).catch(w3);});}return fn(m3(u3,t3));};}function path(x3,y3){if(arguments.length===1){return function(z3){return path(x3,z3);};}if(y3===null||y3===void 0){return void 0;}var A3=y3,B3=0;if(typeof x3==='string'){x3=x3.split('.');}while(B3<x3.length){if(A3===null||A3===void 0){return void 0;}A3=A3[x3[B3]];B3++;}return A3;}function pick(C3,D3){if(arguments.length===1){return function(E3){return pick(C3,E3);};}if(!(type(D3)==='Object')){return void 0;}if(type(C3)==='String'){C3=C3.split(',').map(function(x){return x.trim();});}var F3={},G3=0;while(G3<C3.length){if(C3[G3]in D3){F3[C3[G3]]=D3[C3[G3]];}G3++;}return F3;}function pluck(H3,I3){var J3=[];f3(function(K3){if(!(K3[H3]===void 0)){J3.push(K3[H3]);}},I3);return J3;}var L3=curry(pluck);function prepend(M3,N3){var O3=N3.concat();O3.unshift(M3);return O3;}var P3=curry(prepend);function prop(Q3,R3){return R3[Q3];}var S3=curry(prop);function propEq(T3,U3,V3){return V3[T3]===U3;}var W3=curryThree(propEq);function range(X3,Y3){for(var Z3=[],i=X3;i<Y3;i++){Z3.push(i);}return Z3;}function reduce(fn,b4,c4){return c4.reduce(fn,b4);}var d4=curryThree(reduce);function repeat(a,e4){var f4=Array(e4);return f4.fill(a);}var g4=curry(repeat);function replace(h4,i4,j4){return j4.replace(h4,i4);}var k4=curryThree(replace);function sort(fn,m4){var n4=m4.concat();return n4.sort(fn);}var o4=curry(sort);function sortBy(fn,q4){var r4=q4.concat();return r4.sort(function(a,b){var s4=fn(a),t4=fn(b);return s4<t4?-1:s4>t4?1:0;});}var u4=curry(sortBy);function split(v4,w4){return w4.split(v4);}var x4=curry(split);function splitEvery(y4,a){y4=y4>1?y4:1;var z4=[],A4=0;while(A4<a.length){z4.push(a.slice(A4,A4+=y4));}return z4;}var B4=curry(splitEvery);function tap(fn,D4){fn(D4);return D4;}var E4=curry(tap);function tail(F4){return j2(1,F4);}function take(G4,a){if(a===void 0){return function(H4){return take(G4,H4);};}else if(typeof a==='string'){return a.slice(0,G4);}return baseSlice(a,0,G4);}var I4=curry(take);function takeLast(J4,a){var K4=a.length;J4=J4>K4?K4:J4;if(typeof a==='string'){return a.slice(K4-J4);}J4=K4-J4;return baseSlice(a,J4,K4);}var L4=curry(takeLast);function test(M4,N4){return N4.search(M4)!==-1;}var O4=curry(test);function uniq(P4){var Q4=-1,R4=[];while(++Q4<P4.length){var S4=P4[Q4];if(!c2(S4,R4)){R4.push(S4);}}return R4;}function update(T4,U4,V4){var W4=V4.concat();return W4.fill(U4,T4,T4+1);}var X4=curryThree(update);function values(Y4){var Z4=[];for(var a5 in Y4){Z4.push(Y4[a5]);}return Z4;}var b5=u('+'),always=function always(x){return function(){return x;};},complement=function complement(fn){return function(d5){return!fn(d5);};},e5=oppositeHelper('concat'),f5=u('/'),g5=helper('endsWith'),F=function F(){return!1;},identity=function identity(x){return x;},h5=helper('includes'),i5=helper('join'),j5=helper('lastIndexOf'),k5=propHelper('length'),l5=u('%'),m5=u('*'),not=function not(x){return!x;},n5=helper('padEnd'),o5=helper('padStart'),p5=simpleHelper('reverse'),q5=helper('startsWith'),r5=u('-'),T=function T(){return!0;},s5=simpleHelper('toLowerCase'),t5=simpleHelper('toString'),u5=simpleHelper('toUpperCase'),v5=simpleHelper('trim');e.add=b5;e.always=always;e.complement=complement;e.concat=e5;e.divide=f5;e.endsWith=g5;e.F=F;e.identity=identity;e.includes=h5;e.join=i5;e.lastIndexOf=j5;e.length=k5;e.modulo=l5;e.multiply=m5;e.not=not;e.padEnd=n5;e.padStart=o5;e.reverse=p5;e.startsWith=q5;e.subtract=r5;e.T=T;e.toLower=s5;e.toString=t5;e.toUpper=u5;e.trim=v5;e.addIndex=addIndex;e.adjust=X;e.all=all;e.allPass=allPass;e.anyPass=anyPass;e.any=q1;e.append=A1;e.both=C1;e.compose=compose;e.contains=c2;e.curry=curry$1;e.dec=dec;e.defaultTo=defaultTo;e.drop=j2;e.dropLast=l2;e.either=n2;e.inc=inc;e.equals=X1;e.filter=j1;e.find=q2;e.findIndex=v2;e.flatten=flatten;e.flip=flip;e.has=G2;e.head=head;e.ifElse=L2;e.indexOf=P2;e.init=init;e.last=last;e.map=f3;e.match=j3;e.merge=m3;e.omit=omit;e.partialCurry=partialCurry;e.path=path;e.pick=pick;e.pluck=L3;e.prepend=P3;e.prop=S3;e.propEq=W3;e.range=range;e.reduce=d4;e.repeat=g4;e.replace=k4;e.sort=o4;e.sortBy=u4;e.split=x4;e.splitEvery=B4;e.tap=E4;e.tail=tail;e.take=I4;e.takeLast=L4;e.test=O4;e.type=type;e.uniq=uniq;e.update=X4;e.values=values;Object.defineProperty(e,'__esModule',{value:!0});});
},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.detail = exports.home = undefined;

var _hyperapp = require('hyperapp');

var _Input = require('./components/Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _Table = require('./components/Table.js');

var _Table2 = _interopRequireDefault(_Table);

var _People = require('./components/People.js');

var _People2 = _interopRequireDefault(_People);

var _Spinner = require('./components/Spinner.js');

var _Spinner2 = _interopRequireDefault(_Spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var home = exports.home = function home(state, actions) {
    return (0, _hyperapp.h)(
        'div',
        null,
        (0, _hyperapp.h)(
            'h1',
            null,
            state.text,
            (0, _hyperapp.h)('br', null)
        ),
        (0, _hyperapp.h)(_Input2.default, { text: state.text, update: actions.updateText }),
        (0, _hyperapp.h)(_Input2.default, { text: state.count, update: actions.updateCount }),
        (0, _hyperapp.h)(_Table2.default, { count: state.count, text: state.text, actions: actions }),
        state.loading == true ? (0, _hyperapp.h)(_Spinner2.default, null) : (0, _hyperapp.h)(_People2.default, { people: state.people, actions: actions }),
        state.people.previous ? (0, _hyperapp.h)(
            'button',
            { 'class': 'btn', onclick: function onclick() {
                    return actions.loadPeople(state.people.previous);
                } },
            'Prev'
        ) : null,
        state.people.next ? (0, _hyperapp.h)(
            'button',
            { 'class': 'btn', onclick: function onclick() {
                    return actions.loadPeople(state.people.next);
                } },
            'Next'
        ) : null
    );
};

var detail = exports.detail = function detail(state, actions) {
    return (0, _hyperapp.h)(
        'div',
        null,
        state.loading == true ? (0, _hyperapp.h)(_Spinner2.default, null) : (0, _hyperapp.h)(
            'div',
            null,
            state.person.name
        )
    );
};

},{"./components/Input.js":2,"./components/People.js":3,"./components/Spinner.js":5,"./components/Table.js":6,"hyperapp":9}]},{},[7]);
