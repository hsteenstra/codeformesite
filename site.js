/* =========================================================
   CODE FOR ME — site behavior
   Shared by every page. Each feature checks that its
   elements exist, so pages only get what they use.
   ========================================================= */

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.querySelector(".site-header");
  var progressBar = document.querySelector(".scroll-progress");
  var toTop = document.querySelector(".to-top");

  /* ---------- Mobile menu ---------- */

  var menuBtn = document.querySelector(".menu-btn");
  if (menuBtn && header) {
    var setMenu = function (open) {
      header.classList.toggle("menu-open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    };
    menuBtn.addEventListener("click", function () {
      setMenu(!header.classList.contains("menu-open"));
    });
    header.querySelectorAll(".nav a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("menu-open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  /* ---------- Back to top ---------- */

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Reveal on scroll ---------- */

  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  // Stagger children of [data-stagger] groups
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    group.querySelectorAll("[data-reveal]").forEach(function (el, i) {
      el.style.setProperty("--i", i);
    });
  });

  /* ---------- Typing code card (home hero) ---------- */

  var typeOut = document.querySelector("[data-type]");
  if (typeOut) {
    var message = typeOut.getAttribute("data-type");
    if (reduceMotion) {
      typeOut.textContent = message;
    } else {
      var caret = document.createElement("span");
      caret.className = "caret";
      var textNode = document.createTextNode("");
      typeOut.appendChild(textNode);
      typeOut.appendChild(caret);
      var n = 0;
      setTimeout(function tick() {
        n += 1;
        textNode.textContent = message.slice(0, n);
        if (n < message.length) setTimeout(tick, 55);
      }, 900);
    }
  }

  /* ---------- Section trackers (levels + CodeCourse) ---------- */
  // Highlights the nav link for whichever section has reached the middle of the screen.

  var trackers = [];

  function trackSections(sections, links) {
    if (!sections.length || !links.length) return;
    trackers.push({ sections: sections, links: links, current: null });
  }

  function updateTrackers(vh) {
    trackers.forEach(function (t) {
      var index = -1;
      t.sections.forEach(function (section, i) {
        if (section.getBoundingClientRect().top <= vh * 0.45) index = i;
      });
      if (index === t.current) return;
      t.current = index;
      var id = index >= 0 ? t.sections[index].id : null;
      t.links.forEach(function (link) {
        var i = t.sections.findIndex(function (s) { return link.getAttribute("href") === "#" + s.id; });
        var match = id && i === index;
        link.classList.toggle("is-active", !!match);
        link.classList.toggle("is-passed", i > -1 && i < index);
        // Keep the active tab visible in horizontal tab bars (mobile)
        var bar = match && link.closest(".levels__tabs, .path-nav ol");
        if (bar && bar.scrollWidth > bar.clientWidth) {
          bar.scrollTo({ left: link.offsetLeft - 24, behavior: reduceMotion ? "auto" : "smooth" });
        }
      });
    });
  }

  var toArray = function (list) { return Array.prototype.slice.call(list); };
  var levelSections = toArray(document.querySelectorAll(".level"));
  trackSections(levelSections, toArray(document.querySelectorAll(".levels__rail ol a, .levels__tabs a")));
  trackSections(toArray(document.querySelectorAll(".unit")), toArray(document.querySelectorAll(".path-nav-link")));

  var rail = document.querySelector(".levels__rail ol");
  var levelsWrap = document.querySelector(".levels__content");

  /* ---------- Scroll-driven effects ---------- */

  var ticker = document.querySelector(".ticker__track");
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var hscroll = document.querySelector(".hscroll");
  var hTrack = hscroll && hscroll.querySelector(".hscroll__track");
  var hBar = hscroll && hscroll.querySelector(".hscroll__bar span");
  var timeline = document.querySelector(".timeline");
  var timelineFill = timeline && timeline.querySelector(".timeline__fill");

  // Pin the photo gallery and scroll it sideways on wide screens
  function setupHScroll() {
    if (!hscroll || !hTrack) return;
    var canPin = !reduceMotion && window.innerWidth > 900;
    hscroll.classList.toggle("is-pinned", canPin);
    if (canPin) {
      var distance = hTrack.scrollWidth - window.innerWidth;
      hscroll.style.height = (window.innerHeight + Math.max(distance, 0)) + "px";
      hscroll.dataset.distance = Math.max(distance, 0);
    } else {
      hscroll.style.height = "";
      hTrack.style.transform = "";
    }
  }

  function clamp(n, min, max) { return Math.min(Math.max(n, min), max); }

  function onScroll() {
    var y = window.scrollY;
    var vh = window.innerHeight;
    var docH = document.documentElement.scrollHeight - vh;

    if (header) header.classList.toggle("is-scrolled", y > 10);
    if (progressBar) progressBar.style.transform = "scaleX(" + (docH > 0 ? y / docH : 0) + ")";
    if (toTop) toTop.classList.toggle("is-visible", y > vh * 1.2);
    updateTrackers(vh);

    if (reduceMotion) return;

    if (ticker) {
      var tRect = ticker.parentElement.getBoundingClientRect();
      if (tRect.bottom > 0 && tRect.top < vh) {
        ticker.style.transform = "translate3d(" + (-(vh - tRect.top) * 0.35) + "px,0,0)";
      }
    }

    parallaxEls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0.1;
      var offset = (r.top + r.height / 2 - vh / 2) * -speed;
      el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
    });

    if (rail && levelsWrap) {
      var lr = levelsWrap.getBoundingClientRect();
      var p = clamp((vh * 0.5 - lr.top) / lr.height, 0, 1);
      rail.style.setProperty("--rail-progress", p.toFixed(3));
    }

    if (hscroll && hscroll.classList.contains("is-pinned")) {
      var hr = hscroll.getBoundingClientRect();
      var dist = parseFloat(hscroll.dataset.distance) || 0;
      var hp = clamp(-hr.top / (hr.height - vh), 0, 1);
      hTrack.style.transform = "translate3d(" + (-hp * dist).toFixed(1) + "px,0,0)";
      if (hBar) hBar.style.transform = "scaleX(" + hp.toFixed(3) + ")";
    }

    if (timelineFill) {
      var tl = timeline.getBoundingClientRect();
      var tp = clamp((vh * 0.6 - tl.top) / tl.height, 0, 1);
      timelineFill.style.height = (tp * 100).toFixed(2) + "%";
    }
  }

  // Timeline dots light up as each entry reaches the middle of the screen
  if (timeline && "IntersectionObserver" in window) {
    var tlObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add("is-in");
      });
    }, { rootMargin: "0px 0px -40% 0px" });
    timeline.querySelectorAll(":scope > .tl-item").forEach(function (li) { tlObserver.observe(li); });
  }

  var ticking = false;
  function requestTick() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () { onScroll(); ticking = false; });
    }
  }

  setupHScroll();
  onScroll();
  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", function () { setupHScroll(); requestTick(); });
  window.addEventListener("load", function () { setupHScroll(); requestTick(); });

  /* ---------- Testimonial carousel buttons ---------- */

  var voiceTrack = document.querySelector(".voices__track");
  document.querySelectorAll("[data-voices]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!voiceTrack) return;
      var card = voiceTrack.querySelector(".voice");
      var step = card ? card.getBoundingClientRect().width + 20 : 320;
      var dir = btn.getAttribute("data-voices") === "next" ? 1 : -1;
      var atEnd = voiceTrack.scrollLeft + voiceTrack.clientWidth >= voiceTrack.scrollWidth - 4;
      if (dir === 1 && atEnd) {
        voiceTrack.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        voiceTrack.scrollBy({ left: step * dir, behavior: "smooth" });
      }
    });
  });
})();
