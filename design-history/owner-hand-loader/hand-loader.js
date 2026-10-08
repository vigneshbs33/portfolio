/*!
 * Hand Loader: 21 landmarks lock onto a hand, it pinches, and the page opens from the fingertip.
 * Zero dependencies. Works with any site.
 *
 * Usage:
 *   <script src="hand-loader.js"></script>
 *   <script>HandLoader.start({ name: "Your Name" });</script>
 */
(function (global) {
  "use strict";

  var BONES = [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]];
  var OPEN = [[.5,.92],[.36,.84],[.25,.74],[.17,.64],[.1,.55],[.38,.52],[.35,.36],[.33,.25],[.315,.15],[.49,.5],[.49,.32],[.49,.2],[.49,.09],[.59,.52],[.62,.36],[.64,.25],[.655,.16],[.68,.57],[.73,.45],[.76,.37],[.79,.29]];
  var PINCH = [[.5,.92],[.37,.83],[.3,.72],[.29,.62],[.315,.535],[.4,.55],[.37,.41],[.33,.45],[.322,.525],[.5,.51],[.5,.34],[.5,.23],[.5,.13],[.6,.53],[.62,.38],[.635,.28],[.645,.19],[.68,.58],[.72,.47],[.75,.39],[.775,.32]];
  var NS = "http://www.w3.org/2000/svg";
  var S = 100;

  function easeOut(t) { return 1 - Math.pow(1 - t, 4); }
  function easeInOut(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function clamp(t) { return Math.max(0, Math.min(1, t)); }

  function css(o) {
    var mask = "radial-gradient(circle at var(--mx) var(--my), transparent var(--r), #000 calc(var(--r) + 1px))";
    return [
      ".hl{position:fixed;inset:0;z-index:" + o.zIndex + ";background:" + o.background + ";display:grid;place-items:center;--r:0vmax;--mx:50%;--my:50%;-webkit-mask-image:" + mask + ";mask-image:" + mask + "}",
      ".hl__stage{display:grid;justify-items:center;gap:28px}",
      ".hl__hand{width:min(46vmin,340px);height:auto;overflow:visible}",
      ".hl__bone{stroke:" + o.ink + ";stroke-width:.35;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;opacity:.7}",
      ".hl__dot{fill:" + o.ink + "}",
      ".hl__dot.tip{fill:" + o.accent + "}",
      ".hl__ring{fill:none;stroke:" + o.accent + ";stroke-width:.4}",
      ".hl__word{display:grid;justify-items:center;gap:10px;opacity:0;color:" + o.ink + "}",
      ".hl__name{font-family:" + o.nameFont + ";font-size:clamp(34px,4.4vw,52px);line-height:1;letter-spacing:-.01em}",
      ".hl__cap{display:flex;gap:14px;font-family:" + o.monoFont + ";font-size:11.5px;letter-spacing:.04em;opacity:.6}",
      ".hl__cap b{font-weight:500}",
      "@media print{.hl{display:none}}"
    ].join("\n");
  }

  function el(tag, cls, ns) {
    var e = ns ? document.createElementNS(NS, tag) : document.createElement(tag);
    if (cls) e.setAttribute("class", cls);
    return e;
  }

  function start(opts) {
    var o = Object.assign({
      name: "",
      caption: "Locking landmarks",
      captionDone: "Pinch detected",
      background: "#f1eee6",
      ink: "#1c1a17",
      accent: "#e4462b",
      nameFont: "'Instrument Serif', Georgia, serif",
      monoFont: "ui-monospace, Menlo, Consolas, monospace",
      zIndex: 9999,
      oncePerSession: true,
      sessionKey: "hand-loader",
      onDone: null
    }, opts || {});

    function done() { if (typeof o.onDone === "function") o.onDone(); }
    var noop = { skip: function () {} };

    try { if (o.oncePerSession && sessionStorage.getItem(o.sessionKey)) { done(); return noop; } } catch (e) {}
    if (global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches) { done(); return noop; }

    var style = el("style");
    style.textContent = css(o);
    document.head.appendChild(style);

    // build DOM
    var root = el("div", "hl");
    root.setAttribute("aria-hidden", "true");
    var stage = el("div", "hl__stage");
    var svg = el("svg", "hl__hand", true);
    svg.setAttribute("viewBox", "0 0 100 100");
    var word = el("div", "hl__word");
    if (o.name) { var nm = el("span", "hl__name"); nm.textContent = o.name; word.appendChild(nm); }
    var cap = el("span", "hl__cap");
    var msg = el("span"); msg.textContent = o.caption;
    var cnt = el("span"); var count = el("b"); count.textContent = "00";
    cnt.appendChild(count); cnt.appendChild(document.createTextNode("/21"));
    cap.appendChild(msg); cap.appendChild(cnt); word.appendChild(cap);
    stage.appendChild(svg); stage.appendChild(word); root.appendChild(stage);
    document.body.appendChild(root);

    var bones = BONES.map(function () {
      var l = el("line", "hl__bone", true);
      l.setAttribute("pathLength", "1");
      svg.appendChild(l);
      return l;
    });
    var dots = OPEN.map(function (_, i) {
      var c = el("circle", i === 8 ? "hl__dot tip" : "hl__dot", true);
      c.setAttribute("r", i === 8 ? "1.7" : "1.15");
      svg.appendChild(c);
      return c;
    });
    var ring = el("circle", "hl__ring", true);
    ring.setAttribute("r", "0");
    svg.appendChild(ring);

    var scatter = OPEN.map(function (_, i) {
      var a = i * 2.399963, r = 46 + ((i * 37) % 23);
      return [0.5 + Math.cos(a) * r / 100, 0.5 + Math.sin(a) * r / 100];
    });

    var html = document.documentElement;
    var prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    var t0 = performance.now(), opened = false, switched = false, finished = false, raf;

    function frame(now) {
      var t = now - t0;
      var k = easeInOut(clamp((t - 1500) / 420));
      var pose = OPEN.map(function (p, i) { return [p[0] + (PINCH[i][0] - p[0]) * k, p[1] + (PINCH[i][1] - p[1]) * k]; });

      // 1. points fly in
      pose.forEach(function (p, i) {
        var e = easeOut(clamp((t - i * 26) / 760));
        dots[i].setAttribute("cx", ((scatter[i][0] + (p[0] - scatter[i][0]) * e) * S).toFixed(2));
        dots[i].setAttribute("cy", ((scatter[i][1] + (p[1] - scatter[i][1]) * e) * S).toFixed(2));
        dots[i].style.opacity = String(clamp(t / 200 - i * 0.04) * 0.9 + 0.1);
      });
      // 2. bones draw
      BONES.forEach(function (b, i) {
        var a = pose[b[0]], c = pose[b[1]], l = bones[i];
        l.setAttribute("x1", (a[0] * S).toFixed(2)); l.setAttribute("y1", (a[1] * S).toFixed(2));
        l.setAttribute("x2", (c[0] * S).toFixed(2)); l.setAttribute("y2", (c[1] * S).toFixed(2));
        l.style.strokeDashoffset = String(1 - easeOut(clamp((t - 650 - i * 28) / 520)));
      });
      // 3. counter, caption, name
      count.textContent = ("0" + Math.round(21 * easeOut(clamp((t - 200) / 1150)))).slice(-2);
      if (t > 1500 && !switched) { switched = true; msg.textContent = o.captionDone; }
      var w = easeOut(clamp((t - 450) / 700));
      word.style.opacity = String(w * (1 - clamp((t - 2000) / 300)));
      word.style.filter = "blur(" + (1 - w) * 8 + "px)";
      word.style.transform = "translateY(" + (1 - w) * 12 + "px)";
      // 4. pinch ring, then the page opens through the fingertip
      var tip = pose[8], rr = clamp((t - 1850) / 450);
      ring.setAttribute("cx", (tip[0] * S).toFixed(2));
      ring.setAttribute("cy", (tip[1] * S).toFixed(2));
      ring.setAttribute("r", (1.6 + rr * 9).toFixed(2));
      ring.style.opacity = String(rr > 0 ? 1 - rr : 0);
      if (t > 1900) {
        if (!opened) {
          opened = true;
          var box = svg.getBoundingClientRect();
          root.style.setProperty("--mx", box.left + tip[0] * box.width + "px");
          root.style.setProperty("--my", box.top + tip[1] * box.height + "px");
        }
        root.style.setProperty("--r", (easeInOut(clamp((t - 1950) / 900)) * 160).toFixed(2) + "vmax");
      }
      if (t < 2900) raf = requestAnimationFrame(frame);
      else finish();
    }

    function finish() {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      global.removeEventListener("keydown", finish);
      try { if (o.oncePerSession) sessionStorage.setItem(o.sessionKey, "1"); } catch (e) {}
      html.style.overflow = prevOverflow;
      if (root.parentNode) root.parentNode.removeChild(root);
      if (style.parentNode) style.parentNode.removeChild(style);
      done();
    }

    global.addEventListener("keydown", finish); // any key skips
    raf = requestAnimationFrame(frame);
    return { skip: finish };
  }

  global.HandLoader = { start: start };
})(window);
