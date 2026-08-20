(function () {
  "use strict";

  var pyodideReadyPromise = null;
  var statusEl = document.getElementById("pyodide-status");

  function loadPyodideOnce() {
    if (!pyodideReadyPromise) {
      if (statusEl) statusEl.textContent = "Booting the Python engine — this only happens once…";
      pyodideReadyPromise = loadPyodide().then(function (pyodide) {
        if (statusEl) statusEl.textContent = "Python is ready. Press Run on any lesson.";
        return pyodide;
      }).catch(function (err) {
        if (statusEl) statusEl.textContent = "Couldn't load the Python engine. Check your connection and reload the page.";
        throw err;
      });
    }
    return pyodideReadyPromise;
  }

  function wireSandbox(prefix) {
    var runBtn = document.getElementById(prefix + "-run");
    var codeEl = document.getElementById(prefix + "-code");
    var outEl = document.getElementById(prefix + "-output");
    if (!runBtn || !codeEl || !outEl) return;

    runBtn.addEventListener("click", function () {
      runBtn.disabled = true;
      runBtn.textContent = "Running…";
      outEl.classList.remove("sandbox-output--error");
      outEl.textContent = "Running…";

      loadPyodideOnce()
        .then(function (pyodide) {
          pyodide.runPython(
            "import sys, io\n" +
            "sys.stdout = io.StringIO()\n" +
            "sys.stderr = sys.stdout\n"
          );
          return pyodide.runPythonAsync(codeEl.value).then(function () {
            var output = pyodide.runPython("sys.stdout.getvalue()");
            outEl.textContent = output.length ? output : "(no output — try adding a print statement)";
          });
        })
        .catch(function (err) {
          outEl.classList.add("sandbox-output--error");
          outEl.textContent = "Error: " + (err && err.message ? err.message : err);
        })
        .finally(function () {
          runBtn.disabled = false;
          runBtn.textContent = "▶ Run";
        });
    });

    // Let Tab insert spaces instead of jumping focus, since this is a code editor.
    codeEl.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        e.preventDefault();
        var start = codeEl.selectionStart;
        var end = codeEl.selectionEnd;
        codeEl.value = codeEl.value.slice(0, start) + "    " + codeEl.value.slice(end);
        codeEl.selectionStart = codeEl.selectionEnd = start + 4;
      }
    });
  }

  ["u1", "u2", "u3", "u4", "u5", "u6"].forEach(wireSandbox);

  // Highlight the active unit in the sticky path nav as you scroll.
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".path-nav-link"));
  var units = Array.prototype.slice.call(document.querySelectorAll(".unit"));

  if ("IntersectionObserver" in window && units.length && navLinks.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    units.forEach(function (unit) {
      observer.observe(unit);
    });
  }
})();
