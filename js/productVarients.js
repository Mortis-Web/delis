document.addEventListener("DOMContentLoaded", () => {
  const dir = document.documentElement.getAttribute("dir") || "ltr";
  const imgEls = [...document.querySelectorAll(".productImage img")];
  const nameEl = document.getElementById("selectedProductName");
  const descEl = document.getElementById("selectedProductDesc");
  const variantContainer = document.getElementById("variantButtons");
  const prevBtn = document.getElementById("prevVarient");
  const nextBtn = document.getElementById("nextVarient");

  let activeIndex = 0;
  let startIndex = 0;
  const total = imgEls.length;
  const visibleCount = 3;

  // ✅ Build buttons dynamically from existing images
  const allBtns = imgEls.map((img, i) => {
    const btn = document.createElement("button");
    btn.textContent = dir === "rtl" ? img.alt : img.alt;
    btn.classList.add("swipeVarient");
    if (i === activeIndex) btn.classList.add("active");
    btn.dataset.index = i;
    btn.addEventListener("click", () => showVariant(i));
    return btn;
  });

  // ✅ Render visible variants (3 at a time)
  function renderVariants() {
    variantContainer.innerHTML = "";
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % total;
      variantContainer.appendChild(allBtns[index]);
    }
  }

  // ✅ Toggle visible image
  function showVariant(index) {
    imgEls.forEach((img, i) => img.classList.toggle("hidden", i !== index));
    allBtns.forEach((b, i) => b.classList.toggle("active", i === index));
    activeIndex = index;
  }

  // ✅ Navigation buttons
  prevBtn.addEventListener("click", () => {
    startIndex = (startIndex - 1 + total) % total;
    activeIndex = (activeIndex - 1 + total) % total;
    renderVariants();
    showVariant(activeIndex);
  });

  nextBtn.addEventListener("click", () => {
    startIndex = (startIndex + 1) % total;
    activeIndex = (activeIndex + 1) % total;
    renderVariants();
    showVariant(activeIndex);
  });

  // ✅ Init
  renderVariants();
  showVariant(activeIndex);
});
