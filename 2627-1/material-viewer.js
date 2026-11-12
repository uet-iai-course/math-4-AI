(function () {
  "use strict";

  const DOCUMENT_PATTERN = /^materials\/lec-(\d{2}[a-z]?)\/(lecture-note|exercises)\.md$/;
  const DECK_PATTERN = /^lecture-(\d{2}[a-z]?)-[a-z0-9-]+\.html$/;
  const DECKLESS_LECTURES = new Set(["05c", "12", "13", "14"]);
  // Danh sách duy nhất các loại khối ::: và nhãn mặc định; mọi regex bên dưới sinh từ đây.
  const DIRECTIVE_LABELS = Object.freeze({
    definition: "Định nghĩa",
    theorem: "Định lý",
    proposition: "Mệnh đề",
    lemma: "Bổ đề",
    corollary: "Hệ quả",
    remark: "Nhận xét",
    algorithm: "Thuật toán",
    example: "Ví dụ",
    application: "Tình huống áp dụng",
    derivation: "Suy diễn",
    proof: "Chứng minh",
    exercise: "Bài tập",
    hint: "Gợi ý",
    solution: "Lời giải"
  });
  const COLLAPSED_DIRECTIVES = new Set(["proof", "hint", "solution"]);
  const DIRECTIVE_ALTERNATION = Object.keys(DIRECTIVE_LABELS).join("|");
  const DIRECTIVE_PATTERN = new RegExp(`^(?:${DIRECTIVE_ALTERNATION})$`);
  const DIRECTIVE_START_PATTERN = new RegExp(`^:::[ \\t]*(?:${DIRECTIVE_ALTERNATION})(?:\\s|$)`, "m");
  const DIRECTIVE_BLOCK_PATTERN = new RegExp(
    `^:::[ \\t]*(${DIRECTIVE_ALTERNATION})(?:[ \\t]+([^\\n]+))?[ \\t]*\\n([\\s\\S]*?)\\n:::[ \\t]*(?:\\n|$)`
  );
  // Vùng thu gọn :::: <loại> <tiêu đề> … :::: (bốn dấu hai chấm); chứa được các khối ::: và Markdown, không lồng vùng.
  const REGION_LABELS = Object.freeze({
    reading: "Đọc thêm"
  });
  const REGION_ALTERNATION = Object.keys(REGION_LABELS).join("|");
  const REGION_OPEN_PATTERN = new RegExp(`^::::[ \\t]*(${REGION_ALTERNATION})(?:[ \\t]+(.+?))?[ \\t]*$`);
  const REGION_START_PATTERN = new RegExp(`^::::[ \\t]*(?:${REGION_ALTERNATION})(?:\\s|$)`, "m");
  const REGION_BLOCK_PATTERN = new RegExp(
    `^::::[ \\t]*(${REGION_ALTERNATION})(?:[ \\t]+([^\\n]+))?[ \\t]*\\n([\\s\\S]*?)\\n::::[ \\t]*(?:\\n|$)`
  );

  const statusElement = document.getElementById("material-status");
  const layoutElement = document.getElementById("material-layout");
  const contentElement = document.getElementById("material-content");
  const titleElement = document.getElementById("material-title");
  const kindElement = document.getElementById("material-kind");
  const deckLink = document.getElementById("deck-link");
  const sourceLink = document.getElementById("source-link");
  const tocList = document.getElementById("toc-list");

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function fail(message, detail) {
    statusElement.className = "material-status material-status--error";
    statusElement.innerHTML = `<strong>Không thể mở tài liệu.</strong><span>${escapeHtml(message)}</span>`;
    if (detail) {
      console.error(detail);
    }
    layoutElement.hidden = true;
    document.title = "Không thể mở tài liệu · Cơ sở toán học cho AI";
  }

  function readRequest() {
    const parameters = new URLSearchParams(window.location.search);
    const documentPath = parameters.get("doc") || "";
    const deckPath = parameters.get("deck") || "";
    const documentMatch = DOCUMENT_PATTERN.exec(documentPath);

    if (documentMatch && !deckPath && DECKLESS_LECTURES.has(documentMatch[1])) {
      return {
        documentPath,
        deckPath: null,
        lecture: documentMatch[1],
        kind: documentMatch[2]
      };
    }

    const deckMatch = DECK_PATTERN.exec(deckPath);

    if (!documentMatch || !deckMatch) {
      throw new Error("Đường dẫn tài liệu hoặc bộ trang chiếu không đúng quy ước.");
    }
    if (documentMatch[1] !== deckMatch[1]) {
      throw new Error("Số bài của tài liệu không khớp với bộ trang chiếu.");
    }

    return {
      documentPath,
      deckPath,
      lecture: documentMatch[1],
      kind: documentMatch[2]
    };
  }

  function validateDirectives(markdown) {
    let openDirective = null;
    let openRegion = null;
    const lines = markdown.split(/\r?\n/);

    let fence = null;
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      const fenceMatch = /^ {0,3}(```|~~~)/.exec(line);
      if (fenceMatch) {
        if (!fence) {
          fence = fenceMatch[1];
        } else if (fence === fenceMatch[1]) {
          fence = null;
        }
        return;
      }
      if (fence) {
        return;
      }
      if (/^(?: {4}|\t)/.test(line)) {
        return;
      }
      if (/^::::/.test(trimmed)) {
        if (trimmed === "::::") {
          if (!openRegion) {
            throw new Error(`Dấu đóng vùng :::: không có dấu mở ở dòng ${index + 1}.`);
          }
          if (openDirective) {
            throw new Error(`Khối “${openDirective}” chưa đóng trước dấu đóng vùng ở dòng ${index + 1}.`);
          }
          openRegion = null;
          return;
        }
        const regionOpening = REGION_OPEN_PATTERN.exec(trimmed);
        if (!regionOpening) {
          throw new Error(`Vùng :::: không được hỗ trợ ở dòng ${index + 1}.`);
        }
        if (openRegion || openDirective) {
          throw new Error(`Không được mở vùng :::: bên trong vùng hoặc khối khác ở dòng ${index + 1}.`);
        }
        openRegion = regionOpening[1];
        return;
      }
      const opening = /^:::[ \t]*(\S+)(?:\s+.*)?$/.exec(trimmed);
      if (trimmed === ":::") {
        if (!openDirective) {
          throw new Error(`Dấu đóng khối ::: không có dấu mở ở dòng ${index + 1}.`);
        }
        openDirective = null;
        return;
      }
      if (!opening) {
        return;
      }
      if (!DIRECTIVE_PATTERN.test(opening[1])) {
        throw new Error(`Loại khối “${opening[1]}” không được hỗ trợ ở dòng ${index + 1}.`);
      }
      if (openDirective) {
        throw new Error(`Không được lồng khối :::; khối “${openDirective}” chưa đóng ở dòng ${index + 1}.`);
      }
      openDirective = opening[1];
    });

    if (openDirective) {
      throw new Error(`Khối “${openDirective}” chưa có dấu đóng :::.`);
    }
    if (openRegion) {
      throw new Error(`Vùng “${openRegion}” chưa có dấu đóng ::::.`);
    }
  }

  function protectMath(markdown) {
    const expressions = [];
    const randomValues = new Uint32Array(2);
    window.crypto.getRandomValues(randomValues);
    const tokenPrefix = `MATH${Array.from(randomValues, (value) => value.toString(36)).join("")}PLACEHOLDER`;
    const pattern = /```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`|\$\$[\s\S]*?\$\$|\$(?!\s)(?:\\.|[^$\n])+?\$/g;
    const source = markdown.replace(pattern, (match) => {
      if (match.startsWith("`") || !match.startsWith("$")) {
        return match;
      }
      const token = `${tokenPrefix}${expressions.length}TOKEN`;
      expressions.push(match);
      return token;
    });
    return { source, expressions, tokenPrefix };
  }

  function restoreMath(root, expressions, tokenPrefix) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    const tokenPattern = new RegExp(`${tokenPrefix}(\\d+)TOKEN`, "g");
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }
    nodes.forEach((node) => {
      node.data = node.data.replace(tokenPattern, (match, index) => {
        return expressions[Number(index)] ?? match;
      });
    });
  }

  function configureMarked() {
    if (!window.marked || typeof window.marked.parse !== "function") {
      throw new Error("Không tải được thư viện Marked cục bộ.");
    }

    const directive = {
      name: "materialDirective",
      level: "block",
      start(source) {
        const index = source.match(DIRECTIVE_START_PATTERN)?.index;
        return typeof index === "number" ? index : undefined;
      },
      tokenizer(source) {
        const match = DIRECTIVE_BLOCK_PATTERN.exec(source);
        if (!match) {
          return undefined;
        }
        return {
          type: "materialDirective",
          raw: match[0],
          kind: match[1],
          title: match[2]?.trim() || "",
          tokens: this.lexer.blockTokens(match[3].trim(), [])
        };
      },
      renderer(token) {
        const label = DIRECTIVE_LABELS[token.kind];
        const title = escapeHtml(token.title || label);
        const body = this.parser.parse(token.tokens);
        if (COLLAPSED_DIRECTIVES.has(token.kind)) {
          return `<details class="material-block material-block--${token.kind}"><summary>${title}</summary><div class="material-block__body">${body}</div></details>`;
        }
        return `<section class="material-block material-block--${token.kind}"><h3>${title}</h3><div class="material-block__body">${body}</div></section>`;
      }
    };

    const region = {
      name: "materialRegion",
      level: "block",
      start(source) {
        const index = source.match(REGION_START_PATTERN)?.index;
        return typeof index === "number" ? index : undefined;
      },
      tokenizer(source) {
        const match = REGION_BLOCK_PATTERN.exec(source);
        if (!match) {
          return undefined;
        }
        return {
          type: "materialRegion",
          raw: match[0],
          kind: match[1],
          title: match[2]?.trim() || "",
          tokens: this.lexer.blockTokens(match[3], [])
        };
      },
      renderer(token) {
        const title = escapeHtml(token.title || REGION_LABELS[token.kind]);
        const body = this.parser.parse(token.tokens);
        return `<details class="material-region material-region--${token.kind}"><summary>${title}</summary><div class="material-region__body">${body}</div></details>`;
      }
    };

    window.marked.use({
      gfm: true,
      breaks: false,
      renderer: {
        html(token) {
          return escapeHtml(token.text);
        }
      },
      extensions: [region, directive]
    });
  }

  function sanitize(html) {
    if (!window.DOMPurify || typeof window.DOMPurify.sanitize !== "function") {
      throw new Error("Không tải được thư viện DOMPurify cục bộ.");
    }
    return window.DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      ALLOW_DATA_ATTR: false,
      FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form", "input", "button", "textarea", "select", "option", "template", "svg", "math"],
      FORBID_ATTR: ["style", "srcset"]
    });
  }

  function slugify(value) {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "muc";
  }

  function headingLabel(heading) {
    const clone = heading.cloneNode(true);
    clone.querySelectorAll(".katex-mathml").forEach((node) => node.remove());
    return clone.textContent.trim();
  }

  function buildTableOfContents() {
    const headings = Array.from(contentElement.querySelectorAll(
      ":scope > h2, :scope > h3, :scope > .material-region > .material-region__body > h2, :scope > .material-region > .material-region__body > h3"
    ));
    const usedIds = new Map();
    const list = document.createElement("ol");

    headings.forEach((heading) => {
      const label = headingLabel(heading) || "Mục";
      const baseId = slugify(label);
      const count = usedIds.get(baseId) || 0;
      usedIds.set(baseId, count + 1);
      heading.id = count === 0 ? baseId : `${baseId}-${count + 1}`;

      const item = document.createElement("li");
      if (heading.tagName === "H3") {
        item.className = "toc-level-3";
      }
      const link = document.createElement("a");
      link.href = `#${heading.id}`;
      link.textContent = label;
      item.appendChild(link);
      list.appendChild(item);
    });

    tocList.replaceChildren(list);
    if (headings.length === 0) {
      tocList.innerHTML = '<p class="muted-text">Tài liệu chưa có mục cấp hai.</p>';
    }
  }

  function setupTocToggle() {
    const toggle = document.getElementById("toc-toggle");
    const storageKey = "material-toc-collapsed";
    let collapsed = false;
    try {
      collapsed = window.localStorage.getItem(storageKey) === "1";
    } catch (error) {
      collapsed = false;
    }

    function apply() {
      const label = collapsed ? "Hiện mục lục" : "Ẩn mục lục";
      layoutElement.classList.toggle("material-layout--toc-collapsed", collapsed);
      tocList.hidden = collapsed;
      toggle.setAttribute("aria-expanded", String(!collapsed));
      toggle.setAttribute("aria-label", label);
      toggle.title = label;
    }

    apply();
    toggle.addEventListener("click", () => {
      collapsed = !collapsed;
      apply();
      try {
        window.localStorage.setItem(storageKey, collapsed ? "1" : "0");
      } catch (error) {
        // Without storage the toggle still works for this page view.
      }
    });
  }

  function hardenLinks() {
    let removedLinks = 0;
    const allowedProtocols = new Set(["http:", "https:", "mailto:"]);
    contentElement.querySelectorAll("a[href]").forEach((link) => {
      try {
        const target = new URL(link.getAttribute("href"), window.location.href);
        const rawHref = link.getAttribute("href");
        const localRelative = window.location.protocol === "file:"
          && target.protocol === "file:"
          && !/^(?:[a-z][a-z0-9+.-]*:|\/|\\)/i.test(rawHref)
          && target.href.startsWith(new URL("./", window.location.href).href);
        if (!allowedProtocols.has(target.protocol) && !localRelative) {
          link.removeAttribute("href");
          removedLinks += 1;
          return;
        }
        if (target.origin !== window.location.origin) {
          link.rel = "noopener noreferrer";
        }
      } catch (error) {
        link.removeAttribute("href");
        removedLinks += 1;
      }
    });
    return removedLinks;
  }

  function renderMath() {
    if (typeof window.renderMathInElement !== "function") {
      throw new Error("Không tải được phần mở rộng auto-render của KaTeX.");
    }
    const mathErrors = [];
    window.renderMathInElement(contentElement, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "option"],
      throwOnError: false,
      errorCallback(message) {
        mathErrors.push(message);
        console.error(message);
      }
    });
    return mathErrors.length;
  }

  function revealTarget(hash) {
    if (!hash || hash.length < 2) {
      return false;
    }
    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch (error) {
      return false;
    }
    const target = document.getElementById(id);
    if (!target || !contentElement.contains(target)) {
      return false;
    }
    const opened = [];
    for (let node = target.parentElement; node && node !== contentElement; node = node.parentElement) {
      if (node.tagName === "DETAILS" && !node.open) {
        node.open = true;
        opened.push(node);
      }
    }
    target.scrollIntoView();
    // Hình trong vùng vừa mở tải sau khi mở và đẩy đích xuống; cuộn lại khi mỗi hình tải xong.
    const pending = opened.flatMap((node) => Array.from(node.querySelectorAll("img"))).filter((img) => !img.complete);
    pending.forEach((img) => {
      img.addEventListener("load", () => target.scrollIntoView(), { once: true });
      img.addEventListener("error", () => target.scrollIntoView(), { once: true });
    });
    return true;
  }

  function setupFragmentNavigation() {
    tocList.addEventListener("click", (event) => {
      const link = event.target.closest("a[href^='#']");
      if (!link) {
        return;
      }
      const hash = link.getAttribute("href");
      if (revealTarget(hash)) {
        event.preventDefault();
        if (window.location.hash !== hash) {
          history.pushState(null, "", hash);
        }
      }
    });
    window.addEventListener("hashchange", () => revealTarget(window.location.hash));
    revealTarget(window.location.hash);
  }

  function preparePrinting() {
    let previouslyOpen = [];
    window.addEventListener("beforeprint", () => {
      previouslyOpen = Array.from(contentElement.querySelectorAll("details:not([open])"));
      previouslyOpen.forEach((details) => details.setAttribute("open", ""));
    });
    window.addEventListener("afterprint", () => {
      previouslyOpen.forEach((details) => details.removeAttribute("open"));
      previouslyOpen = [];
    });
  }

  async function loadMaterial() {
    let request;
    try {
      request = readRequest();
      configureMarked();
    } catch (error) {
      fail(error.message, error);
      return;
    }

    if (request.deckPath === null) {
      deckLink.remove();
    } else {
      deckLink.href = request.deckPath;
    }
    sourceLink.href = request.documentPath;
    kindElement.textContent = request.kind === "lecture-note" ? `Ghi chú bài giảng · Bài ${request.lecture}` : `Bài tập · Bài ${request.lecture}`;

    try {
      let markdown;
      if (window.location.protocol === "file:") {
        const localMaterials = window.LOCAL_MATERIALS;
        if (!localMaterials || !Object.hasOwn(localMaterials, request.documentPath)
            || typeof localMaterials[request.documentPath] !== "string") {
          throw new Error("Tài liệu chưa có trong bản tải về. Hãy tải lại đầy đủ thư mục học kỳ.");
        }
        markdown = localMaterials[request.documentPath];
      } else {
        const response = await fetch(request.documentPath, {
          credentials: "same-origin",
          cache: "no-cache"
        });
        if (!response.ok) {
          throw new Error(`Máy chủ trả mã ${response.status} khi tải Markdown.`);
        }
        markdown = await response.text();
      }
      validateDirectives(markdown);
      const protectedMath = protectMath(markdown);
      const rendered = window.marked.parse(protectedMath.source);
      contentElement.innerHTML = sanitize(rendered);
      restoreMath(contentElement, protectedMath.expressions, protectedMath.tokenPrefix);

      const firstHeading = contentElement.querySelector("h1");
      if (!firstHeading || !firstHeading.textContent.trim()) {
        throw new Error("Tài liệu phải bắt đầu bằng một heading cấp một có tiêu đề.");
      }

      const title = firstHeading.textContent.trim();
      titleElement.textContent = title;
      document.title = `${title} · Cơ sở toán học cho AI`;
      firstHeading.remove();

      const warnings = [];
      const removedLinks = hardenLinks();
      if (removedLinks > 0) {
        warnings.push(`${removedLinks} liên kết không an toàn hoặc không hợp lệ đã bị vô hiệu hóa.`);
      }
      try {
        const mathErrors = renderMath();
        if (mathErrors > 0) {
          warnings.push(`${mathErrors} công thức cần kiểm tra.`);
        }
      } catch (mathError) {
        warnings.push("Không tải được KaTeX; nội dung văn bản vẫn được giữ nguyên.");
        console.error(mathError);
      }
      buildTableOfContents();
      setupTocToggle();
      preparePrinting();

      if (warnings.length === 0) {
        statusElement.hidden = true;
      } else {
        statusElement.className = "material-status material-status--warning";
        statusElement.textContent = `Tài liệu đã mở với cảnh báo: ${warnings.join(" ")}`;
        statusElement.hidden = false;
      }
      layoutElement.hidden = false;
      setupFragmentNavigation();
    } catch (error) {
      fail(error.message, error);
    }
  }

  loadMaterial();
})();
