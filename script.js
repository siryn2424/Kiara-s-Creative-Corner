// 1. Cross-Page Dark / Light Mode
const themeToggle = document.getElementById("themeToggle");
if (localStorage.getItem("amatic_theme") === "dark") {
  document.body.classList.add("dark-mode");
  if (themeToggle) themeToggle.checked = true;
}

if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    const dark = themeToggle.checked;
    document.body.classList.toggle("dark-mode", dark);
    localStorage.setItem("amatic_theme", dark ? "dark" : "light");
  });
}

// 2. Banner becomes transparent on scroll
const topBanner = document.getElementById("topBanner");
window.addEventListener("scroll", () => {
  if (!topBanner) return;
  topBanner.classList.toggle("scrolled", window.scrollY > 20);
});

// 3. Built-in Pastel SVG Placeholder & "How to Order" Poster so images always render
function makePastelSvg(label, bgHex = "#ffd6e6", fgHex = "#4d1d33") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
    <rect width="800" height="500" fill="${bgHex}"/>
    <circle cx="670" cy="95" r="110" fill="#ffffff" fill-opacity="0.28"/>
    <circle cx="120" cy="420" r="130" fill="#e06d99" fill-opacity="0.22"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${fgHex}" font-family="Segoe UI, sans-serif" font-size="34" font-weight="700">${escapeXml(label)}</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function makeOrderPosterSvg() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="760" viewBox="0 0 600 760">
    <rect width="600" height="760" rx="28" fill="#ffe6ef"/>
    <rect x="32" y="32" width="536" height="696" rx="20" fill="#ffffff" stroke="#e06d99" stroke-width="3"/>
    <text x="300" y="105" text-anchor="middle" fill="#c44b79" font-family="Segoe UI, sans-serif" font-size="36" font-weight="800">HOW TO ORDER</text>
    <text x="300" y="145" text-anchor="middle" fill="#705360" font-family="Segoe UI, sans-serif" font-size="18">AMATIC SC • Kiara's Creative Corner</text>
    <line x1="80" y1="175" x2="520" y2="175" stroke="#f5cddc" stroke-width="2"/>
    <text x="75" y="240" fill="#2e1b24" font-family="Segoe UI, sans-serif" font-size="22" font-weight="700">1. Pick Your Favorite Piece</text>
    <text x="75" y="272" fill="#705360" font-family="Segoe UI, sans-serif" font-size="17">Choose from Crochets, Keychains, or Candles.</text>
    <text x="75" y="345" fill="#2e1b24" font-family="Segoe UI, sans-serif" font-size="22" font-weight="700">2. Send Your Order Details</text>
    <text x="75" y="377" fill="#705360" font-family="Segoe UI, sans-serif" font-size="17">Message FB: Kiara's Creative Corner or email</text>
    <text x="75" y="403" fill="#705360" font-family="Segoe UI, sans-serif" font-size="17">kiara.kapengbarako@gmail.com</text>
    <text x="75" y="475" fill="#2e1b24" font-family="Segoe UI, sans-serif" font-size="22" font-weight="700">3. Confirm &amp; Settle</text>
    <text x="75" y="507" fill="#705360" font-family="Segoe UI, sans-serif" font-size="17">Wait for confirmation and payment instructions.</text>
    <text x="75" y="580" fill="#2e1b24" font-family="Segoe UI, sans-serif" font-size="22" font-weight="700">4. Delivery or Pickup</text>
    <text x="75" y="612" fill="#705360" font-family="Segoe UI, sans-serif" font-size="17">Get your handmade piece with extra warmth!</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// Attach fallback if a local image file in assets/ is missing
document.querySelectorAll("img[data-fallback]").forEach((img) => {
  img.addEventListener("error", () => {
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = "1";
    img.src = makePastelSvg(img.alt || "AMATIC SC");
  });
});

function openOrderPoster() {
  const modal = document.getElementById("orderPosterModal");
  const posterImg = document.getElementById("orderPosterImg");
  if (posterImg) {
    posterImg.src = makeOrderPosterSvg();
  }
  if (modal) modal.classList.add("open");
}

function closeOrderPoster() {
  const modal = document.getElementById("orderPosterModal");
  if (modal) modal.classList.remove("open");
}

// 4. Products Catalog (Bouquets: 3, Bags: 2, Scrunchies: 2, Keychains: 3, Candles: 4)
const PRODUCTS = {
  bouquets: [
    { id: "bq-1", name: "Earthy Bouquet", img: "image/earthyBouquet.jpeg", desc: "Soft pastel blooms hand-crocheted for lasting keepsake gifting." },
    { id: "bq-2", name: "Red Roses Bouquet", img: "image/redroses.jpeg", desc: "Mixed crochet blossoms arranged with gentle texture and care." },
    { id: "bq-3", name: "Mini Tulip Keepsake", img: "image/Assorted color roses.jpeg", desc: "Compact yarn tulip bundle ideal for desks, shelves, or surprises." }
  ],
  bags: [
    { id: "bg-1", name: "Ube Crochet Purse", img: "image/bag1.jpg", desc: "Roomy handmade tote crafted for notebooks, pouches, and daily essentials." },
    { id: "bg-2", name: "Sweetheart Bag Set", img: "image/bag2.PNG", desc: "Light and neat everyday bag for quick errands and outings." }
  ],
  scrunchies: [
    { id: "sc-1", name: "Cloud Scrunchie", img: "image/chunckiescrunchie.jpeg", desc: "Plush, gentle hair scrunchie made with soft pastel yarn." },
    { id: "sc-2", name: "Curly Scrunchie", img: "image/curlyscrunchie.jpeg", desc: "Charming ruffled scrunchie that looks sweet in hair or on your wrist." }
  ],
  keychains: [
    { id: "kc-1", name: "Chunky Letter Keychain", img: "image/chunkykeychain.JPG", desc: "Bold letter charm styled with playful accents for keys or bags." },
    { id: "kc-2", name: "Mini Stanley Keychain", img: "image/keychainstanley.JPG", desc: "Cute berry-inspired keychain for pouches, totes, and gift sets." },
    { id: "kc-3", name: "Kid's Keychain Bracelet", img: "image/kid’sbracelet.jpg", desc: "Soft bow charm adding a dainty pastel touch to everyday carry." }
  ],
  candles: [
    { id: "cd-1", name: "Pink Sugar Calm", img: "assets/p-cd1.jpg", desc: "Sweet, cozy scent poured for winding down after busy days." },
    { id: "cd-2", name: "Warm Vanilla Cream", img: "assets/p-cd2.jpg", desc: "Smooth vanilla fragrance that softens any room or study corner." },
    { id: "cd-3", name: "Peony & Mist", img: "assets/p-cd3.jpg", desc: "Light floral scent with a clean, comforting finish." },
    { id: "cd-4", name: "Honeyed Amber", img: "assets/p-cd4.jpg", desc: "Warm amber blend crafted for relaxed evenings and slow rest." }
  ]
};

document.querySelectorAll("[data-group]").forEach((container) => {
  const group = container.dataset.group;
  (PRODUCTS[group] || []).forEach((item) => {
    const card = document.createElement("div");
    card.className = "modern-tile";
    card.innerHTML = `
      <img src="${item.img}" alt="${escapeAttr(item.name)}" />
      <div class="modern-tile-label">${escapeHtml(item.name)}</div>
    `;
    const imgEl = card.querySelector("img");
    imgEl.addEventListener("error", () => {
      if (imgEl.dataset.fb) return;
      imgEl.dataset.fb = "1";
      imgEl.src = makePastelSvg(item.name);
    });
    card.addEventListener("click", () => openProductModal(item));
    container.appendChild(card);
  });
});

// 5. Product Modal, Likes & Per-Product Reviews
let activeProductId = null;

function readStore() {
  return JSON.parse(localStorage.getItem("amatic_reviews_likes") || "{}");
}

function writeStore(data) {
  localStorage.setItem("amatic_reviews_likes", JSON.stringify(data));
}

function openProductModal(item) {
  activeProductId = item.id;
  const modalImg = document.getElementById("modalProdImg");
  modalImg.src = item.img;
  modalImg.alt = item.name;
  modalImg.onerror = () => {
    modalImg.onerror = null;
    modalImg.src = makePastelSvg(item.name);
  };
  document.getElementById("modalProdName").textContent = item.name;
  document.getElementById("modalProdDesc").textContent = item.desc;
  renderProductMeta();
  document.getElementById("productModal").classList.add("open");
}

function closeProductModal() {
  document.getElementById("productModal").classList.remove("open");
  activeProductId = null;
}

function renderProductMeta() {
  if (!activeProductId) return;
  const store = readStore();
  const record = store[activeProductId] || { likes: 0, reviews: [] };
  document.getElementById("likeCount").textContent = record.likes;

  const list = document.getElementById("reviewList");
  list.innerHTML = "";
  if (record.reviews.length === 0) {
    list.innerHTML = `<p style="color:var(--muted); font-size:0.9rem;">No reviews yet for this product.</p>`;
  } else {
    record.reviews.forEach((rev) => {
      const box = document.createElement("div");
      box.className = "review-entry";
      box.innerHTML = `<strong>${escapeHtml(rev.name)}</strong>: ${escapeHtml(rev.comment)}`;
      list.appendChild(box);
    });
  }
}

const likeBtn = document.getElementById("likeBtn");
if (likeBtn) {
  likeBtn.addEventListener("click", () => {
    if (!activeProductId) return;
    const store = readStore();
    if (!store[activeProductId]) store[activeProductId] = { likes: 0, reviews: [] };
    store[activeProductId].likes += 1;
    writeStore(store);
    renderProductMeta();
  });
}

const reviewForm = document.getElementById("reviewForm");
if (reviewForm) {
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!activeProductId) return;
    const nameEl = document.getElementById("reviewerName");
    const textEl = document.getElementById("reviewText");
    const name = nameEl.value.trim();
    const comment = textEl.value.trim();
    if (!name || !comment) return;

    const store = readStore();
    if (!store[activeProductId]) store[activeProductId] = { likes: 0, reviews: [] };
    store[activeProductId].reviews.push({ name, comment });
    writeStore(store);

    nameEl.value = "";
    textEl.value = "";
    renderProductMeta();
  });
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/'/g, "&#39;");
}

function escapeXml(s) {
  return escapeHtml(s).replace(/'/g, "&apos;");
}