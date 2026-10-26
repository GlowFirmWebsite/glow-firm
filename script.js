
/* ============================================
   GLOW FIRM™ - COMPLETE SCRIPT.JS
   Homepage + Shop + Product Details
   Images stored in MAIN GitHub directory
   ============================================ */

(() => {
  "use strict";

  const cfg = window.GLOW_FIRM_CONFIG || {};
  const items = window.GLOW_PRODUCTS || [];

  const families = cfg.families || {
    green: { name: "Electric Green", hex: "#b8ff64" },
    aqua: { name: "Aqua Blue", hex: "#32f4e5" },
    blue: { name: "Deep Blue", hex: "#4778ff" }
  };

  const apps = [
    "Paint & Coatings",
    "Arts & Crafts",
    "Roads & Paving",
    "Plastics & Molding",
    "Glass & Ceramics",
    "Printing & Inks"
  ];

  const appIcons = {
    "Paint & Coatings": "◈",
    "Arts & Crafts": "✳",
    "Roads & Paving": "▥",
    "Plastics & Molding": "⬡",
    "Glass & Ceramics": "◇",
    "Printing & Inks": "▤"
  };

  /* ============================================
     CORRECT IMAGE PATHS
     NO "images/" FOLDER
     ============================================ */

  const powderImages = {
    green: "glow-powder-green-bowl.png",
    aqua: "glow-powder-aqua-blue-bowl.png",
    blue: "glow-powder-deep-blue-bowl.png"
  };

  function getFamily(product) {
    return families[product.family] || families.green;
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(
      /[&<>"']/g,
      character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[character]
    );
  }

  function getImage(product) {
    return (
      product.image ||
      powderImages[product.family] ||
      ""
    );
  }

  /* ============================================
     PRODUCT IMAGE DISPLAY
     ============================================ */

  function productArtwork(product, isDetail = false) {
    const family = getFamily(product);
    const image = getImage(product);

    const detailClass = isDetail
      ? "gf-detail-art"
      : "gf-card-art";

    const imageHTML = image
      ? `
        <img
          class="gf-product-photo"
          src="${escapeHTML(image)}"
          alt="${escapeHTML(family.name)} pigment ${escapeHTML(product.model)}"
          loading="${isDetail ? "eager" : "lazy"}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='block'"
        >
      `
      : "";

    return `
      <div
        class="product-art ${detailClass}"
        style="--pigment:${escapeHTML(family.hex || "#b8ff64")}"
      >
        ${imageHTML}

        <div
          class="pigment"
          style="display:${image ? "none" : "block"}"
          aria-hidden="true"
        ></div>
      </div>
    `;
  }

  /* ============================================
     IMAGE STYLING
     FULL IMAGE VISIBLE - NO CROPPING
     ============================================ */

  const imageStyles = document.createElement("style");

  imageStyles.textContent = `
    .products .gf-card-art {
      height: 220px;
      min-height: 220px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000;
      overflow: hidden;
    }

    .gf-product-photo {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain !important;
      object-position: center center !important;
    }

    .detail-grid .gf-detail-art {
      width: 100%;
      min-height: 420px;
      height: 440px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000;
      border-radius: 16px;
      overflow: hidden;
    }

    .detail-grid .gf-detail-art img {
      width: 100%;
      height: 100%;
      object-fit: contain !important;
    }

    @media (max-width: 680px) {
      .products .gf-card-art {
        height: 175px;
        min-height: 175px;
      }

      .detail-grid .gf-detail-art {
        height: 300px;
        min-height: 300px;
      }
    }
  `;

  document.head.appendChild(imageStyles);

  /* ============================================
     COPYRIGHT YEAR
     ============================================ */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ============================================
     MOBILE NAVIGATION
     ============================================ */

  const menuButton = document.getElementById("menuBtn");
  const navigation = document.getElementById("nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });
  }

  /* ============================================
     CONTACT EMAIL
     ============================================ */

  const contactElement =
    document.getElementById("contactStatus");

  if (contactElement && cfg.contactEmail) {
    contactElement.innerHTML = `
      Email us at
      <a href="mailto:${escapeHTML(cfg.contactEmail)}">
        ${escapeHTML(cfg.contactEmail)}
      </a>
    `;
  }

  /* ============================================
     SHOP PAGE
     ============================================ */

  const productGrid = document.getElementById("products");

  if (productGrid) {
    const colorFilter =
      document.getElementById("colorFilter");

    const appFilter =
      document.getElementById("appFilter");

    const searchFilter =
      document.getElementById("searchFilter");

    const resultCount =
      document.getElementById("resultCount");

    const resetButton =
      document.getElementById("resetFilters");

    if (colorFilter && appFilter && searchFilter) {

      /* ========================================
         APPLICATION FILTER OPTIONS
         ======================================== */

      apps.forEach(app => {
        const alreadyExists = Array.from(
          appFilter.options
        ).some(option => option.value === app);

        if (!alreadyExists) {
          appFilter.add(new Option(app, app));
        }
      });

      /* ========================================
         APPLICATION TILES
         ======================================== */

      const applicationTiles =
        document.getElementById("applicationTiles");

      if (applicationTiles) {
        applicationTiles.innerHTML = apps.map(app => `
          <button
            class="application-tile"
            type="button"
            data-app="${escapeHTML(app)}"
          >
            <span>${appIcons[app]}</span>
            ${escapeHTML(app)} ↗
          </button>
        `).join("");

        applicationTiles
          .querySelectorAll("button")
          .forEach(button => {
            button.addEventListener("click", () => {
              appFilter.value = button.dataset.app;
              renderProducts();

              const shopSection =
                document.getElementById("shop");

              if (shopSection) {
                shopSection.scrollIntoView({
                  behavior: "smooth"
                });
              }
            });
          });
      }

      /* ========================================
         READ FILTERS FROM URL
         ======================================== */

      const urlParams = new URLSearchParams(
        window.location.search
      );

      const requestedColor = urlParams.get("color");
      const requestedApp = urlParams.get("application");

      if (
        ["green", "aqua", "blue"].includes(requestedColor)
      ) {
        colorFilter.value = requestedColor;
      }

      if (apps.includes(requestedApp)) {
        appFilter.value = requestedApp;
      }

      /* ========================================
         RENDER ALL PRODUCT CARDS
         ======================================== */

      function renderProducts() {
        const searchTerm = searchFilter.value
          .trim()
          .toLowerCase();

        const filteredProducts = items.filter(product => {
          const matchesColor =
            colorFilter.value === "all" ||
            product.family === colorFilter.value;

          const matchesApplication =
            appFilter.value === "all" ||
            product.applications.includes(appFilter.value);

          const matchesSearch =
            !searchTerm ||
            product.model.toLowerCase().includes(searchTerm);

          return (
            matchesColor &&
            matchesApplication &&
            matchesSearch
          );
        });

        if (resultCount) {
          resultCount.textContent =
            `Showing ${filteredProducts.length} of ${items.length} pigment models`;
        }

        if (filteredProducts.length === 0) {
          productGrid.innerHTML = `
            <p>
              No products match these filters.
              Try clearing a filter.
            </p>
          `;
          return;
        }

        productGrid.innerHTML = filteredProducts.map(product => {
          const family = getFamily(product);

          return `
            <a
              class="product"
              href="product.html?id=${encodeURIComponent(product.id)}"
              aria-label="View ${escapeHTML(product.model)} product details"
            >
              ${productArtwork(product)}

              <div class="product-info">
                <small>
                  ${escapeHTML(family.name)}
                  /
                  ${escapeHTML(product.model)}
                </small>

                <h3>
                  ${escapeHTML(family.name)} Glow Powder
                </h3>

                <p>
                  Particle size:
                  ${escapeHTML(product.microns)} μm
                  <br>
                  Supplier glow:
                  ${escapeHTML(product.glowHours)} hours
                </p>

                <span class="tag">
                  ${escapeHTML(product.applications[0] || "Specialty")}
                </span>

                <span class="view">
                  View details & sizes ↗
                </span>
              </div>
            </a>
          `;
        }).join("");
      }

      /* ========================================
         FILTER EVENTS
         ======================================== */

      colorFilter.addEventListener(
        "change",
        renderProducts
      );

      appFilter.addEventListener(
        "change",
        renderProducts
      );

      searchFilter.addEventListener(
        "input",
        renderProducts
      );

      if (resetButton) {
        resetButton.addEventListener("click", () => {
          colorFilter.value = "all";
          appFilter.value = "all";
          searchFilter.value = "";
          renderProducts();
        });
      }

      renderProducts();
    }
  }

  /* ============================================
     INDIVIDUAL PRODUCT DETAIL PAGE
     ============================================ */

  const productDetail =
    document.getElementById("productDetail");

  if (productDetail) {
    const urlParams = new URLSearchParams(
      window.location.search
    );

    const productId = urlParams.get("id");

    const product = items.find(
      item => item.id === productId
    );

    if (!product) {
      productDetail.innerHTML = `
        <h1>Product not found</h1>
        <p>
          Return to the shop and choose a pigment.
        </p>
        <a class="btn" href="shop.html">
          Back to Shop
        </a>
      `;
      return;
    }

    const family = getFamily(product);

    document.title =
      `${product.model} ${family.name} | Glow Firm™`;

    productDetail.innerHTML = `
      <div class="detail-grid">

        <div>
          ${productArtwork(product, true)}

          <p class="intro">
            Product image is illustrative.
            Actual pigment appearance may vary.
          </p>
        </div>

        <div class="detail-info">

          <span class="kicker">
            GLOW FIRM™ /
            ${escapeHTML(family.name).toUpperCase()}
          </span>

          <h1>
            ${escapeHTML(family.name)} Glow Powder
          </h1>

          <p>
            Model ${escapeHTML(product.model)}
          </p>

          <p>
            ${escapeHTML(product.description)}
          </p>

          <h3 class="subhead">
            Choose your weight
          </h3>

          <div
            class="sizes"
            id="sizeOptions"
            role="group"
            aria-label="Choose powder weight"
          ></div>

          <div
            class="notice"
            id="purchaseStatus"
            aria-live="polite"
          >
            Select a weight.
            Pricing and checkout are coming soon.
          </div>

          <div class="detail-specs">

            <h3>Technical specifications</h3>

            <div class="spec-row">
              <span>Supplier model</span>
              <span>${escapeHTML(product.model)}</span>
            </div>

            <div class="spec-row">
              <span>Glow color</span>
              <span>${escapeHTML(family.name)}</span>
            </div>

            <div class="spec-row">
              <span>Particle size</span>
              <span>${escapeHTML(product.microns)} μm</span>
            </div>

            <div class="spec-row">
              <span>Visible afterglow (supplier)</span>
              <span>${escapeHTML(product.glowHours)} hours</span>
            </div>

          </div>

          <h3 class="subhead">
            Supplier-listed applications
          </h3>

          <div>
            ${product.applications.map(app => `
              <span class="tag">
                ${escapeHTML(app)}
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
            performance, environmental safety, and glow
            duration require testing and supporting
            documentation.
          </p>

        </div>
      </div>
    `;

    /* ========================================
       PRODUCT WEIGHT SELECTION
       ======================================== */

    const sizeOptions =
      document.getElementById("sizeOptions");

    const purchaseStatus =
      document.getElementById("purchaseStatus");

    const availableSizes = Array.isArray(cfg.sizes)
      ? cfg.sizes
      : ["1 oz", "2 oz", "4 oz", "8 oz", "16 oz"];

    let selectedSize = availableSizes.includes("4 oz")
      ? "4 oz"
      : availableSizes[0];

    function renderSizes() {
      sizeOptions.innerHTML = availableSizes.map(size => `
        <button
          type="button"
          class="size-btn ${size === selectedSize ? "selected" : ""}"
          aria-pressed="${size === selectedSize}"
          data-size="${escapeHTML(size)}"
        >
          ${escapeHTML(size)}
        </button>
      `).join("");

      if (purchaseStatus) {
        purchaseStatus.textContent =
          `Selected: ${selectedSize} · Price coming soon · Checkout not yet enabled.`;
      }

      sizeOptions
        .querySelectorAll("button")
        .forEach(button => {
          button.addEventListener("click", () => {
            selectedSize = button.dataset.size;
            renderSizes();
          });
        });
    }

    renderSizes();
  }

})();
