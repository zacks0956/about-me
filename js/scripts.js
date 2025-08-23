// メイン初期化
document.addEventListener("DOMContentLoaded", function () {
  // 背景画像の切り替え機能
  const bgSwitcher = document.querySelector(".lol-background-switcher");
  if (bgSwitcher) {
    const images = bgSwitcher.querySelectorAll(".bg-image");
    let currentIndex = 0;

    setInterval(() => {
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("active");
    }, 5000);
  }

  // ゲーム用スライドショー機能
  const slideshow = document.querySelector(".game-slideshow");
  if (slideshow) {
    const slides = slideshow.querySelectorAll(".slide-image");
    const prevBtn = slideshow.querySelector(".prev-btn");
    const nextBtn = slideshow.querySelector(".next-btn");
    const indicators = slideshow.querySelectorAll(".indicator");

    if (slides.length > 0) {
      let currentSlide = 0;

      function showSlide(index) {
        slides.forEach((slide) => slide.classList.remove("active"));
        indicators.forEach((indicator) => indicator.classList.remove("active"));
        slides[index].classList.add("active");
        indicators[index].classList.add("active");
        currentSlide = index;
      }

      function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
      }

      function prevSlide() {
        showSlide((currentSlide - 1 + slides.length) % slides.length);
      }

      // イベントリスナー
      if (nextBtn) nextBtn.addEventListener("click", nextSlide);
      if (prevBtn) prevBtn.addEventListener("click", prevSlide);

      indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => showSlide(index));
      });

      // 自動スライドショー
      setInterval(nextSlide, 6000);
      showSlide(0);
    }
  }

  // 動的プレースホルダー機能
  // 動的プレースホルダー機能
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    const placeholders = {
      name: ["山田 太郎", "田中 花子", "佐藤 次郎", "鈴木 美咲", "高橋 健一"],
      email: [
        "example@email.com",
        "contact@gmail.com",
        "info@yahoo.co.jp",
        "hello@outlook.com",
        "user@hotmail.com",
      ],
      message: [
        "お問い合わせ内容をご記入ください...",
        "ご質問やご相談がございましたら、お気軽にお書きください...",
        "お仕事のご依頼について詳しく教えてください...",
        "技術的な質問やご相談をお聞かせください...",
        "コラボレーションについて詳細をお教えください...",
      ],
    };

    const nameInput = contactForm.querySelector("#name");
    const emailInput = contactForm.querySelector("#email");
    const messageTextarea = contactForm.querySelector("#message");

    // タイピングエフェクト関数
    function typeWriter(element, text, speed = 100) {
      return new Promise((resolve) => {
        let i = 0;
        element.setAttribute("placeholder", "");

        function type() {
          if (i < text.length) {
            element.setAttribute(
              "placeholder",
              element.getAttribute("placeholder") + text.charAt(i)
            );
            i++;
            setTimeout(type, speed);
          } else {
            resolve();
          }
        }
        type();
      });
    }

    // 削除エフェクト関数
    function eraseWriter(element, speed = 50) {
      return new Promise((resolve) => {
        const currentText = element.getAttribute("placeholder");
        let i = currentText.length;

        function erase() {
          if (i > 0) {
            element.setAttribute(
              "placeholder",
              currentText.substring(0, i - 1)
            );
            i--;
            setTimeout(erase, speed);
          } else {
            resolve();
          }
        }
        erase();
      });
    }

    // プレースホルダー循環関数
    async function cyclePlaceholder(
      element,
      placeholderArray,
      typingSpeed = 100
    ) {
      let currentIndex = 0;
      while (true) {
        if (document.activeElement !== element) {
          await typeWriter(
            element,
            placeholderArray[currentIndex],
            typingSpeed
          );
          await new Promise((resolve) => setTimeout(resolve, 3000));
          await eraseWriter(element);
          await new Promise((resolve) => setTimeout(resolve, 500));
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        currentIndex = (currentIndex + 1) % placeholderArray.length;
      }
    }

    // プレースホルダーアニメーション開始
    if (nameInput) cyclePlaceholder(nameInput, placeholders.name, 80);
    if (emailInput)
      setTimeout(
        () => cyclePlaceholder(emailInput, placeholders.email, 60),
        1000
      );
    if (messageTextarea)
      setTimeout(
        () => cyclePlaceholder(messageTextarea, placeholders.message, 50),
        2000
      );

    // フォーム送信処理
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageTextarea.value.trim();
      const subject = contactForm.querySelector("#subject").value;

      if (!name || !email || !message || !subject) {
        alert("すべての必須項目を入力してください。");
        return;
      }

      // メールアドレス形式チェック
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("正しいメールアドレス形式で入力してください。");
        return;
      }

      // 送信アニメーション
      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "📤 送信中...";
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = "✅ 送信完了！";
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          contactForm.reset();
          alert("お問い合わせを送信しました。ありがとうございます！");
        }, 2000);
      }, 2000);
    });
  }

  // 背景動画の初期化
  const backgroundVideo = document.getElementById("video2");
  if (backgroundVideo) {
    // 動画の読み込みが完了したら再生を開始
    backgroundVideo.addEventListener("loadeddata", function () {
      backgroundVideo.play().catch((error) => {
        console.log("動画の自動再生が失敗しました:", error);
      });
    });

    // 動画が既に読み込まれている場合は即座に再生
    if (backgroundVideo.readyState >= 2) {
      backgroundVideo.play().catch((error) => {
        console.log("動画の自動再生が失敗しました:", error);
      });
    }
  }
});
