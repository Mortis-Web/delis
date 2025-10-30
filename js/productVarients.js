document.addEventListener("DOMContentLoaded", () => {
  const dir = document.documentElement.getAttribute("dir") || "ltr";

  const productData = {
    name: dir === "rtl" ? "سائل جلي ديلاس" : "Dellis Dishwashing Liquid",
    description:
      dir === "rtl"
        ? "سائل جلي ديلاس عالي التركيز 460 مل تركيبة متطورة بتقنية الكلور بدون كلور لازالة الدهون والروائح ولمعة للاواني بثلاث روائح مميزة وعناية فائقة للايدي الحساسة"
        : "Dellis high-concentration dishwashing liquid (460ml) — an advanced formula with chlorine-free technology for removing grease and odors, giving dishes a brilliant shine. Comes in multiple scents and offers superior care for sensitive hands.",
    variants:
      dir === "rtl"
        ? [
            { name: "صنوبر", image: "../media/images/product1.png" },
            { name: "ليمون", image: "../media/images/product2.png" },
            { name: "فراولة", image: "../media/images/product1.png" },
            { name: "لافندر", image: "../media/images/product2.png" },
          ]
        : [
            { name: "Pine", image: "../media/images/product1.png" },
            { name: "Lemon", image: "../media/images/product2.png" },
            { name: "Strawberry", image: "../media/images/product1.png" },
            { name: "Lavender", image: "../media/images/product2.png" },
          ],
  };

  // --- DOM Elements ---
  const nameEl = document.getElementById("selectedProductName");
  const descEl = document.getElementById("selectedProductDesc");
  const imgEl = document.getElementById("productImage");
  const variantContainer = document.getElementById("variantButtons");
  const prevBtn = document.getElementById("prevVarient");
  const nextBtn = document.getElementById("nextVarient");

  // --- State ---
  let startIndex = 0;
  let activeIndex = 0;
  const visibleCount = 3;

  // --- Render Initial Product ---
  function renderProduct() {
    nameEl.textContent = productData.name;
    descEl.textContent = productData.description;
    updateVariants();
    updateActiveVariant();
  }

  // --- Update visible variant buttons ---
  function updateVariants() {
    variantContainer.innerHTML = "";
    const total = productData.variants.length;

    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % total;
      const variant = productData.variants[index];

      const btn = document.createElement("button");
      btn.textContent = variant.name;
      btn.classList.add("swipeVarient");
      if (index === activeIndex) btn.classList.add("active");

      btn.addEventListener("click", () => {
        activeIndex = index;
        updateActiveVariant();
        updateVariants();
      });

      variantContainer.appendChild(btn);
    }
  }

  // --- Update product image & active class ---
  function updateActiveVariant() {
    const current = productData.variants[activeIndex];
    imgEl.src = current.image;
  }

  // --- Navigation logic (infinite) ---
  prevBtn.addEventListener("click", () => {
    startIndex = (startIndex - 1 + productData.variants.length) % productData.variants.length;
    activeIndex = (activeIndex - 1 + productData.variants.length) % productData.variants.length;
    updateVariants();
    updateActiveVariant();
  });

  nextBtn.addEventListener("click", () => {
    startIndex = (startIndex + 1) % productData.variants.length;
    activeIndex = (activeIndex + 1) % productData.variants.length;
    updateVariants();
    updateActiveVariant();
  });

  // --- Initialize ---
  renderProduct();
});
