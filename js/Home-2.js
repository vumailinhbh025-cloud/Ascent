var swiper = new Swiper(".mySwiper", {
  // --- Hiển thị 4 logo ---
  slidesPerView: 4, 
  spaceBetween: 30, 

  // --- Vòng lặp vô tận ---
  loop: true,

  // --- Tự động cuộn ---
  autoplay: {
    delay: 3000, 
    disableOnInteraction: false, 
  },
  
  // --- Nút điều hướng ---
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // --- BỎ PHẦN CẤU HÌNH PHÂN TRANG NÀY ĐI ---
  /*
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  */
  
});