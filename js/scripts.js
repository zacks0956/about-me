// 背景画像の切り替え機能
document.addEventListener("DOMContentLoaded", function () {
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

// ゲーム用スライドショー機能 - 確実動作版
document.addEventListener("DOMContentLoaded", function () {
  const slideshow = document.querySelector(".game-slideshow");
  if (!slideshow) return;

  const slides = slideshow.querySelectorAll(".slide-image");
  const prevBtn = slideshow.querySelector(".prev-btn");
  const nextBtn = slideshow.querySelector(".next-btn");
  const indicators = slideshow.querySelectorAll(".indicator");

  if (slides.length === 0) return;

  let currentSlide = 0;

  function showSlide(index) {
    // 全てのスライドとインジケーターからactiveクラスを削除
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    // 新しいスライドとインジケーターにactiveクラスを追加
    slides[index].classList.add("active");
    indicators[index].classList.add("active");

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
  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide);
  }

  // インジケーターのクリック
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      showSlide(index);
    });
  });

  // 自動スライドショー
  setInterval(nextSlide, 6000);

  // 初期表示
  showSlide(0);
});

// 動的プレースホルダー機能
document.addEventListener("DOMContentLoaded", function () {
  // お問い合わせフォームが存在する場合のみ実行
  const contactForm = document.querySelector(".contact-form");
  if (!contactForm) return;

  // プレースホルダーのデータ
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

  // 要素を取得
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

  // プレースホルダーを削除するエフェクト
  function eraseWriter(element, speed = 50) {
    return new Promise((resolve) => {
      const currentText = element.getAttribute("placeholder");
      let i = currentText.length;

      function erase() {
        if (i > 0) {
          element.setAttribute("placeholder", currentText.substring(0, i - 1));
          i--;
          setTimeout(erase, speed);
        } else {
          resolve();
        }
      }
      erase();
    });
  }

  // プレースホルダーを循環させる関数
  async function cyclePlaceholder(
    element,
    placeholderArray,
    typingSpeed = 100
  ) {
    let currentIndex = 0;

    while (true) {
      // フォーカスされていない場合のみアニメーション実行
      if (document.activeElement !== element) {
        await typeWriter(element, placeholderArray[currentIndex], typingSpeed);
        await new Promise((resolve) => setTimeout(resolve, 3000)); // 3秒待機
        await eraseWriter(element);
        await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5秒待機
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // フォーカス中は1秒待機
      }

      currentIndex = (currentIndex + 1) % placeholderArray.length;
    }
  }

  // 各フィールドのプレースホルダーアニメーション開始
  if (nameInput) {
    cyclePlaceholder(nameInput, placeholders.name, 80);
  }

  if (emailInput) {
    // メールアドレスは少し遅らせて開始
    setTimeout(() => {
      cyclePlaceholder(emailInput, placeholders.email, 60);
    }, 1000);
  }

  if (messageTextarea) {
    // メッセージは更に遅らせて開始
    setTimeout(() => {
      cyclePlaceholder(messageTextarea, placeholders.message, 50);
    }, 2000);
  }

  // フォーカス時とブラー時の処理
  const inputs = [nameInput, emailInput, messageTextarea].filter(Boolean);

  inputs.forEach((input) => {
    // フォーカス時：アニメーションを一時停止し、元のプレースホルダーを表示
    input.addEventListener("focus", function () {
      this.setAttribute(
        "data-original-placeholder",
        this.getAttribute("placeholder")
      );
    });

    // ブラー時：値が空の場合、アニメーションを再開
    input.addEventListener("blur", function () {
      if (!this.value.trim()) {
        // アニメーションは既に動いているので、特に処理なし
      }
    });
  });

  // フォーム送信時のバリデーション強化
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // 簡単なバリデーション
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageTextarea.value.trim();
    const subject = contactForm.querySelector("#subject").value;
    const privacy = contactForm.querySelector("#privacy").checked;

    if (!name || !email || !message || !subject || !privacy) {
      alert("すべての必須項目を入力してください。");
      return;
    }

    // メールアドレス形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("正しいメールアドレス形式で入力してください。");
      return;
    }

    // 送信成功のアニメーション
    const submitBtn = contactForm.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "📤 送信中...";
    submitBtn.disabled = true;

    // 実際の送信処理をシミュレート（2秒後）
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
});
