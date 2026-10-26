function search(data) {
  let text = new URL(location.href).searchParams.get("q");
  let lang = new URL(location.href).searchParams.get("lang") || ui.lang;

  $("input[name='q']").val(text);

  let results = [];
  let regexp = new RegExp();
  try {
    regexp = new RegExp(text, "im");
  } catch (e) {
    $(".search-results .content").empty();
    $(".search-results .summary").html(ui.i18n.search_results_not_found);
    $(".search-results h2").html(ui.i18n.search_results);
    return debug(e.message);
  }

  function slice(content, min, max) {
    return content
      .slice(min, max)
      .replace(regexp, (match) => `<span class="bg-yellow">${match}</span>`);
  }
  for (page of data) {
    let [title, content] = [null, null];
    try {
      if (page.title) {
        title = page.title.match(regexp);
      } else {
        if (page.url == "/") {
          page.title = ui.title;
        } else {
          page.title = page.url;
        }
      }
    } catch (e) {
      debug(e.message);
    }
    try {
      if (page.content) {
        page.content = $("<div/>").html(page.content).text();
        content = page.content.match(regexp);
      }
    } catch (e) {
      debug(e.message);
    }
    if (title || content) {
      let result = [
        `<a href="${ui.baseurl}${page.url}?highlight=${text}">${page.title}</a>`,
      ];
      if (content) {
        let [min, max] = [content.index - 100, content.index + 100];
        let [prefix, suffix] = ["...", "..."];

        if (min < 0) {
          prefix = "";
          min = 0;
        }
        if (max > page.content.length) {
          suffix = "";
          max = page.content.length;
        }
        result.push(
          `<p class="search-snippet">${prefix}${slice(
            page.content,
            min,
            max
          )}${suffix}</p>`
        );
      }
      results.push(`<li class="search-result-item">${result.join("")}</li>`);
    }
  }
  if (results.length > 0 && text.length > 0) {
    $(".search-results .content").html(results.join(""));
    $(".search-results .summary").html(
      ui.i18n.search_results_found.replace("#", results.length)
    );
  } else {
    $(".search-results .content").empty();
    $(".search-results .summary").html(ui.i18n.search_results_not_found);
  }
  $(".search-results h2").html(ui.i18n.search_results);
}

function set(name, value) {
  return localStorage.setItem(name, value);
}

function get(name) {
  return localStorage.getItem(name) || false;
}

function debug() {
  console.debug.apply(console, arguments);
}

function restore() {
  let scroll = get("scroll");
  let scrollTime = get("scrollTime");
  let scrollHost = get("scrollHost");

  if (scroll && scrollTime && scrollHost) {
    if (scrollHost == location.host && Date.now() - scrollTime < 6e5) {
      $(".sidebar").scrollTop(scroll);
    }
  }
  $(".sidebar").scroll(function () {
    set("scroll", this.scrollTop);
    set("scrollTime", Date.now());
    set("scrollHost", location.host);
  });
}

function highlight() {
  let text = new URL(location.href).searchParams.get("highlight");

  if (text) {
    $(".markdown-body")
      .find("*")
      .each(function () {
        try {
          if (this.outerHTML.match(new RegExp(text, "im"))) {
            $(this).addClass("search-result");
            $(this).parentsUntil(".markdown-body").removeClass("search-result");
          }
        } catch (e) {
          debug(e.message);
        }
      });
    // last node
    $(".search-result").each(function () {
      $(this).html(function (i, html) {
        return html.replace(text, `<span class="bg-yellow">${text}</span>`);
      });
    });
    $(".sidebar-search input").val(text);
  }
}


const icon = (name) =>
  `<svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-${name}"></use></svg>`;

/* mobile drawer */
function setupDrawer() {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("toggle");
  const backdrop = document.querySelector(".sidebar-backdrop");
  if (!sidebar || !toggle || !backdrop) return;

  function setOpen(open) {
    sidebar.classList.toggle("is-open", open);
    backdrop.hidden = !open;
    document.body.classList.toggle("drawer-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    if (open) {
      const active = sidebar.querySelector(".is-active") || sidebar.querySelector("input,a");
      if (active) active.focus();
    } else if (document.activeElement && sidebar.contains(document.activeElement)) {
      toggle.focus();
    }
  }

  toggle.addEventListener("click", () => setOpen(!sidebar.classList.contains("is-open")));
  backdrop.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("is-open")) setOpen(false);
  });
  window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
}

/* heading anchors */
function setupAnchors() {
  document.querySelectorAll(".markdown-body :is(h2,h3,h4,h5,h6)[id]").forEach((h) => {
    const a = document.createElement("a");
    a.className = "anchor";
    a.href = `#${h.id}`;
    a.setAttribute("aria-label", `Link to "${h.textContent.trim()}"`);
    a.innerHTML = icon("link");
    h.appendChild(a);
  });
}

/* "On this page" with scroll spy */
function setupToc() {
  const body = document.querySelector(".markdown-body");
  const panels = document.querySelectorAll(".page-toc, .toc-inline");
  if (!body || panels.length === 0) return;

  const heads = [...body.querySelectorAll("h2[id], h3[id]")].filter(
    (h) => !h.closest(".toasts")
  );
  if (heads.length < 2) return;

  const label = (h) => {
    const c = h.cloneNode(true);
    c.querySelectorAll(".anchor").forEach((n) => n.remove());
    return c.textContent.trim();
  };

  let html = "";
  let open = false;
  heads.forEach((h) => {
    const sub = h.tagName === "H3";
    if (sub && !open) {
      html += "<ol>";
      open = true;
    } else if (!sub && open) {
      html += "</ol></li>";
      open = false;
    } else if (!sub && html) {
      html += "</li>";
    }
    html += `<li><a href="#${h.id}">${label(h).replace(/</g, "&lt;")}</a>`;
    if (sub) html += "</li>";
  });
  if (open) html += "</ol></li>";
  else html += "</li>";

  panels.forEach((p) => {
    p.querySelector("ol").innerHTML = html;
    p.hidden = false;
  });

  const links = [...document.querySelectorAll(".page-toc a")];
  const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  let current = null;

  function update() {
    let active = heads[0];
    for (const h of heads) {
      if (h.getBoundingClientRect().top <= 120) active = h;
    }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      active = heads[heads.length - 1];
    }
    if (active === current) return;
    current = active;
    links.forEach((a) => {
      a.classList.remove("is-active");
      a.removeAttribute("aria-current");
    });
    const link = byId.get(active.id);
    if (link) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "location");
      const box = link.closest(".page-aside");
      if (box && box.scrollHeight > box.clientHeight) {
        const r = link.getBoundingClientRect();
        const b = box.getBoundingClientRect();
        if (r.top < b.top || r.bottom > b.bottom) link.scrollIntoView({ block: "nearest" });
      }
    }
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      update();
    });
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* code blocks: header with language label and copy button */
function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy") ? resolve() : reject(new Error("copy failed"));
    } catch (e) {
      reject(e);
    } finally {
      area.remove();
    }
  });
}

const LANG_LABELS = {
  java: "Java", xml: "XML", json: "JSON", properties: "Properties", sql: "SQL",
  yaml: "YAML", yml: "YAML", bash: "Shell", shell: "Shell", sh: "Shell",
  plaintext: "Text", text: "Text", cypher: "Cypher", groovy: "Groovy",
  kotlin: "Kotlin", html: "HTML", javascript: "JavaScript", js: "JavaScript",
  cql: "CQL", gremlin: "Gremlin", mermaid: "Mermaid", toml: "TOML",
};

function setupCodeBlocks() {
  document.querySelectorAll(".markdown-body div.highlighter-rouge").forEach((block) => {
    const m = block.className.match(/language-([\w+-]+)/);
    const lang = m ? m[1] : "";
    const pre = block.querySelector("pre");
    if (!pre) return;
    pre.tabIndex = 0;
    pre.setAttribute("role", "region");
    pre.setAttribute("aria-label", `${LANG_LABELS[lang] || lang || "Code"} code`);

    const header = document.createElement("div");
    header.className = "code-header";
    const name = document.createElement("span");
    name.textContent = LANG_LABELS[lang] || lang || "Code";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy";
    button.innerHTML = `${icon("copy")}<span>Copy</span>`;
    button.setAttribute("aria-label", `Copy ${name.textContent} code to clipboard`);

    let timer;
    const flash = (cls, text) => {
      button.classList.remove("is-copied", "is-error");
      button.classList.add(cls);
      button.querySelector("span").textContent = text;
      clearTimeout(timer);
      timer = setTimeout(() => {
        button.classList.remove(cls);
        button.querySelector("span").textContent = "Copy";
      }, 2000);
    };
    button.addEventListener("click", () => {
      const code = pre.querySelector("code") || pre;
      Promise.resolve()
        .then(() => copyText(code.innerText.replace(/\n$/, "")))
        .then(() => flash("is-copied", "Copied"))
        .catch(() => flash("is-error", "Copy failed"));
    });

    header.append(name, button);
    block.insertBefore(header, block.firstChild);
  });
}

/* make wide tables scroll inside their own container */
function setupTables() {
  document.querySelectorAll(".markdown-body table").forEach((table) => {
    if (table.parentElement.classList.contains("table-wrap")) return;
    const wrap = document.createElement("div");
    wrap.className = "table-wrap";
    wrap.tabIndex = 0;
    wrap.setAttribute("role", "region");
    wrap.setAttribute("aria-label", "Scrollable table");
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });
}

if (location.pathname == `${ui.baseurl}/search.html`) {
  $.ajax(`${ui.baseurl}/pages.json`)
    .done(search)
    .fail((xhr, message) => debug(message));
}

setupDrawer();
setupAnchors();
setupCodeBlocks();
setupTables();
setupToc();
restore();
highlight();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(`${ui.baseurl}/sw.caches.js`);
} else {
  debug("Service Worker not supported!");
}
