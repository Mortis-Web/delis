document.addEventListener("DOMContentLoaded", () => {
  // Select all productSwiper containers
  const swiperEls = document.querySelectorAll(".productSwiper");

  swiperEls.forEach((el, index) => {
    const swiper = new Swiper(el, {
      slidesPerView: 5,
      spaceBetween: 30,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 1000,
        disableOnInteraction: true,
        reverseDirection: index % 2 !== 0, // odd-indexed swipers go opposite
      },
      pagination: {
        el: el.querySelector(".swiper-pagination"),
        clickable: true,
      },
      keyboard: { enabled: true, onlyInViewport: true },
      breakpoints: {
        1280: { slidesPerView: 5 },
        1024: { slidesPerView: 4 },
        640: { slidesPerView: 3 },
        320: { slidesPerView: 2 },
        0: { slidesPerView: 1 },
      },
    });

    // Intersection Observer to start/stop autoplay when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) swiper.autoplay.start();
          else swiper.autoplay.stop();
        });
      },
      { threshold: 0.1 } // start autoplay when 50% visible
    );

    observer.observe(el);
  });
});
