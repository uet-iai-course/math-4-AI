(function () {
  "use strict";

  const local = window.location.protocol === "file:";
  const assets = [
    ["link", "vendor/katex/dist/katex.min.css", "sha256-GQlRJzV+1tKf4KY6awAMkTqJ9/GWO3Zd03Fel8mFLnU="],
    ["script", "vendor/marked/18.0.7/marked.umd.js", "sha256-eh+MXnImt1/xZkS9ssATDSrnNx5+oxBsLW2sd6sP97Y="],
    ["script", "vendor/dompurify/3.4.7/purify.min.js", "sha256-+E5SKHamz63suJwXM1ZAms7Dn1gMaQGFWcmlDpYpmww="],
    ["script", "vendor/katex/dist/katex.min.js", "sha256-6NiFUFlJ86X0q91d0NU2lr0Tca0m/79PMQ3Nd8jNrok="],
    ["script", "vendor/katex/dist/contrib/auto-render.min.js", "sha256-u1PrlTOUUxquNv3VNwZcQkTrhUKQGjzpFGAdkyZ1uKw="]
  ];

  function loadAsset([tag, path, integrity]) {
    return new Promise((resolve, reject) => {
      const element = document.createElement(tag);
      // SRI requires CORS, which file:// cannot provide. HTTP retains SRI.
      if (!local && integrity) element.integrity = integrity;
      if (tag === "link") {
        element.rel = "stylesheet";
        element.href = path;
      } else {
        element.src = path;
      }
      element.onload = resolve;
      element.onerror = () => reject(new Error(`Không tải được tệp ${path}. Hãy giữ đầy đủ thư mục học kỳ khi tải về.`));
      if (tag === "link") {
        document.head.insertBefore(element, document.querySelector('link[href="material-viewer.css"]'));
      } else {
        document.head.appendChild(element);
      }
    });
  }

  async function start() {
    try {
      for (const asset of assets) await loadAsset(asset);
      if (local) await loadAsset(["script", "material-local-data.js?v=20260913-local2"]);
      await loadAsset(["script", "material-viewer.js?v=20260913-local2"]);
    } catch (error) {
      const status = document.getElementById("material-status");
      status.hidden = false;
      status.className = "material-status material-status--error";
      status.textContent = `Không thể mở tài liệu. ${error.message}`;
    }
  }
  start();
}());
