# Glow Firm™ V3 — GitHub Pages website

Contains 33 supplier models: 19 green, 7 aqua blue, 7 deep blue.

## Upload to GitHub
1. Extract this ZIP.
2. Open your existing Glow Firm repository > Code > Add file > Upload files.
3. Upload `index.html`, `product.html`, `styles.css`, `script.js`, `config.js`, and `products.js` **to the repository root**. Keep the `images` folder alongside them.
4. Commit changes. Keep Pages set to main branch, /(root). Wait for deployment and refresh the site.
5. Click a powder card to open `product.html?id=jpg-396` (example).

## Product photos
Upload photos to `images/` and edit `products.js` to set a model's `image` to `images/jpg-396.jpg`. Current glowing circles are **illustrative CSS placeholders**.

## Prices and Stripe
No prices or payment links are configured. Weight selection works, but checkout is intentionally disabled. Each product in `products.js` has `prices` and `stripeLinks` placeholders for later implementation. Do not advertise checkout as live.

## Product data
Transcribed from the uploaded 2-page Foshan Juliang photoluminescent pigment supplier table. Color families are grouped as JPG (green), JPB (aqua blue), and JPA (deep blue). Some non-JPG green models are included as supplier-listed green variants. Values are **supplier claims**, not independent test results. The supplier's usage column does not establish water/solvent binder compatibility or regulatory/environmental approval.

## Contact
Set `contactEmail` in `config.js` to a real business address when ready.
