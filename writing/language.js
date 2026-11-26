const languages = { en: "en", zh: "zh-Hans" };
const versions = document.querySelectorAll("[data-version]");
const links = document.querySelectorAll("[data-language]");

function showLanguage() {
  const selected = new URLSearchParams(location.search).get("lang") === "zh" ? "zh" : "en";
  document.documentElement.lang = languages[selected];

  for (const version of versions) {
    version.hidden = version.dataset.version !== selected;
    if (!version.hidden) {
      document.title = version.querySelector("h1").textContent + " · Chengzhuo Tong";
    }
  }

  for (const link of links) {
    if (link.dataset.language === selected) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  }

  document.querySelector(".languages").setAttribute("aria-label", selected === "zh" ? "语言" : "Language");
  document.querySelector(".home").textContent = selected === "zh" ? "← 返回主页" : "← Homepage";
  document.querySelector(".home").href = selected === "zh" ? "../../zh/" : "../../";
}

for (const link of links) {
  link.addEventListener("click", (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    const url = new URL(location.href);
    if (link.dataset.language === "zh") {
      url.searchParams.set("lang", "zh");
    } else {
      url.searchParams.delete("lang");
    }
    if (url.href !== location.href) history.pushState(null, "", url);
    showLanguage();
  });
}

window.addEventListener("popstate", showLanguage);
showLanguage();
