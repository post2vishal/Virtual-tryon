/**
 * Monetie Eyewear — Virtual Try-On Embed Script
 * www.monetieyewear.com
 *
 * Drop this single <script> tag on any product page to add a
 * "Try On" button that opens the VTO experience in a full-screen modal.
 *
 * Usage (add before </body> on any product page):
 *
 *   <script
 *     src="https://vto.monetieyewear.com/embed.js"
 *     data-frame="glasses/rayban.png"
 *     data-frame-h="1/5"
 *     data-product-name="Ray-Ban Wayfarer"
 *     data-product-price="$165"
 *     data-product-url="/products/rayban-wayfarer"
 *     data-button-label="Try On"
 *     data-vto-base="https://vto.monetieyewear.com/"
 *   ></script>
 *
 * OR call window.MN_VTO.open(config) programmatically:
 *
 *   MN_VTO.open({
 *       frame:        "glasses/oakley.png",
 *       frameH:       "1/4",
 *       productName:  "Oakley Holbrook",
 *       productPrice: "$195",
 *       productUrl:   "/products/oakley-holbrook"
 *   });
 */

(function(window, document) {
    "use strict";

    /* --------------------------------------------------------
       Guard against double-loading
       -------------------------------------------------------- */
    if (window.MN_VTO) return;

    /* --------------------------------------------------------
       Read config from the script tag's data-* attributes
       -------------------------------------------------------- */
    var currentScript = (function() {
        if (document.currentScript) return document.currentScript;
        var scripts = document.querySelectorAll("script[src*='embed.js']");
        return scripts[scripts.length - 1] || null;
    })();

    function attr(name, fallback) {
        return (currentScript && currentScript.getAttribute("data-" + name)) || fallback;
    }

    var cfg = {
        frame:        attr("frame",        "glasses/oakley.png"),
        frameH:       attr("frame-h",      "1/4"),
        productName:  attr("product-name", ""),
        productPrice: attr("product-price",""),
        productUrl:   attr("product-url",  "#"),
        buttonLabel:  attr("button-label", "Try On"),
        vtoBase:      attr("vto-base",     "https://vto.monetieyewear.com/")
    };

    /* --------------------------------------------------------
       Inject modal CSS (once)
       -------------------------------------------------------- */
    function injectStyles() {
        if (document.getElementById("mn-embed-styles")) return;
        var style = document.createElement("style");
        style.id = "mn-embed-styles";
        style.textContent = [
            /* Trigger button */
            ".mn-try-btn{",
            "  display:inline-flex;align-items:center;gap:8px;",
            "  padding:12px 24px;",
            "  background:linear-gradient(135deg,#c9a84c 0%,#e2c97e 100%);",
            "  color:#0e0e0e;font-weight:700;font-size:.92rem;",
            "  letter-spacing:.04em;border:none;border-radius:999px;",
            "  cursor:pointer;transition:opacity .2s,transform .2s;",
            "  font-family:inherit;",
            "}",
            ".mn-try-btn:hover{opacity:.88;transform:translateY(-1px);}",
            ".mn-try-btn svg{width:18px;height:18px;}",

            /* Overlay backdrop */
            "#mn-modal-backdrop{",
            "  position:fixed;inset:0;z-index:99998;",
            "  background:rgba(0,0,0,.82);backdrop-filter:blur(6px);",
            "  display:flex;align-items:center;justify-content:center;",
            "  opacity:0;pointer-events:none;",
            "  transition:opacity .28s cubic-bezier(.4,0,.2,1);",
            "}",
            "#mn-modal-backdrop.mn-open{opacity:1;pointer-events:auto;}",

            /* Modal panel */
            "#mn-modal-panel{",
            "  position:relative;",
            "  width:min(96vw,520px);",
            "  max-height:92vh;",
            "  background:#1a1a1a;",
            "  border:1px solid rgba(201,168,76,.3);",
            "  border-radius:16px;",
            "  overflow:hidden;",
            "  box-shadow:0 24px 64px rgba(0,0,0,.8);",
            "  transform:scale(.95) translateY(12px);",
            "  transition:transform .28s cubic-bezier(.4,0,.2,1);",
            "  display:flex;flex-direction:column;",
            "}",
            "#mn-modal-backdrop.mn-open #mn-modal-panel{transform:scale(1) translateY(0);}",

            /* Modal header */
            "#mn-modal-header{",
            "  display:flex;align-items:center;justify-content:space-between;",
            "  padding:14px 18px;",
            "  border-bottom:1px solid rgba(201,168,76,.2);",
            "  flex-shrink:0;",
            "}",
            "#mn-modal-title{",
            "  font-size:.82rem;font-weight:700;",
            "  letter-spacing:.08em;text-transform:uppercase;",
            "  color:#c9a84c;font-family:inherit;",
            "}",
            "#mn-modal-close{",
            "  width:32px;height:32px;",
            "  background:rgba(255,255,255,.07);",
            "  border:1px solid rgba(255,255,255,.1);",
            "  border-radius:50%;cursor:pointer;",
            "  display:flex;align-items:center;justify-content:center;",
            "  color:#f0e6d0;transition:background .2s;",
            "  flex-shrink:0;",
            "}",
            "#mn-modal-close:hover{background:rgba(201,168,76,.2);}",
            "#mn-modal-close svg{width:14px;height:14px;}",

            /* Product info bar inside modal */
            "#mn-modal-product{",
            "  padding:10px 18px;",
            "  background:rgba(201,168,76,.06);",
            "  border-bottom:1px solid rgba(201,168,76,.15);",
            "  display:flex;align-items:center;justify-content:space-between;",
            "  flex-shrink:0;",
            "}",
            "#mn-modal-product-name{font-size:.88rem;font-weight:700;color:#f0e6d0;}",
            "#mn-modal-product-price{font-size:.88rem;font-weight:700;color:#c9a84c;}",

            /* iframe container */
            "#mn-modal-frame{flex:1;overflow:hidden;display:block;}",
            "#mn-modal-iframe{",
            "  width:100%;height:100%;",
            "  min-height:560px;",
            "  border:none;display:block;",
            "  background:#0e0e0e;",
            "}",

            /* CTA bar */
            "#mn-modal-cta{",
            "  padding:14px 18px;",
            "  display:flex;gap:10px;",
            "  border-top:1px solid rgba(201,168,76,.15);",
            "  flex-shrink:0;",
            "}",
            "#mn-modal-buy{",
            "  flex:1;padding:11px 0;",
            "  background:linear-gradient(135deg,#c9a84c 0%,#e2c97e 100%);",
            "  color:#0e0e0e;font-weight:700;font-size:.88rem;",
            "  border:none;border-radius:999px;cursor:pointer;",
            "  font-family:inherit;text-decoration:none;",
            "  display:flex;align-items:center;justify-content:center;",
            "  transition:opacity .2s;",
            "}",
            "#mn-modal-buy:hover{opacity:.88;}",
            "#mn-modal-fullpage{",
            "  padding:11px 18px;",
            "  background:transparent;",
            "  color:#c9a84c;font-weight:600;font-size:.85rem;",
            "  border:1px solid rgba(201,168,76,.35);",
            "  border-radius:999px;cursor:pointer;",
            "  font-family:inherit;white-space:nowrap;",
            "  transition:border-color .2s;",
            "}",
            "#mn-modal-fullpage:hover{border-color:#c9a84c;}",
        ].join("");
        document.head.appendChild(style);
    }

    /* --------------------------------------------------------
       Build modal DOM (once)
       -------------------------------------------------------- */
    var _modalBuilt = false;

    function buildModal() {
        if (_modalBuilt) return;
        _modalBuilt = true;

        var backdrop = document.createElement("div");
        backdrop.id = "mn-modal-backdrop";
        backdrop.setAttribute("role", "dialog");
        backdrop.setAttribute("aria-modal", "true");
        backdrop.setAttribute("aria-label", "Virtual Try-On");

        backdrop.innerHTML =
            '<div id="mn-modal-panel">' +
                '<div id="mn-modal-header">' +
                    '<span id="mn-modal-title">Virtual Try-On</span>' +
                    '<button id="mn-modal-close" aria-label="Close">' +
                        '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">' +
                            '<path d="M3 3l10 10M13 3L3 13"/>' +
                        '</svg>' +
                    '</button>' +
                '</div>' +
                '<div id="mn-modal-product">' +
                    '<div id="mn-modal-product-name"></div>' +
                    '<div id="mn-modal-product-price"></div>' +
                '</div>' +
                '<div id="mn-modal-frame">' +
                    '<iframe id="mn-modal-iframe" title="Virtual Try-On" allowfullscreen ' +
                        'allow="camera; microphone"></iframe>' +
                '</div>' +
                '<div id="mn-modal-cta">' +
                    '<a id="mn-modal-buy" href="#">Add to Cart</a>' +
                    '<button id="mn-modal-fullpage">Full Experience →</button>' +
                '</div>' +
            '</div>';

        document.body.appendChild(backdrop);

        /* Close button */
        document.getElementById("mn-modal-close").addEventListener("click", MN_VTO.close);

        /* Click outside panel */
        backdrop.addEventListener("click", function(e) {
            if (e.target === backdrop) MN_VTO.close();
        });

        /* Escape key */
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape") MN_VTO.close();
        });

        /* Full-page link */
        document.getElementById("mn-modal-fullpage").addEventListener("click", function() {
            window.open(cfg.vtoBase + "monetie-tryon.html", "_blank");
        });
    }

    /* --------------------------------------------------------
       Build iframe URL with product params
       -------------------------------------------------------- */
    function buildIframeUrl(config) {
        var base = config.vtoBase || cfg.vtoBase;
        var params = new URLSearchParams({
            frame:   config.frame   || cfg.frame,
            frameH:  config.frameH  || cfg.frameH,
            name:    config.productName  || cfg.productName,
            price:   config.productPrice || cfg.productPrice,
            url:     config.productUrl   || cfg.productUrl
        });
        return base + "monetie-tryon.html?" + params.toString();
    }

    /* --------------------------------------------------------
       Public API
       -------------------------------------------------------- */
    window.MN_VTO = {
        open: function(config) {
            config = config || {};
            injectStyles();
            buildModal();

            var activeCfg = {
                frame:        config.frame        || cfg.frame,
                frameH:       config.frameH       || cfg.frameH,
                productName:  config.productName  || cfg.productName,
                productPrice: config.productPrice || cfg.productPrice,
                productUrl:   config.productUrl   || cfg.productUrl,
                vtoBase:      config.vtoBase      || cfg.vtoBase
            };

            /* Update sidebar product info in modal */
            document.getElementById("mn-modal-product-name").textContent  = activeCfg.productName;
            document.getElementById("mn-modal-product-price").textContent = activeCfg.productPrice;
            document.getElementById("mn-modal-buy").href = activeCfg.productUrl;

            /* Load iframe */
            document.getElementById("mn-modal-iframe").src = buildIframeUrl(activeCfg);

            /* Open */
            document.getElementById("mn-modal-backdrop").classList.add("mn-open");
            document.body.style.overflow = "hidden";

            /* Trap focus */
            var closeBtn = document.getElementById("mn-modal-close");
            setTimeout(function() { closeBtn && closeBtn.focus(); }, 320);
        },

        close: function() {
            var backdrop = document.getElementById("mn-modal-backdrop");
            if (!backdrop) return;
            backdrop.classList.remove("mn-open");
            document.body.style.overflow = "";
            /* Unload iframe to free camera resource */
            setTimeout(function() {
                var iframe = document.getElementById("mn-modal-iframe");
                if (iframe) iframe.src = "";
            }, 300);
        }
    };

    /* --------------------------------------------------------
       Auto-inject "Try On" button next to any element with
       data-mn-tryon="true"  on the current page.
       e.g. <button data-mn-tryon="true">Buy Now</button>
       -------------------------------------------------------- */
    function autoInject() {
        var targets = document.querySelectorAll("[data-mn-tryon]");
        targets.forEach(function(target) {
            if (target.dataset.mnTryonInjected) return;
            target.dataset.mnTryonInjected = "1";

            var btn = document.createElement("button");
            btn.className  = "mn-try-btn";
            btn.type       = "button";
            btn.innerHTML  =
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
                    '<circle cx="12" cy="8" r="4"/>' +
                    '<path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/>' +
                    '<path d="M4 9.5C5.5 8 7.6 7 10 7m4 0c2.4 0 4.5 1 6 2.5"/>' +
                '</svg>' +
                (attr("button-label", "Try On"));

            btn.addEventListener("click", function() {
                MN_VTO.open({
                    frame:        target.dataset.frame       || cfg.frame,
                    frameH:       target.dataset.frameH      || cfg.frameH,
                    productName:  target.dataset.productName || cfg.productName,
                    productPrice: target.dataset.productPrice|| cfg.productPrice,
                    productUrl:   target.dataset.productUrl  || cfg.productUrl
                });
            });

            target.insertAdjacentElement("afterend", btn);
        });
    }

    /* Run auto-inject on DOM ready */
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", autoInject);
    } else {
        autoInject();
    }

    /* --------------------------------------------------------
       If the script tag itself has a data-frame attribute
       AND there's no data-mn-tryon element, inject a floating
       "Try On" button at the bottom-right corner of the page.
       -------------------------------------------------------- */
    function maybeFloatingButton() {
        if (!currentScript) return;
        if (!currentScript.getAttribute("data-frame")) return;
        if (document.querySelector("[data-mn-tryon]")) return;

        injectStyles();

        var floatStyle = document.createElement("style");
        floatStyle.textContent =
            ".mn-float-btn{" +
            "  position:fixed;bottom:28px;right:28px;z-index:9997;" +
            "  box-shadow:0 8px 24px rgba(0,0,0,.55);" +
            "}";
        document.head.appendChild(floatStyle);

        var btn = document.createElement("button");
        btn.className = "mn-try-btn mn-float-btn";
        btn.type      = "button";
        btn.setAttribute("aria-label", "Virtual Try-On");
        btn.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                '<ellipse cx="12" cy="11" rx="9" ry="6"/>' +
                '<circle cx="9" cy="11" r="2.5" stroke-width="1.5"/>' +
                '<circle cx="15" cy="11" r="2.5" stroke-width="1.5"/>' +
            '</svg>' +
            cfg.buttonLabel;

        btn.addEventListener("click", function() { MN_VTO.open(); });

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", function() { document.body.appendChild(btn); });
        } else {
            document.body.appendChild(btn);
        }
    }

    maybeFloatingButton();

})(window, document);
