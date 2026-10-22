/* EDIT THIS FILE to configure your shop. Each checkout link must be a REAL Stripe Payment Link. */
window.GLOW_FIRM_CONFIG = {
  contactEmail: "", // e.g. "hello@yourdomain.com" (leave empty until ready)
  currency: "USD",
  colors: [
    {id:"green",name:"Electric Green",hex:"#adff55",description:"Bright green glow pigment"},
    {id:"aqua",name:"Arctic Aqua",hex:"#51ffdc",description:"Cool aqua glow pigment"},
    {id:"blue",name:"Midnight Blue",hex:"#6b9cff",description:"Blue glow pigment"}
  ],
  sizes: ["1 oz","2 oz","4 oz","8 oz","16 oz"],
  // Example: "green-1": {price: "12.00", stripeUrl: "https://buy.stripe.com/your-real-link"}
  products: {}
};
