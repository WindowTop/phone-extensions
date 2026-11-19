(function () {
  var searchEl = document.getElementById("search");
  var listEl = document.getElementById("list");
  var catsEl = document.getElementById("categories");
  var emptyEl = document.getElementById("empty");
  var devBanner = document.getElementById("dev-banner");
  var activeCategory = "All";

  // Development extensions (dev: true) are listed only when the page is opened with ?dev
  // (kept for the browser tab, so the flag survives a reload). This hides them, it is not a security measure.
  var params = new URLSearchParams(window.location.search);
  var devMode = params.has("dev");
  try {
    if (devMode) sessionStorage.setItem("phoneExtensionsDev", "1");
    else if (sessionStorage.getItem("phoneExtensionsDev") === "1") devMode = true;
  } catch (e) { /* storage blocked: the URL flag still works */ }
  if (devMode && devBanner) devBanner.hidden = false;

  var visible = EXTENSIONS.filter(function (e) { return devMode || !e.dev; });

  var categories = ["All"].concat(
    visible.map(function (e) { return e.category; })
      .filter(function (c, i, a) { return a.indexOf(c) === i; })
      .sort()
  );

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function renderCategories() {
    catsEl.innerHTML = "";
    categories.forEach(function (c) {
      var b = el("button", c === activeCategory ? "chip active" : "chip", c);
      b.onclick = function () { activeCategory = c; renderCategories(); render(); };
      catsEl.appendChild(b);
    });
  }

  function render() {
    var q = searchEl.value.trim().toLowerCase();
    listEl.innerHTML = "";
    var shown = visible.filter(function (e) {
      var inCat = activeCategory === "All" || e.category === activeCategory;
      var text = (e.name + " " + e.description + " " + e.category).toLowerCase();
      return inCat && text.indexOf(q) !== -1;
    });
    shown.forEach(function (e) {
      var card = el("div", "card");
      var info = el("div", "info");
      var title = el("h2", "", e.name);
      if (e.dev) title.appendChild(el("span", "tag-dev", "DEV"));
      info.appendChild(title);
      info.appendChild(el("p", "desc", e.description));
      var meta = [e.category, e.version ? "v" + e.version : "", e.size].filter(Boolean).join(" \u00b7 ");
      info.appendChild(el("p", "meta", meta));
      card.appendChild(info);
      if (e.url) {
        var a = el("a", "btn", "Download");
        a.href = e.url;
        card.appendChild(a);
      } else {
        card.appendChild(el("span", "btn disabled", "Coming soon"));
      }
      listEl.appendChild(card);
    });
    emptyEl.hidden = shown.length !== 0;
  }

  searchEl.addEventListener("input", render);
  renderCategories();
  render();
})();
