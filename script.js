
/* ==========================================
   GLOW FIRM™ - COMPLETE WEBSITE SCRIPT
   Product Images + Filters + Detail Pages
   ========================================== */

(() => {
  "use strict";

  const cfg = window.GLOW_FIRM_CONFIG;
  const items = window.GLOW_PRODUCTS || [];

  const apps = [
    "Paint & Coatings",
    "Arts & Crafts",
    "Roads & Paving",
    "Plastics & Molding",
    "Glass & Ceramics",
    "Printing & Inks"
  ];

  const icon = {
    "Paint & Coatings": "◈",
    "Arts & Crafts": "✳",
    "Roads & Paving": "▥",
    "Plastics & Molding": "⬡",
    "Glass & Ceramics": "◇",
    "Printing & Inks": "▤"
  };

  /* ========================================
     PRODUCT IMAGE FILES
     ======================================== */

  const powderImages = {
    green: "images/glow-powder-green-bowl.png",
    aqua: "images/glow-powder-aqua-blue-bowl.png",
    blue: "images/glow-powder-deep-blue-bowl.png"
  };

  /* ========================================
     PRODUCT HELPERS
     ======================================== */

  const family = p =>
    cfg.families[p.family] || cfg.families.green;

  const esc = s =>
    String(s ?? "").replace(
      /[&<>"']/g,
      c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[c])
    );

  function getProductImage(p) {
    return p.image || powderImages[p.family] || "";
  }

  /* ========================================
     PRODUCT PHOTO
     ======================================== */

  function art(p) {

    const image = getProductImage(p);
    const f = family(p);

    const photo = image
      ? `<img
           class="gf-product-photo"
           src="${esc(image)}"
           alt="${esc(f.name)} glow powder ${esc(p.model)}"
           loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.style.display='block'"
         >`
      : "";

    return `
      <div class="product-art gf-product-art"
           style="--pigment:${esc(f.hex)}">

        ${photo}

        <div class="pigment"
             style="display:${image ? "none" : "block"}">
        </div>

      </div>
    `;
  }

  /* ========================================
     PRODUCT IMAGE STYLING
     ======================================== */

  const style = document.createElement("style");

  style.textContent = `
    .gf-product-art {
      width: 100%;
      height: 245px;
      min-height: 245px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      background: #030b09;
      border-radius: 12px;
      position: relative;
    }

    .gf-product-photo {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
      border-radius: 12px;
    }

    .product:hover .gf-product-photo {
      filter: brightness(1.08);
    }

    .detail-grid .gf-product-art {
      height: 420px;
      max-height: 60vh;
    }

    .detail-grid .gf-product-photo {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    @media (max-width: 600px) {
      .gf-product-art {
        height: 220px;
        min-height: 220px;
      }

      .detail-grid .gf-product-art {
        height: 300px;
      }
    }
  `;

  document.head.appendChild(style);

  /* ========================================
     FOOTER YEAR
     ======================================== */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* ========================================
     MOBILE NAVIGATION
     ======================================== */

  const menu = document.getElementById("menuBtn");

  if (menu) {
    menu.addEventListener("click", () => {

      const nav = document.getElementById("nav");

      if (!nav) return;

      const open = nav.classList.toggle("open");

      menu.setAttribute(
        "aria-expanded",
        String(open)
      );

    });
  }

  /* ========================================
     CONTACT INFORMATION
     ======================================== */

  const contact =
    document.getElementById("contactStatus");

  if (contact && cfg.contactEmail) {

    contact.innerHTML = `
      Email us at
      <a href="mailto:${esc(cfg.contactEmail)}">
        ${esc(cfg.contactEmail)}
      </a>
    `;

  }

  /* ========================================
     SHOP PRODUCT GRID
     ======================================== */

  const grid = document.getElementById("products");

  if (grid) {

    const cf =
      document.getElementById("colorFilter");

    const af =
      document.getElementById("appFilter");

    const sf =
      document.getElementById("searchFilter");

    apps.forEach(a => {
      af.add(new Option(a, a));
    });

    /* ======================================
       APPLICATION TILES
       ====================================== */

    const tiles =
      document.getElementById("applicationTiles");

    if (tiles) {

      tiles.innerHTML = apps.map(a => `
        <button
          class="application-tile"
          type="button"
          data-app="${esc(a)}">

          <span>${icon[a]}</span>

          ${esc(a)} ↗

        </button>
      `).join("");

      tiles.querySelectorAll("button").forEach(b => {

        b.addEventListener("click", () => {

          af.value = b.dataset.app;

          render();

          const shop =
            document.getElementById("shop");

          if (shop) {
            shop.scrollIntoView({
              behavior: "smooth"
            });
          }

        });

      });

    }

    /* ======================================
       URL FILTERS
       ====================================== */

    const qs = new URLSearchParams(
      window.location.search
    );

    if (
      ["green", "aqua", "blue"].includes(
        qs.get("color")
      )
    ) {
      cf.value = qs.get("color");
    }

    if (apps.includes(qs.get("application"))) {
      af.value = qs.get("application");
    }

    /* ======================================
       RENDER PRODUCTS
       ====================================== */

    function render() {

      const q = sf.value.trim().toLowerCase();

      const shown = items.filter(p => {

        const colorMatch =
          cf.value === "all" ||
          p.family === cf.value;

        const appMatch =
          af.value === "all" ||
          p.applications.includes(af.value);

        const searchMatch =
          !q ||
          p.model.toLowerCase().includes(q);

        return (
          colorMatch &&
          appMatch &&
          searchMatch
        );

      });

      const count =
        document.getElementById("resultCount");

      if (count) {
        count.textContent =
          `Showing ${shown.length} of ${items.length} pigment models`;
      }

      grid.innerHTML = shown.map(p => {

        const f = family(p);

        return `
          <a
            class="product"
            href="product.html?id=${encodeURIComponent(p.id)}"
            aria-label="View ${esc(p.model)} product details">

            ${art(p)}

            <div class="product-info">

              <small>
                ${esc(f.name)} / ${esc(p.model)}
              </small>

              <h3>
                ${esc(f.name)} Glow Powder
              </h3>

              <p>
                Particle size:
                ${esc(p.microns)} μm

                <br>

                Supplier glow:
                ${esc(p.glowHours)} hours
              </p>

              <span class="tag">
                ${esc(p.applications[0] || "Specialty")}
              </span>

              <span class="view">
                View details & sizes ↗
              </span>

            </div>

          </a>
        `;

      }).join("") || `
        <p>
          No products match these filters.
          Try clearing a filter.
        </p>
      `;

    }

    /* ======================================
       FILTER EVENTS
       ====================================== */

    [cf, af, sf].forEach(el => {

      el.addEventListener(
        el === sf ? "input" : "change",
        render
      );

    });

    const reset =
      document.getElementById("resetFilters");

    if (reset) {

      reset.addEventListener("click", () => {

        cf.value = "all";
        af.value = "all";
        sf.value = "";

        render();

      });

    }

    render();

  }

  /* ========================================
     INDIVIDUAL PRODUCT DETAIL PAGE
     ======================================== */

  const detail =
    document.getElementById("productDetail");

  if (detail) {

    const id = new URLSearchParams(
      window.location.search
    ).get("id");

    const p = items.find(x => x.id === id);

    if (!p) {

      detail.innerHTML = `
        <h1>Product not found</h1>
        <p>
          Return to the shop and choose a pigment.
        </p>
      `;

      return;

    }

    const f = family(p);

    document.title =
      `${p.model} ${f.name} | Glow Firm™`;

    detail.innerHTML = `
      <div class="detail-grid">

        <div>

          ${art(p)}

          <p class="intro">
            Product image is illustrative.
            Actual pigment appearance may vary.
          </p>

        </div>

        <div class="detail-info">

          <span class="kicker">
            GLOW FIRM™ /
            ${esc(f.name).toUpperCase()}
          </span>

          <h1>
            ${esc(f.name)} Glow Powder
          </h1>

          <p>
            Model ${esc(p.model)}
          </p>

          <p>
            ${esc(p.description)}
          </p>

          <h3 class="subhead">
            Choose your weight
          </h3>

          <div
            class="sizes"
            id="sizeOptions"
            role="group"
            aria-label="Choose powder weight">
          </div>

          <div
            class="notice"
            id="purchaseStatus"
            aria-live="polite">

            Select a weight.
            Pricing and checkout are coming soon.

          </div>

          <div class="detail-specs">

            <h3>
              Technical specifications
            </h3>

            <div class="spec-row">
              <span>Supplier model</span>
              <span>${esc(p.model)}</span>
            </div>

            <div class="spec-row">
              <span>Glow color</span>
              <span>${esc(f.name)}</span>
            </div>

            <div class="spec-row">
              <span>Particle size</span>
              <span>${esc(p.microns)} μm</span>
            </div>

            <div class="spec-row">
              <span>Visible afterglow (supplier)</span>
              <span>${esc(p.glowHours)} hours</span>
            </div>

          </div>

          <h3 class="subhead">
            Supplier-listed applications
          </h3>

          <div>
            ${p.applications.map(a => `
              <span class="tag">
                ${esc(a)}
              </span>
            `).join("")}
          </div>

          <h3 class="subhead">
            Compatibility and performance
          </h3>

          <p>
            Supplier-listed applications are guidance,
            not verified suitability. Water-based and
            solvent-based binder compatibility, outdoor
            performance, environmental safety and glow
            duration require testing and supporting
            documentation.
          </p>

        </div>

      </div>
    `;

    /* ======================================
       WEIGHT SELECTION
       ====================================== */

    const sizeBox =
      document.getElementById("sizeOptions");

    let selected = "4 oz";

    if (!cfg.sizes.includes(selected)) {
      selected = cfg.sizes[0];
    }

    function sizes() {

      sizeBox.innerHTML = cfg.sizes.map(s => `
        <button
          type="button"
          class="size-btn ${s === selected ? "selected" : ""}"
          aria-pressed="${s === selected}"
          data-size="${esc(s)}">

          ${esc(s)}

        </button>
      `).join("");

      const purchaseStatus =
        document.getElementById("purchaseStatus");

      purchaseStatus.textContent =
        `Selected: ${selected} · Price coming soon · Checkout not yet enabled.`;

      sizeBox.querySelectorAll("button").forEach(b => {

        b.addEventListener("click", () => {

          selected = b.dataset.size;

          sizes();

        });

      });

    }

    sizes();

  }

})();
