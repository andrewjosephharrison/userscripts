// ==UserScript==
// @name         Google: Hide AI Overview
// @namespace    https://tampermonkey.net/
// @version      1.0.0
// @description  Hides/removes the "AI Overview" section from Google Search results
// @match        https://www.google.com/search*
// @match        https://www.google.*/*search*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

(() => {
  "use strict";

  // --- 1) CSS hide for known-ish containers (fast, resilient) ---
  // Google changes classes a lot, so these selectors use attributes/structure where possible.
  GM_addStyle(`
      /* Common AI Overview container signals */
      [data-al*="AI overview" i],
      [data-al*="AI Overview" i],
      [aria-label*="AI overview" i],
      [aria-label*="AI Overview" i],
      div[data-attrid*="AI overview" i],
      div[data-attrid*="ai overview" i] {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        overflow: hidden !important;
      }
    `);

  // --- 2) Fallback remover: find blocks that visibly say "AI Overview" and remove wrapper ---
  const TEXT_MARKERS = [
    "ai overview",
    "ai overviews", // just in case
  ];

  // Try to climb to a container that represents a whole module/result block.
  function findRemovableWrapper(node) {
    if (!node || !(node instanceof Element)) return null;

    // These are common “block” containers on SERP. Not perfect, but works well.
    const wrapper = node.closest(
      [
        // Often Google modules live under these:
        "#rcnt > div",
        "#rso > div",
        "#rso > g-section-with-header",
        // Sometimes deep inside "main"/"cnt"/"center_col"
        "#center_col > div",
        "#center_col > div > div",
        // Generic fallback: a big box with a lot of content
        "div[data-hveid]",
        "div[jscontroller]",
      ].join(",")
    );

    return wrapper || node.parentElement;
  }

  function looksLikeAiOverview(el) {
    if (!el || !(el instanceof Element)) return false;

    // Quick attribute signals
    const dataAl = el.getAttribute("data-al") || "";
    const aria = el.getAttribute("aria-label") || "";
    const attrid = el.getAttribute("data-attrid") || "";
    const attrSignal = `${dataAl} ${aria} ${attrid}`.toLowerCase();
    if (attrSignal.includes("ai overview")) return true;

    // Visible text signal (heading/label)
    // Keep this bounded so we don't scan huge pages too expensively.
    const text = (el.innerText || "").trim().toLowerCase();
    if (!text) return false;

    // Must contain the marker, but also be “module-like” (avoid matching random snippets).
    const hasMarker = TEXT_MARKERS.some((m) => text.includes(m));
    if (!hasMarker) return false;

    // Heuristic: AI Overview module usually has a "Show more" and a compact block at top.
    const hasShowMore = text.includes("show more");
    const hasCommonMeaning = text.includes("common meanings"); // often present under AI Overview
    return hasShowMore || hasCommonMeaning || text.startsWith("ai overview");
  }

  function removeAiOverviewOnce(root = document) {
    // Search within likely SERP containers first
    const containers = [
      document.querySelector("#rcnt"),
      document.querySelector("#rso"),
      document.querySelector("#center_col"),
      document.body,
    ].filter(Boolean);

    for (const c of containers) {
      // Find candidate nodes:
      // - any element with ai overview-ish attributes
      // - any element that contains the phrase in its text
      const candidates = c.querySelectorAll(`
          [data-al],
          [aria-label],
          [data-attrid],
          h1, h2, h3, div, section
        `);

      for (const el of candidates) {
        // Keep it cheap: only check nodes that either have relevant attributes
        // or are likely to contain headings/modules.
        const quickAttr =
          el.getAttribute &&
          ((el.getAttribute("data-al") || "")
            .toLowerCase()
            .includes("ai overview") ||
            (el.getAttribute("aria-label") || "")
              .toLowerCase()
              .includes("ai overview") ||
            (el.getAttribute("data-attrid") || "")
              .toLowerCase()
              .includes("ai overview"));

        const quickText =
          el.tagName === "H1" ||
          el.tagName === "H2" ||
          el.tagName === "H3" ||
          el.tagName === "SECTION";

        if (!quickAttr && !quickText) continue;

        if (quickAttr || looksLikeAiOverview(el)) {
          const wrapper = findRemovableWrapper(el);
          if (wrapper) {
            wrapper.style.display = "none";
            wrapper.remove();
            return true; // removed one
          }
        }
      }
    }
    return false;
  }

  // --- 3) Keep removing as Google injects it dynamically ---
  let observer;

  function startObserver() {
    if (observer) return;

    observer = new MutationObserver(() => {
      // Remove repeatedly until nothing left
      // (sometimes it recreates immediately)
      let removed = false;
      for (let i = 0; i < 5; i++) {
        const did = removeAiOverviewOnce();
        removed = removed || did;
        if (!did) break;
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  // Kick off early and on load
  removeAiOverviewOnce();
  startObserver();
  window.addEventListener("load", () => {
    // one more pass after everything settles
    for (let i = 0; i < 5; i++) {
      if (!removeAiOverviewOnce()) break;
    }
  });
})();
