# Glow Firm™ — GitHub Pages Website

## Preview on GitHub Pages

1. Open your existing GitHub repository.
2. Upload **index.html, styles.css, script.js, config.js** to the repository root (NOT the ZIP itself). You can drag all four files into **Add file → Upload files**. If files already exist, replace them with these versions.
3. Select **Commit changes**.
4. Go to **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**. Choose **main** and **/(root)**, then Save.
5. Visit `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`. If your repository is named `YOUR-USERNAME.github.io`, visit `https://YOUR-USERNAME.github.io/`.
6. Allow a few minutes for deployment. No custom domain is needed.

## Enable checkout with Stripe Payment Links

The 15 products are **display-only** until you configure their prices and REAL Stripe Payment Links. No live purchases are possible by default.

1. Create a Stripe account and set up a product and Payment Link for each product/size combination.
2. Open `config.js` and edit `products` entries. IDs use the format `green-1` through `green-5`, `aqua-1` through `aqua-5`, and `blue-1` through `blue-5`. Sizes in order: 1 oz, 2 oz, 4 oz, 8 oz, 16 oz.
3. Example:

```js
products: {
  "green-1": {price: "12.00", stripeUrl: "https://buy.stripe.com/YOUR_REAL_LINK"},
  "aqua-2": {price: "20.00", stripeUrl: "https://buy.stripe.com/YOUR_REAL_LINK"}
}
```

4. To activate email contact, change `contactEmail: ""` to your actual business email.
5. Commit the changed `config.js` to GitHub. The store updates automatically after deployment.

## Notes

- The powder art is CSS illustration, not a photo of a tested product.
- The three color families and 15 size variants are editable starter catalog placeholders; adjust to your actual inventory.
- The site does not claim Coast Guard approval, environmental compliance, guaranteed glow duration, or other unverified product specifications.
- GitHub Pages is static hosting; Stripe-hosted Payment Links handle checkout off-site. No secret API keys belong in these files.
- You can later connect a domain purchased from GoDaddy in Settings → Pages.
