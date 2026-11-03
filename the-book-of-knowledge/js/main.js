(function () {
  var pack = window.BOK_I18N;
  var key = "bok-lang";
  var buttons = document.querySelectorAll("[data-lang]");
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");

  function apply(lang) {
    if (!pack.text[lang]) lang = "ru";
    var dict = pack.text[lang];
    document.documentElement.lang = pack.html[lang];
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var id = el.getAttribute("data-i18n");
      if (dict[id] != null) el.textContent = dict[id];
    });
    var privacy = location.pathname.indexOf("privacy") !== -1;
    document.title = privacy ? dict.privacyDocTitle : dict.docTitle;
    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-lang") === lang ? "true" : "false");
    });
    try { localStorage.setItem(key, lang); } catch (e) {}
  }

  var saved = "ru";
  try { saved = localStorage.getItem(key) || "ru"; } catch (e) {}
  apply(pack.text[saved] ? saved : "ru");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      apply(button.getAttribute("data-lang"));
    });
  });

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
