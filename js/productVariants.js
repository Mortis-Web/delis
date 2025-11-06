document.addEventListener("DOMContentLoaded", () => {
  const mainSwiper = new Swiper(".currentProductSwiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    grabCursor: true,
    loop: true,
    speed: 750,
    keyboard: { enabled: true },
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
  });

  const variantButtonsContainer = document.getElementById("variantButtons");
  const slides = document.querySelectorAll(".currentProductSwiper .swiper-slide img");
  const otherImagesContainer = document.querySelector(".otherImages");
  const otherImages = Array.from(document.querySelectorAll(".otherImages .otherImg"));
  const total = slides.length;

  let thumbStartIndex = 0;
  let buttonStartIndex = 0;
let maxVisibleThumbs = 6;
  let maxVisibleButtons = 1;

  // ✅ Create variant buttons
  const allButtons = Array.from(slides).map((img, i) => {
    const btn = document.createElement("button");
    btn.className = "swipeVariant";
    btn.textContent = img.alt;
    btn.addEventListener("click", () => mainSwiper.slideToLoop(i));
    return btn;
  });

  // ✅ Thumbnail click → change swiper slide
  otherImages.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
      mainSwiper.slideToLoop(i);
    });
  });

  // ✅ Render thumbnails (show only 5)
  function renderThumbnails(activeIndex = 0) {
    otherImagesContainer.innerHTML = "";
    const visibleCount = Math.min(maxVisibleThumbs, total);

    // Adjust thumbnail start index
    if (activeIndex < thumbStartIndex) thumbStartIndex = activeIndex;
    if (activeIndex >= thumbStartIndex + visibleCount)
      thumbStartIndex = activeIndex - visibleCount + 1;

    // Render visible thumbnails
    for (let i = 0; i < visibleCount; i++) {
      const index = (thumbStartIndex + i + total) % total;
      const thumb = otherImages[index];
      thumb.classList.toggle("active", index === activeIndex);
      otherImagesContainer.appendChild(thumb);
    }
  }

  // ✅ Render variant buttons (same logic but separate state)
  function renderVariantButtons(activeIndex = 0) {
    variantButtonsContainer.innerHTML = "";
    const visibleCount = Math.min(maxVisibleButtons, total);

    if (activeIndex < buttonStartIndex) buttonStartIndex = activeIndex;
    if (activeIndex >= buttonStartIndex + visibleCount)
      buttonStartIndex = activeIndex - visibleCount + 1;

    for (let i = 0; i < visibleCount; i++) {
      const index = (buttonStartIndex + i + total) % total;
      const btn = allButtons[index];
      btn.classList.toggle("active", index === activeIndex);
      variantButtonsContainer.appendChild(btn);
    }
  }

  // ✅ Update active thumb + buttons
  function updateActive(index) {
    renderThumbnails(index);
    renderVariantButtons(index);
  }

  // ✅ Sync on swiper change
  mainSwiper.on("slideChange", () => {
    updateActive(mainSwiper.realIndex);
  });

  // ✅ Responsive buttons (for small screens)
  window.addEventListener("resize", () => {
    const newMaxVisible = 1;
    if (newMaxVisible !== maxVisibleButtons) {
      maxVisibleButtons = newMaxVisible;
      renderVariantButtons(mainSwiper.realIndex);
    }

  const newMaxVisibleThumbs = 6; // 👈 update for thumbnails
  if (newMaxVisibleThumbs !== maxVisibleThumbs) {
    maxVisibleThumbs = newMaxVisibleThumbs;
    renderThumbnails(mainSwiper.realIndex);
  }
  });

  // ✅ Initial render
  renderThumbnails(0);
  renderVariantButtons(0);

  const popup = document.querySelector('#imagePopup')
  const popupImageHolder = document.querySelector('#zoomedImage')
  const popupImage = document.querySelector('#zoomedImage img')
  const closeBtn = document.querySelector('#closeBtn')


  slides.forEach((slide)=>{
    slide.addEventListener('click',()=>{
      popup.classList.add('active')
      document.body.style.overflow = 'hidden'

       const activeIndex = mainSwiper.realIndex;
    popupImage.src = slides[activeIndex].src;

    })
  })

  const closePopup = ()=>{
    popup.classList.remove('active');
    document.body.style.overflow = ''

  }

  closeBtn.addEventListener('click',closePopup)
  popup.addEventListener('click',(e)=>{
    if(!popupImageHolder.contains(e.target)){
      closePopup();
    }
  })



});
