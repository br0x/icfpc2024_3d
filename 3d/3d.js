"use strict";
(() => {
  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var t;
  var i;
  var o;
  var r;
  var f;
  var e;
  var c;
  var s;
  var a;
  var h = {};
  var p = [];
  var v = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var y = Array.isArray;
  function d(n2, l3) {
    for (var u4 in l3) n2[u4] = l3[u4];
    return n2;
  }
  function w(n2) {
    var l3 = n2.parentNode;
    l3 && l3.removeChild(n2);
  }
  function _(l3, u4, t3) {
    var i4, o3, r3, f4 = {};
    for (r3 in u4) "key" == r3 ? i4 = u4[r3] : "ref" == r3 ? o3 = u4[r3] : f4[r3] = u4[r3];
    if (arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps) for (r3 in l3.defaultProps) void 0 === f4[r3] && (f4[r3] = l3.defaultProps[r3]);
    return g(l3, f4, i4, o3, null);
  }
  function g(n2, t3, i4, o3, r3) {
    var f4 = { type: n2, props: t3, key: i4, ref: o3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == r3 ? ++u : r3, __i: -1, __u: 0 };
    return null == r3 && null != l.vnode && l.vnode(f4), f4;
  }
  function k(n2) {
    return n2.children;
  }
  function b(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function x(n2, l3) {
    if (null == l3) return n2.__ ? x(n2.__, n2.__i + 1) : null;
    for (var u4; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) return u4.__e;
    return "function" == typeof n2.type ? x(n2) : null;
  }
  function C(n2) {
    var l3, u4;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) {
        n2.__e = n2.__c.base = u4.__e;
        break;
      }
      return C(n2);
    }
  }
  function M(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !P.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(P);
  }
  function P() {
    var n2, u4, t3, o3, r3, e3, c3, s3;
    for (i.sort(f); n2 = i.shift(); ) n2.__d && (u4 = i.length, o3 = void 0, e3 = (r3 = (t3 = n2).__v).__e, c3 = [], s3 = [], t3.__P && ((o3 = d({}, r3)).__v = r3.__v + 1, l.vnode && l.vnode(o3), O(t3.__P, o3, r3, t3.__n, t3.__P.namespaceURI, 32 & r3.__u ? [e3] : null, c3, null == e3 ? x(r3) : e3, !!(32 & r3.__u), s3), o3.__v = r3.__v, o3.__.__k[o3.__i] = o3, j(c3, o3, s3), o3.__e != e3 && C(o3)), i.length > u4 && i.sort(f));
    P.__r = 0;
  }
  function S(n2, l3, u4, t3, i4, o3, r3, f4, e3, c3, s3) {
    var a3, v3, y3, d3, w3, _2 = t3 && t3.__k || p, g2 = l3.length;
    for (u4.__d = e3, $(u4, l3, _2), e3 = u4.__d, a3 = 0; a3 < g2; a3++) null != (y3 = u4.__k[a3]) && "boolean" != typeof y3 && "function" != typeof y3 && (v3 = -1 === y3.__i ? h : _2[y3.__i] || h, y3.__i = a3, O(n2, y3, v3, i4, o3, r3, f4, e3, c3, s3), d3 = y3.__e, y3.ref && v3.ref != y3.ref && (v3.ref && N(v3.ref, null, y3), s3.push(y3.ref, y3.__c || d3, y3)), null == w3 && null != d3 && (w3 = d3), 65536 & y3.__u || v3.__k === y3.__k ? (e3 && !e3.isConnected && (e3 = x(v3)), e3 = I(y3, e3, n2)) : "function" == typeof y3.type && void 0 !== y3.__d ? e3 = y3.__d : d3 && (e3 = d3.nextSibling), y3.__d = void 0, y3.__u &= -196609);
    u4.__d = e3, u4.__e = w3;
  }
  function $(n2, l3, u4) {
    var t3, i4, o3, r3, f4, e3 = l3.length, c3 = u4.length, s3 = c3, a3 = 0;
    for (n2.__k = [], t3 = 0; t3 < e3; t3++) r3 = t3 + a3, null != (i4 = n2.__k[t3] = null == (i4 = l3[t3]) || "boolean" == typeof i4 || "function" == typeof i4 ? null : "string" == typeof i4 || "number" == typeof i4 || "bigint" == typeof i4 || i4.constructor == String ? g(null, i4, null, null, null) : y(i4) ? g(k, { children: i4 }, null, null, null) : void 0 === i4.constructor && i4.__b > 0 ? g(i4.type, i4.props, i4.key, i4.ref ? i4.ref : null, i4.__v) : i4) ? (i4.__ = n2, i4.__b = n2.__b + 1, f4 = L(i4, u4, r3, s3), i4.__i = f4, o3 = null, -1 !== f4 && (s3--, (o3 = u4[f4]) && (o3.__u |= 131072)), null == o3 || null === o3.__v ? (-1 == f4 && a3--, "function" != typeof i4.type && (i4.__u |= 65536)) : f4 !== r3 && (f4 === r3 + 1 ? a3++ : f4 > r3 ? s3 > e3 - r3 ? a3 += f4 - r3 : a3-- : f4 < r3 ? f4 == r3 - 1 && (a3 = f4 - r3) : a3 = 0, f4 !== t3 + a3 && (i4.__u |= 65536))) : (o3 = u4[r3]) && null == o3.key && o3.__e && 0 == (131072 & o3.__u) && (o3.__e == n2.__d && (n2.__d = x(o3)), V(o3, o3, false), u4[r3] = null, s3--);
    if (s3) for (t3 = 0; t3 < c3; t3++) null != (o3 = u4[t3]) && 0 == (131072 & o3.__u) && (o3.__e == n2.__d && (n2.__d = x(o3)), V(o3, o3));
  }
  function I(n2, l3, u4) {
    var t3, i4;
    if ("function" == typeof n2.type) {
      for (t3 = n2.__k, i4 = 0; t3 && i4 < t3.length; i4++) t3[i4] && (t3[i4].__ = n2, l3 = I(t3[i4], l3, u4));
      return l3;
    }
    n2.__e != l3 && (u4.insertBefore(n2.__e, l3 || null), l3 = n2.__e);
    do {
      l3 = l3 && l3.nextSibling;
    } while (null != l3 && 8 === l3.nodeType);
    return l3;
  }
  function L(n2, l3, u4, t3) {
    var i4 = n2.key, o3 = n2.type, r3 = u4 - 1, f4 = u4 + 1, e3 = l3[u4];
    if (null === e3 || e3 && i4 == e3.key && o3 === e3.type && 0 == (131072 & e3.__u)) return u4;
    if (t3 > (null != e3 && 0 == (131072 & e3.__u) ? 1 : 0)) for (; r3 >= 0 || f4 < l3.length; ) {
      if (r3 >= 0) {
        if ((e3 = l3[r3]) && 0 == (131072 & e3.__u) && i4 == e3.key && o3 === e3.type) return r3;
        r3--;
      }
      if (f4 < l3.length) {
        if ((e3 = l3[f4]) && 0 == (131072 & e3.__u) && i4 == e3.key && o3 === e3.type) return f4;
        f4++;
      }
    }
    return -1;
  }
  function T(n2, l3, u4) {
    "-" === l3[0] ? n2.setProperty(l3, null == u4 ? "" : u4) : n2[l3] = null == u4 ? "" : "number" != typeof u4 || v.test(l3) ? u4 : u4 + "px";
  }
  function A(n2, l3, u4, t3, i4) {
    var o3;
    n: if ("style" === l3) if ("string" == typeof u4) n2.style.cssText = u4;
    else {
      if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l3 in t3) u4 && l3 in u4 || T(n2.style, l3, "");
      if (u4) for (l3 in u4) t3 && u4[l3] === t3[l3] || T(n2.style, l3, u4[l3]);
    }
    else if ("o" === l3[0] && "n" === l3[1]) o3 = l3 !== (l3 = l3.replace(/(PointerCapture)$|Capture$/i, "$1")), l3 = l3.toLowerCase() in n2 || "onFocusOut" === l3 || "onFocusIn" === l3 ? l3.toLowerCase().slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + o3] = u4, u4 ? t3 ? u4.u = t3.u : (u4.u = e, n2.addEventListener(l3, o3 ? s : c, o3)) : n2.removeEventListener(l3, o3 ? s : c, o3);
    else {
      if ("http://www.w3.org/2000/svg" == i4) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && l3 in n2) try {
        n2[l3] = null == u4 ? "" : u4;
        break n;
      } catch (n3) {
      }
      "function" == typeof u4 || (null == u4 || false === u4 && "-" !== l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, u4));
    }
  }
  function F(n2) {
    return function(u4) {
      if (this.l) {
        var t3 = this.l[u4.type + n2];
        if (null == u4.t) u4.t = e++;
        else if (u4.t < t3.u) return;
        return t3(l.event ? l.event(u4) : u4);
      }
    };
  }
  function O(n2, u4, t3, i4, o3, r3, f4, e3, c3, s3) {
    var a3, h3, p3, v3, w3, _2, g2, m2, x2, C2, M2, P2, $2, I2, H, L2 = u4.type;
    if (void 0 !== u4.constructor) return null;
    128 & t3.__u && (c3 = !!(32 & t3.__u), r3 = [e3 = u4.__e = t3.__e]), (a3 = l.__b) && a3(u4);
    n: if ("function" == typeof L2) try {
      if (m2 = u4.props, x2 = (a3 = L2.contextType) && i4[a3.__c], C2 = a3 ? x2 ? x2.props.value : a3.__ : i4, t3.__c ? g2 = (h3 = u4.__c = t3.__c).__ = h3.__E : ("prototype" in L2 && L2.prototype.render ? u4.__c = h3 = new L2(m2, C2) : (u4.__c = h3 = new b(m2, C2), h3.constructor = L2, h3.render = q), x2 && x2.sub(h3), h3.props = m2, h3.state || (h3.state = {}), h3.context = C2, h3.__n = i4, p3 = h3.__d = true, h3.__h = [], h3._sb = []), null == h3.__s && (h3.__s = h3.state), null != L2.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = d({}, h3.__s)), d(h3.__s, L2.getDerivedStateFromProps(m2, h3.__s))), v3 = h3.props, w3 = h3.state, h3.__v = u4, p3) null == L2.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
      else {
        if (null == L2.getDerivedStateFromProps && m2 !== v3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(m2, C2), !h3.__e && (null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(m2, h3.__s, C2) || u4.__v === t3.__v)) {
          for (u4.__v !== t3.__v && (h3.props = m2, h3.state = h3.__s, h3.__d = false), u4.__e = t3.__e, u4.__k = t3.__k, u4.__k.forEach(function(n3) {
            n3 && (n3.__ = u4);
          }), M2 = 0; M2 < h3._sb.length; M2++) h3.__h.push(h3._sb[M2]);
          h3._sb = [], h3.__h.length && f4.push(h3);
          break n;
        }
        null != h3.componentWillUpdate && h3.componentWillUpdate(m2, h3.__s, C2), null != h3.componentDidUpdate && h3.__h.push(function() {
          h3.componentDidUpdate(v3, w3, _2);
        });
      }
      if (h3.context = C2, h3.props = m2, h3.__P = n2, h3.__e = false, P2 = l.__r, $2 = 0, "prototype" in L2 && L2.prototype.render) {
        for (h3.state = h3.__s, h3.__d = false, P2 && P2(u4), a3 = h3.render(h3.props, h3.state, h3.context), I2 = 0; I2 < h3._sb.length; I2++) h3.__h.push(h3._sb[I2]);
        h3._sb = [];
      } else do {
        h3.__d = false, P2 && P2(u4), a3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
      } while (h3.__d && ++$2 < 25);
      h3.state = h3.__s, null != h3.getChildContext && (i4 = d(d({}, i4), h3.getChildContext())), p3 || null == h3.getSnapshotBeforeUpdate || (_2 = h3.getSnapshotBeforeUpdate(v3, w3)), S(n2, y(H = null != a3 && a3.type === k && null == a3.key ? a3.props.children : a3) ? H : [H], u4, t3, i4, o3, r3, f4, e3, c3, s3), h3.base = u4.__e, u4.__u &= -161, h3.__h.length && f4.push(h3), g2 && (h3.__E = h3.__ = null);
    } catch (n3) {
      u4.__v = null, c3 || null != r3 ? (u4.__e = e3, u4.__u |= c3 ? 160 : 32, r3[r3.indexOf(e3)] = null) : (u4.__e = t3.__e, u4.__k = t3.__k), l.__e(n3, u4, t3);
    }
    else null == r3 && u4.__v === t3.__v ? (u4.__k = t3.__k, u4.__e = t3.__e) : u4.__e = z(t3.__e, u4, t3, i4, o3, r3, f4, c3, s3);
    (a3 = l.diffed) && a3(u4);
  }
  function j(n2, u4, t3) {
    u4.__d = void 0;
    for (var i4 = 0; i4 < t3.length; i4++) N(t3[i4], t3[++i4], t3[++i4]);
    l.__c && l.__c(u4, n2), n2.some(function(u5) {
      try {
        n2 = u5.__h, u5.__h = [], n2.some(function(n3) {
          n3.call(u5);
        });
      } catch (n3) {
        l.__e(n3, u5.__v);
      }
    });
  }
  function z(l3, u4, t3, i4, o3, r3, f4, e3, c3) {
    var s3, a3, p3, v3, d3, _2, g2, m2 = t3.props, k3 = u4.props, b2 = u4.type;
    if ("svg" === b2 ? o3 = "http://www.w3.org/2000/svg" : "math" === b2 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != r3) {
      for (s3 = 0; s3 < r3.length; s3++) if ((d3 = r3[s3]) && "setAttribute" in d3 == !!b2 && (b2 ? d3.localName === b2 : 3 === d3.nodeType)) {
        l3 = d3, r3[s3] = null;
        break;
      }
    }
    if (null == l3) {
      if (null === b2) return document.createTextNode(k3);
      l3 = document.createElementNS(o3, b2, k3.is && k3), r3 = null, e3 = false;
    }
    if (null === b2) m2 === k3 || e3 && l3.data === k3 || (l3.data = k3);
    else {
      if (r3 = r3 && n.call(l3.childNodes), m2 = t3.props || h, !e3 && null != r3) for (m2 = {}, s3 = 0; s3 < l3.attributes.length; s3++) m2[(d3 = l3.attributes[s3]).name] = d3.value;
      for (s3 in m2) if (d3 = m2[s3], "children" == s3) ;
      else if ("dangerouslySetInnerHTML" == s3) p3 = d3;
      else if ("key" !== s3 && !(s3 in k3)) {
        if ("value" == s3 && "defaultValue" in k3 || "checked" == s3 && "defaultChecked" in k3) continue;
        A(l3, s3, null, d3, o3);
      }
      for (s3 in k3) d3 = k3[s3], "children" == s3 ? v3 = d3 : "dangerouslySetInnerHTML" == s3 ? a3 = d3 : "value" == s3 ? _2 = d3 : "checked" == s3 ? g2 = d3 : "key" === s3 || e3 && "function" != typeof d3 || m2[s3] === d3 || A(l3, s3, d3, m2[s3], o3);
      if (a3) e3 || p3 && (a3.__html === p3.__html || a3.__html === l3.innerHTML) || (l3.innerHTML = a3.__html), u4.__k = [];
      else if (p3 && (l3.innerHTML = ""), S(l3, y(v3) ? v3 : [v3], u4, t3, i4, "foreignObject" === b2 ? "http://www.w3.org/1999/xhtml" : o3, r3, f4, r3 ? r3[0] : t3.__k && x(t3, 0), e3, c3), null != r3) for (s3 = r3.length; s3--; ) null != r3[s3] && w(r3[s3]);
      e3 || (s3 = "value", void 0 !== _2 && (_2 !== l3[s3] || "progress" === b2 && !_2 || "option" === b2 && _2 !== m2[s3]) && A(l3, s3, _2, m2[s3], o3), s3 = "checked", void 0 !== g2 && g2 !== l3[s3] && A(l3, s3, g2, m2[s3], o3));
    }
    return l3;
  }
  function N(n2, u4, t3) {
    try {
      "function" == typeof n2 ? n2(u4) : n2.current = u4;
    } catch (n3) {
      l.__e(n3, t3);
    }
  }
  function V(n2, u4, t3) {
    var i4, o3;
    if (l.unmount && l.unmount(n2), (i4 = n2.ref) && (i4.current && i4.current !== n2.__e || N(i4, null, u4)), null != (i4 = n2.__c)) {
      if (i4.componentWillUnmount) try {
        i4.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u4);
      }
      i4.base = i4.__P = null;
    }
    if (i4 = n2.__k) for (o3 = 0; o3 < i4.length; o3++) i4[o3] && V(i4[o3], u4, t3 || "function" != typeof n2.type);
    t3 || null == n2.__e || w(n2.__e), n2.__c = n2.__ = n2.__e = n2.__d = void 0;
  }
  function q(n2, l3, u4) {
    return this.constructor(n2, u4);
  }
  function B(u4, t3, i4) {
    var o3, r3, f4, e3;
    l.__ && l.__(u4, t3), r3 = (o3 = "function" == typeof i4) ? null : i4 && i4.__k || t3.__k, f4 = [], e3 = [], O(t3, u4 = (!o3 && i4 || t3).__k = _(k, null, [u4]), r3 || h, h, t3.namespaceURI, !o3 && i4 ? [i4] : r3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, f4, !o3 && i4 ? i4 : r3 ? r3.__e : t3.firstChild, o3, e3), j(f4, u4, e3);
  }
  n = p.slice, l = { __e: function(n2, l3, u4, t3) {
    for (var i4, o3, r3; l3 = l3.__; ) if ((i4 = l3.__c) && !i4.__) try {
      if ((o3 = i4.constructor) && null != o3.getDerivedStateFromError && (i4.setState(o3.getDerivedStateFromError(n2)), r3 = i4.__d), null != i4.componentDidCatch && (i4.componentDidCatch(n2, t3 || {}), r3 = i4.__d), r3) return i4.__E = i4;
    } catch (l4) {
      n2 = l4;
    }
    throw n2;
  } }, u = 0, t = function(n2) {
    return null != n2 && null == n2.constructor;
  }, b.prototype.setState = function(n2, l3) {
    var u4;
    u4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = d({}, this.state), "function" == typeof n2 && (n2 = n2(d({}, u4), this.props)), n2 && d(u4, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), M(this));
  }, b.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
  }, b.prototype.render = k, i = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n2, l3) {
    return n2.__v.__b - l3.__v.__b;
  }, P.__r = 0, e = 0, c = F(false), s = F(true), a = 0;

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var r2;
  var u2;
  var i2;
  var o2 = 0;
  var f2 = [];
  var c2 = [];
  var e2 = l;
  var a2 = e2.__b;
  var v2 = e2.__r;
  var l2 = e2.diffed;
  var m = e2.__c;
  var s2 = e2.unmount;
  var d2 = e2.__;
  function h2(n2, t3) {
    e2.__h && e2.__h(r2, n2, o2 || t3), o2 = 0;
    var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n2 >= u4.__.length && u4.__.push({ __V: c2 }), u4.__[n2];
  }
  function p2(n2) {
    return o2 = 1, y2(D, n2);
  }
  function y2(n2, u4, i4) {
    var o3 = h2(t2++, 2);
    if (o3.t = n2, !o3.__c && (o3.__ = [i4 ? i4(u4) : D(void 0, u4), function(n3) {
      var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
      t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
    }], o3.__c = r2, !r2.u)) {
      var f4 = function(n3, t3, r3) {
        if (!o3.__c.__H) return true;
        var u5 = o3.__c.__H.__.filter(function(n4) {
          return !!n4.__c;
        });
        if (u5.every(function(n4) {
          return !n4.__N;
        })) return !c3 || c3.call(this, n3, t3, r3);
        var i5 = false;
        return u5.forEach(function(n4) {
          if (n4.__N) {
            var t4 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i5 = true);
          }
        }), !(!i5 && o3.__c.props === n3) && (!c3 || c3.call(this, n3, t3, r3));
      };
      r2.u = true;
      var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n3, t3, r3) {
        if (this.__e) {
          var u5 = c3;
          c3 = void 0, f4(n3, t3, r3), c3 = u5;
        }
        e3 && e3.call(this, n3, t3, r3);
      }, r2.shouldComponentUpdate = f4;
    }
    return o3.__N || o3.__;
  }
  function j2() {
    for (var n2; n2 = f2.shift(); ) if (n2.__P && n2.__H) try {
      n2.__H.__h.forEach(z2), n2.__H.__h.forEach(B2), n2.__H.__h = [];
    } catch (t3) {
      n2.__H.__h = [], e2.__e(t3, n2.__v);
    }
  }
  e2.__b = function(n2) {
    r2 = null, a2 && a2(n2);
  }, e2.__ = function(n2, t3) {
    n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), d2 && d2(n2, t3);
  }, e2.__r = function(n2) {
    v2 && v2(n2), t2 = 0;
    var i4 = (r2 = n2.__c).__H;
    i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.__V = c2, n3.__N = n3.i = void 0;
    })) : (i4.__h.forEach(z2), i4.__h.forEach(B2), i4.__h = [], t2 = 0)), u2 = r2;
  }, e2.diffed = function(n2) {
    l2 && l2(n2);
    var t3 = n2.__c;
    t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === e2.requestAnimationFrame || ((i2 = e2.requestAnimationFrame) || w2)(j2)), t3.__H.__.forEach(function(n3) {
      n3.i && (n3.__H = n3.i), n3.__V !== c2 && (n3.__ = n3.__V), n3.i = void 0, n3.__V = c2;
    })), u2 = r2 = null;
  }, e2.__c = function(n2, t3) {
    t3.some(function(n3) {
      try {
        n3.__h.forEach(z2), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B2(n4);
        });
      } catch (r3) {
        t3.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t3 = [], e2.__e(r3, n3.__v);
      }
    }), m && m(n2, t3);
  }, e2.unmount = function(n2) {
    s2 && s2(n2);
    var t3, r3 = n2.__c;
    r3 && r3.__H && (r3.__H.__.forEach(function(n3) {
      try {
        z2(n3);
      } catch (n4) {
        t3 = n4;
      }
    }), r3.__H = void 0, t3 && e2.__e(t3, r3.__v));
  };
  var k2 = "function" == typeof requestAnimationFrame;
  function w2(n2) {
    var t3, r3 = function() {
      clearTimeout(u4), k2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u4 = setTimeout(r3, 100);
    k2 && (t3 = requestAnimationFrame(r3));
  }
  function z2(n2) {
    var t3 = r2, u4 = n2.__c;
    "function" == typeof u4 && (n2.__c = void 0, u4()), r2 = t3;
  }
  function B2(n2) {
    var t3 = r2;
    n2.__c = n2.__(), r2 = t3;
  }
  function D(n2, t3) {
    return "function" == typeof t3 ? t3(n2) : t3;
  }

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var f3 = 0;
  var i3 = Array.isArray;
  function u3(e3, t3, n2, o3, i4, u4) {
    t3 || (t3 = {});
    var a3, c3, p3 = t3;
    if ("ref" in p3) for (c3 in p3 = {}, t3) "ref" == c3 ? a3 = t3[c3] : p3[c3] = t3[c3];
    var l3 = { type: e3, props: p3, key: n2, ref: a3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --f3, __i: -1, __u: 0, __source: i4, __self: u4 };
    if ("function" == typeof e3 && (a3 = e3.defaultProps)) for (c3 in a3) void 0 === p3[c3] && (p3[c3] = a3[c3]);
    return l.vnode && l.vnode(l3), l3;
  }

  // 3d.tsx
  var Op = /* @__PURE__ */ ((Op2) => {
    Op2["Empty"] = " ";
    Op2["Left"] = "<";
    Op2["Right"] = ">";
    Op2["Up"] = "^";
    Op2["Down"] = "v";
    Op2["Add"] = "+";
    Op2["Sub"] = "-";
    Op2["Mul"] = "*";
    Op2["Div"] = "/";
    Op2["Mod"] = "%";
    Op2["TimeTravel"] = "@";
    Op2["Eq"] = "=";
    Op2["NEq"] = "#";
    Op2["Solve"] = "S";
    Op2["A"] = "A";
    Op2["B"] = "B";
    return Op2;
  })(Op || {});
  var OP_SYMBOLS = new Set(Object.values(Op));
  var Board;
  ((Board2) => {
    function parse(s3) {
      let board = s3.split("\n").map((row) => row.split(/\s+/).map((c3) => {
        if (OP_SYMBOLS.has(c3)) return c3;
        if (c3 === "." || c3 === "") return " " /* Empty */;
        const num = parseInt(c3, 10);
        if (!isNaN(num)) return num;
        throw new Error("invalid cell: " + c3);
      }));
      board = trim(board);
      board = ensure(board, 0, 0);
      return board;
    }
    Board2.parse = parse;
    function ensure(board, x2, y3) {
      x2 = board.reduce((max, row) => Math.max(max, row.length - 1), x2);
      board = board.map((row) => row.slice());
      while (board.length < y3 + 1) {
        board.push([]);
      }
      for (const row of board) {
        while (row.length < x2 + 1) row.push(" " /* Empty */);
      }
      return board;
    }
    Board2.ensure = ensure;
    function trim(board) {
      board = board.map((row) => {
        let end = row.length;
        while (end > 0 && row[end - 1] === " " /* Empty */) end--;
        return row.slice(0, end);
      });
      while (board.length > 0 && board[board.length - 1].length === 0) {
        board.pop();
      }
      return board;
    }
    Board2.trim = trim;
    function encode(board) {
      return trim(board).map((row) => {
        const line = row.map((c3) => c3 === " " /* Empty */ ? "." : c3).join(" ");
        if (line === "") return ".";
        return line;
      }).join("\n");
    }
    Board2.encode = encode;
    function eq(b1, b2) {
      if (b1.length !== b2.length) return false;
      for (let i4 = 0; i4 < b1.length; i4++) {
        if (b1[i4].length !== b2[i4].length) return false;
        for (let j3 = 0; j3 < b1[i4].length; j3++) {
          if (b1[i4][j3] !== b2[i4][j3]) return false;
        }
      }
      return true;
    }
    Board2.eq = eq;
  })(Board || (Board = {}));
  var Eval;
  ((Eval2) => {
    function initialize(board, a3, b2) {
      return board.map((row) => row.map((cell) => {
        if (cell === "A" /* A */) return a3;
        if (cell === "B" /* B */) return b2;
        return cell;
      }));
    }
    Eval2.initialize = initialize;
    function step(board, history) {
      const writes = /* @__PURE__ */ new Map();
      let out = board;
      function write(x2, y3, cell) {
        out = Board.ensure(out, x2, y3);
        if (y3 < board.length && x2 < board[0].length && board[y3][x2] === "S" /* Solve */) {
          if (typeof cell === "number") {
            throw new Error(`solved: ${cell}`);
          }
        }
        out[y3][x2] = cell;
        if (cell === " " /* Empty */) return;
        const key = `${x2},${y3}`;
        const prev = writes.get(key);
        if (prev !== void 0) {
          throw new Error(`multiple writes to ${key}: ${prev} / ${cell}`);
        }
        writes.set(key, cell);
      }
      function consume(x2, y3) {
        const op = board[y3][x2];
        if (op === " " /* Empty */) return;
        write(x2, y3, " " /* Empty */);
        return op;
      }
      function move(x2, y3, dx, dy) {
        const sx = x2 - dx;
        const sy = y3 - dy;
        dx = x2 + dx;
        dy = y3 + dy;
        if (sx < 0 || sy < 0) return;
        if (dx < 0 || dy < 0) return;
        if (sx >= board[0].length || sy >= board.length) return;
        const cell = consume(sx, sy);
        if (cell === void 0) return;
        write(dx, dy, cell);
      }
      function mathOp(x2, y3, f4) {
        if (typeof board[y3][x2 - 1] !== "number") return;
        if (typeof board[y3 - 1][x2] !== "number") return;
        const l3 = consume(x2 - 1, y3);
        const u4 = consume(x2, y3 - 1);
        const cell = f4(l3, u4);
        if (cell === void 0) return;
        write(x2, y3 + 1, cell);
        write(x2 + 1, y3, cell);
      }
      function eq(x2, y3, eq2) {
        const l3 = board[y3][x2 - 1];
        const u4 = board[y3 - 1][x2];
        if (l3 === " " /* Empty */) return;
        if (u4 === " " /* Empty */) return;
        if (eq2) {
          if (l3 !== u4) return;
        } else {
          if (l3 === u4) return;
        }
        write(x2, y3 + 1, consume(x2 - 1, y3));
        write(x2 + 1, y3, consume(x2, y3 - 1));
      }
      const timeTravels = [];
      function saveTimeTravel(x2, y3) {
        if (y3 + 1 >= board.length) return;
        if (x2 + 1 >= board[0].length) return;
        const dx = board[y3][x2 - 1];
        if (typeof dx !== "number") return;
        const dy = board[y3][x2 + 1];
        if (typeof dy !== "number") return;
        const v3 = board[y3 - 1][x2];
        if (typeof v3 !== "number") return;
        const dt = board[y3 + 1][x2];
        if (typeof dt !== "number") return;
        timeTravels.push({ x: x2 - dx, y: y3 - dy, v: v3, dt });
      }
      let solve;
      for (let y3 = 0; y3 < board.length; y3++) {
        for (let x2 = 0; x2 < board[y3].length; x2++) {
          const cell = board[y3][x2];
          switch (cell) {
            case " " /* Empty */:
              break;
            case "A" /* A */:
              break;
            case "B" /* B */:
              break;
            case "^" /* Up */:
              move(x2, y3, 0, -1);
              break;
            case "v" /* Down */:
              move(x2, y3, 0, 1);
              break;
            case "<" /* Left */:
              move(x2, y3, -1, 0);
              break;
            case ">" /* Right */:
              move(x2, y3, 1, 0);
              break;
            case "+" /* Add */:
              mathOp(x2, y3, (l3, u4) => l3 + u4);
              break;
            case "-" /* Sub */:
              mathOp(x2, y3, (l3, u4) => l3 - u4);
              break;
            case "*" /* Mul */:
              mathOp(x2, y3, (l3, u4) => l3 * u4);
              break;
            case "/" /* Div */:
              mathOp(x2, y3, (l3, u4) => Math.trunc(l3 / u4));
              break;
            case "%" /* Mod */:
              mathOp(x2, y3, (l3, u4) => l3 % u4);
              break;
            case "=" /* Eq */:
              eq(x2, y3, true);
              break;
            case "#" /* NEq */:
              eq(x2, y3, false);
              break;
            case "S" /* Solve */:
              break;
            case "@" /* TimeTravel */:
              saveTimeTravel(x2, y3);
              break;
            default:
              if (typeof cell === "number") break;
              throw new Error(`unhandled op: ${cell}`);
          }
        }
      }
      if (timeTravels.length > 0) {
        writes.clear();
        let dt = timeTravels[0].dt;
        if (dt < 1) {
          throw new Error("invalid dt");
        }
        if (timeTravels.some((t3) => t3.dt !== dt)) {
          throw new Error("time travels must all have the same dt");
        }
        history.pop();
        for (; dt > 0; --dt) {
          out = history.pop();
        }
        out = Board.ensure(out, 0, 0);
        for (let { x: x2, y: y3, v: v3 } of timeTravels) {
          write(x2, y3, v3);
        }
      }
      return out;
    }
    Eval2.step = step;
  })(Eval || (Eval = {}));
  function Grid(props) {
    const { board } = props;
    const tabindex = props.edit ? 0 : void 0;
    const trs = board.map((row, y3) => {
      const tds = row.map((cell, x2) => {
        const text = cell === " " ? "\xA0" : cell;
        return /* @__PURE__ */ u3(
          "td",
          {
            "data-x": x2,
            "data-y": y3,
            tabindex,
            children: text
          }
        );
      });
      return /* @__PURE__ */ u3("tr", { children: tds });
    });
    function onKeyDown(e3) {
      const target = e3.target;
      if (target.tagName !== "TD") return;
      e3.preventDefault();
      let [x2, y3] = [parseInt(target.dataset.x), parseInt(target.dataset.y)];
      const table = target.parentElement.parentElement;
      switch (e3.key) {
        case "ArrowUp":
          table.rows[y3 - 1]?.cells[x2]?.focus();
          break;
        case "ArrowDown":
          table.rows[y3 + 1]?.cells[x2]?.focus();
          break;
        case "ArrowLeft":
          table.rows[y3]?.cells[x2 - 1]?.focus();
          break;
        case "ArrowRight":
          table.rows[y3]?.cells[x2 + 1]?.focus();
          break;
      }
      if (props.edit) {
        let cell;
        switch (e3.key) {
          case "a":
            cell = "A" /* A */;
            break;
          case "b":
            cell = "B" /* B */;
            break;
          case "s":
            cell = "S" /* Solve */;
            break;
          case "~": {
            const n2 = board[y3][x2];
            if (typeof n2 === "number") {
              cell = -n2;
            }
            break;
          }
          case "Backspace":
            cell = " " /* Empty */;
            break;
          case "ArrowDown":
            if (y3 === board.length - 1) {
              cell = " " /* Empty */;
              y3 += 1;
            }
            break;
          case "ArrowRight":
            if (x2 === board[0].length - 1) {
              cell = " " /* Empty */;
              x2 += 1;
            }
            break;
          default:
            if (OP_SYMBOLS.has(e3.key)) {
              cell = e3.key;
            }
            if (e3.key >= "0" && e3.key <= "9") {
              cell = parseInt(e3.key);
            }
        }
        if (cell !== void 0) {
          props.edit(x2, y3, cell);
        }
      }
    }
    return /* @__PURE__ */ u3("table", { class: "grid", onKeyDown, children: trs });
  }
  function App(props) {
    let [board, setBoard] = p2(props.initial);
    const [a3, setA] = p2(0);
    const [b2, setB] = p2(0);
    function setBoardAndURL(board2) {
      window.history.replaceState(null, "", "?" + encodeURIComponent(Board.encode(board2)));
      setBoard(board2);
    }
    function onEdit(x2, y3, cell) {
      board = Board.ensure(board, x2, y3);
      board[y3][x2] = cell;
      setBoardAndURL(board);
    }
    function onInput(e3, set) {
      const value = parseInt(e3.target.value, 10);
      if (isNaN(value)) return;
      set(value);
    }
    function onA(e3) {
      onInput(e3, setA);
    }
    function onB(e3) {
      onInput(e3, setB);
    }
    let step = Eval.initialize(board, a3, b2);
    const boards = [];
    const grids = [];
    for (let i4 = 0; i4 < 50; i4++) {
      boards.push(step);
      grids.push(/* @__PURE__ */ u3("div", { class: "grid", children: [
        "t=",
        boards.length,
        /* @__PURE__ */ u3("br", {}),
        /* @__PURE__ */ u3(Grid, { board: step })
      ] }));
      let next;
      try {
        next = Eval.step(step, boards);
      } catch (e3) {
        grids.push(/* @__PURE__ */ u3("p", { children: [
          "Error: ",
          e3.message
        ] }));
        break;
      }
      if (typeof next === "number") {
        grids.push(/* @__PURE__ */ u3("p", { children: [
          "Solved: ",
          next
        ] }));
        break;
      }
      if (Board.eq(step, next)) break;
      step = next;
    }
    function onSubmit(e3) {
      e3.preventDefault();
      const form = e3.target;
      const text = form.elements.namedItem("text").value;
      const board2 = Board.parse(text);
      setBoardAndURL(board2);
    }
    return /* @__PURE__ */ u3(k, { children: [
      /* @__PURE__ */ u3("h1", { children: "3d" }),
      /* @__PURE__ */ u3("div", { style: { display: "flex" }, children: [
        /* @__PURE__ */ u3(Grid, { board, edit: onEdit }),
        /* @__PURE__ */ u3("div", { style: { width: "1em" } }),
        /* @__PURE__ */ u3("form", { onSubmit, children: [
          /* @__PURE__ */ u3("textarea", { name: "text", rows: board.length, cols: board[0].length * 2, children: Board.encode(board) }),
          /* @__PURE__ */ u3("br", {}),
          /* @__PURE__ */ u3("input", { type: "submit", value: "load" })
        ] })
      ] }),
      /* @__PURE__ */ u3("br", {}),
      /* @__PURE__ */ u3("p", { children: [
        /* @__PURE__ */ u3("label", { children: [
          "A: ",
          /* @__PURE__ */ u3("input", { size: 4, value: a3, onInput: onA })
        ] }),
        " ",
        /* @__PURE__ */ u3("label", { children: [
          "B: ",
          /* @__PURE__ */ u3("input", { size: 4, value: b2, onInput: onB })
        ] })
      ] }),
      grids
    ] });
    ;
  }
  var initialBoard = Board.parse(decodeURIComponent(location.search.slice(1)));
  initialBoard = Board.ensure(initialBoard, 4, 4);
  B(/* @__PURE__ */ u3(App, { initial: initialBoard }), document.body);
})();
//# sourceMappingURL=3d.js.map
