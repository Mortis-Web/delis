// Select all categorySwiper containers
const swiperEls = document.querySelectorAll(".productSwiper");

swiperEls.forEach((el) => {
  new Swiper(el, {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: true,
    speed: 750,
    autoplay: { delay: 2000, disableOnInteraction: true },
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
});
