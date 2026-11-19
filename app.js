(function () {
  var searchEl = document.getElementById("search");
  var listEl = document.getElementById("list");
  var catsEl = document.getElementById("categories");
  var emptyEl = document.getElementById("empty");
  var activeCategory = "All";

  var categories = ["All"].concat(
    EXTENSIONS.map(function (e) { return e.category; })
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
    var shown = EXTENSIONS.filter(function (e) {
      var inCat = activeCategory === "All" || e.category === activeCategory;
      var text = (e.name + " " + e.description + " " + e.category).toLowerCase();
      return inCat && text.indexOf(q) !== -1;
    });
    shown.forEach(function (e) {
      var card = el("div", "card");
      var info = el("div", "info");
      info.appendChild(el("h2", "", e.name));
      info.appendChild(el("p", "desc", e.description));
      info.appendChild(el("p", "meta", e.category + " \u00b7 " + e.version + " \u00b7 " + e.size));
      var a = el("a", "btn", "Download");
      a.href = e.url;
      card.appendChild(info);
      card.appendChild(a);
      listEl.appendChild(card);
    });
    emptyEl.hidden = shown.length !== 0;
  }

  searchEl.addEventListener("input", render);
  renderCategories();
  render();
})();
