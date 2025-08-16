// 背景画像の切り替え機能
document.addEventListener("DOMContentLoaded", function() {
  const bgSwitcher = document.querySelector(".lol-background-switcher");
  if (bgSwitcher) {
    const images = bgSwitcher.querySelectorAll(".bg-image");
    let currentIndex = 0;

    setInterval(() => {
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("active");
    }, 5000); // 5秒ごとに切り替え
  }
});

// ゲーム用スライドショー機能
document.addEventListener("DOMContentLoaded", function() {
  const slideshow = document.querySelector(".game-slideshow");
  if (slideshow) {
    const slides = slideshow.querySelectorAll(".slide-image");
    const prevBtn = slideshow.querySelector(".prev-btn");
    const nextBtn = slideshow.querySelector(".next-btn");
    const indicators = slideshow.querySelectorAll(".indicator");
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (indicators[i]) {
          indicators[i].classList.remove("active");
        }
      });
      
      if (slides[index]) {
        slides[index].classList.add("active");
      }
      if (indicators[index]) {
        indicators[index].classList.add("active");
      }
      currentSlide = index;
    }

    function nextSlide() {
      const nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    }

    function prevSlide() {
      const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prevIndex);
    }

    // イベントリスナー
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    // インジケーターのクリック
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => showSlide(index));
    });

    // 自動スライドショー（10秒間隔）
    setInterval(nextSlide, 10000);

    // 初期表示
    showSlide(0);
  }
});