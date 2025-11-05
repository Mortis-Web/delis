document.addEventListener("DOMContentLoaded", () => {
  const mainImages = [...document.querySelectorAll("#currentProductImage > img")];
  const otherImagesContainer = document.querySelector(".otherImages");
  const otherImages = [...otherImagesContainer.querySelectorAll(".otherImg")];
  const prevBtn = document.getElementById("prevVariant");
  const nextBtn = document.getElementById("nextVariant");
  const variantButtonsContainer = document.getElementById("variantButtons");

  let activeIndex = 0;
  let startIndex = 0; // start of visible buttons/thumbnails
  const total = mainImages.length;
  const maxVisible = 3; // max visible buttons and images on small screens

  // Create variant buttons
const allButtons = otherImages.map((span, i) => {
  const img = span.querySelector("img");
  const btn = document.createElement("button");
  btn.classList.add("swipeVariant");
  btn.textContent = img.alt; // now it correctly uses the alt text
  btn.addEventListener("click", () => showMainImage(i));
  return btn;
});

  // Render variant buttons (always capped at 3)
 function renderVariantButtons() {
  variantButtonsContainer.innerHTML = "";

  // Always show maxVisible buttons (3)
  const visibleCount = Math.min(maxVisible, total);

  // Adjust startIndex so the active button is always visible
  if (activeIndex < startIndex) startIndex = activeIndex;
  if (activeIndex >= startIndex + visibleCount) startIndex = activeIndex - visibleCount + 1;

  for (let i = 0; i < visibleCount; i++) {
    const index = (startIndex + i) % total;
    const btn = allButtons[index];
    btn.classList.toggle("active", index === activeIndex);
    variantButtonsContainer.appendChild(btn);
  }
}

  // Render thumbnails (capped at 3 on small screens)
function renderOtherImages() {
  otherImagesContainer.innerHTML = "";
  const visibleCount = window.innerWidth <= 640 ? maxVisible : total;
  for (let i = 0; i < visibleCount; i++) {
    const index = (startIndex + i) % total;
    const span = otherImages[index];
    span.classList.toggle("active", index === activeIndex);
    otherImagesContainer.appendChild(span);
  }
}


  // Show main image & sync thumbnails & buttons
  function showMainImage(index) {
    mainImages.forEach((img, i) => img.classList.toggle("hidden", i !== index));
    activeIndex = index;

    // Adjust startIndex on small screens
    if (window.innerWidth <= 640) {
      if (activeIndex < startIndex) startIndex = activeIndex;
      if (activeIndex >= startIndex + maxVisible) startIndex = activeIndex - maxVisible + 1;
    } else {
      startIndex = 0; // show all on large screens
    }

    renderOtherImages();
    renderVariantButtons();
  }

// Click thumbnail (on the <img> inside <span>)
otherImages.forEach((span, i) => {
  const img = span.querySelector("img");
  img.addEventListener("click", () => showMainImage(i));
});

  // Navigation buttons
  prevBtn.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + total) % total;
    showMainImage(activeIndex);
  });

  nextBtn.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % total;
    showMainImage(activeIndex);
  });

  // Handle resize
  window.addEventListener("resize", () => showMainImage(activeIndex));

  // Init
  showMainImage(activeIndex);
});
