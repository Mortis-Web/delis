function scrollToTop() {
  if (window.lenis && typeof window.lenis.scrollTo === "function") {
    window.lenis.scrollTo(0, { immediate: false });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const dir = document.documentElement.getAttribute("dir") || "ltr";
  const isArabic = dir.toLowerCase() === "rtl";

  const products = [...document.querySelectorAll("#allProducts article")];
  const paginationNumbers = document.getElementById("paginationNumbers");
  const btnNext = document.getElementById("next");
  const btnPrev = document.getElementById("prev");
  const productAmount = document.getElementById("productAmount");

  const searchInput = document.getElementById("productSearcher");
  const searchBtn = document.querySelector(".searchEngine .readMore");

  let filteredProducts = [...products];
  const perPage = 9;
  let currentPage = 1;

  function updateAmountText() {
    const total = filteredProducts.length;
    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(start + perPage - 1, total);

    if (total === 0) {
      productAmount.textContent = isArabic
        ? "لا توجد منتجات مطابقة"
        : "No matching products";
      return;
    }

    productAmount.textContent = isArabic
      ? `عرض ${start}-${end} من ${total}`
      : `Showing ${start}-${end} of ${total}`;
  }

  function showPage(page) {
    const start = (page - 1) * perPage;
    const end = start + perPage;

    products.forEach((product) => {
      product.style.display = "none";
    });

    filteredProducts.slice(start, end).forEach((product, i) => {
      product.style.display = "flex";
      product.style.opacity = "0";
      product.style.transform = "scale(0.9)";
      product.style.transition = "opacity 0.75s ease, transform 0.75s ease";

      setTimeout(() => {
        product.style.opacity = "1";
        product.style.transform = "scale(1)";
      }, i * 80);
    });

    updatePagination();
    updateAmountText();

    if (window.lenis && typeof window.lenis.resize === "function") {
      window.lenis.resize();
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToTop);
    });
  }

  function updatePagination() {
    paginationNumbers.innerHTML = "";

    const totalPages = Math.ceil(filteredProducts.length / perPage);
    if (totalPages <= 1) {
      btnPrev.style.display = "none";
      btnNext.style.display = "none";
      return;
    }

    const isMobile = window.innerWidth <= 768;
    const maxVisible = isMobile ? 1 : 5;

    const addBtn = (pageNum, active = false) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "paginationNumber";
      btn.textContent = pageNum;
      if (active) btn.classList.add("active");
      btn.onclick = () => {
        currentPage = pageNum;
        showPage(currentPage);
      };
      paginationNumbers.appendChild(btn);
    };

    const addDots = () => {
      const dots = document.createElement("button");
      dots.className = "paginationNumber dots";
      dots.textContent = "...";
      dots.disabled = true;
      paginationNumbers.appendChild(dots);
    };

    if (!isMobile) {
      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) addBtn(i, i === currentPage);
      } else if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) addBtn(i, i === currentPage);
        addDots();
        addBtn(totalPages);
      } else if (currentPage >= totalPages - 2) {
        addBtn(1);
        addDots();
        for (let i = totalPages - 2; i <= totalPages; i++)
          addBtn(i, i === currentPage);
      } else {
        addBtn(1);
        addDots();
        addBtn(currentPage - 1);
        addBtn(currentPage, true);
        addBtn(currentPage + 1);
        addDots();
        addBtn(totalPages);
      }
    } else {
      addBtn(1, currentPage === 1);
      if (totalPages > 2) addDots();
      addBtn(totalPages, currentPage === totalPages);
    }

    btnPrev.style.display = currentPage === 1 ? "none" : "inline-block";
    btnNext.style.display =
      currentPage === totalPages ? "none" : "inline-block";


  }

  function updateSearch() {
    const query = searchInput.value.trim().toLowerCase();

    filteredProducts = products.filter((card) =>
      card
        .querySelector(".productName")
        .textContent.trim()
        .toLowerCase()
        .includes(query)
    );

    currentPage = 1;
    showPage(currentPage);
  }

  searchBtn.addEventListener("click", updateSearch);

  btnNext.onclick = () => {
    const totalPages = Math.ceil(filteredProducts.length / perPage);
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  };

  btnPrev.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  };

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query === "") {
      filteredProducts = [...products];
      currentPage = 1;
      showPage(currentPage);
    }
  });

  showPage(currentPage);
});
