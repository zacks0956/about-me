// メイン初期化
document.addEventListener("DOMContentLoaded", function () {
  // 背景画像の切り替え機能
  const bgSwitcher = document.querySelector(".lol-background-switcher");
  if (bgSwitcher) {
    const images = bgSwitcher.querySelectorAll(".bg-image");
    if (images.length > 1) {
      let currentIndex = 0;

      setInterval(() => {
        images[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add("active");
      }, 5000);
    }
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
  // フォームバリデーション機能と動的プレースホルダー機能（contact.htmlページ用）
  const contactFormEl = document.querySelector(".contact-form");
  if (contactFormEl) {
    const nameField = contactFormEl.querySelector("#name");
    const emailField = contactFormEl.querySelector("#email");
    const subjectField = contactFormEl.querySelector("#subject");
    const messageField = contactFormEl.querySelector("#message");

    // 動的プレースホルダー用データ
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
    if (nameField) cyclePlaceholder(nameField, placeholders.name, 80);
    if (emailField)
      setTimeout(
        () => cyclePlaceholder(emailField, placeholders.email, 60),
        1000
      );
    if (messageField)
      setTimeout(
        () => cyclePlaceholder(messageField, placeholders.message, 50),
        2000
      );

    // バリデーション関数
    const validators = {
      name: (value) => {
        const errors = [];
        if (!value.trim()) {
          errors.push("お名前は必須項目です。");
        } else if (value.trim().length < 2) {
          errors.push("お名前は2文字以上で入力してください。");
        } else if (value.trim().length > 50) {
          errors.push("お名前は50文字以内で入力してください。");
        }
        return errors;
      },

      email: (value) => {
        const errors = [];
        const emailRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!value.trim()) {
          errors.push("メールアドレスは必須項目です。");
        } else if (!emailRegex.test(value)) {
          errors.push("正しいメールアドレスの形式で入力してください。");
        } else if (value.length > 100) {
          errors.push("メールアドレスは100文字以内で入力してください。");
        }
        return errors;
      },

      subject: (value) => {
        const errors = [];
        if (!value) {
          errors.push("件名を選択してください。");
        }
        return errors;
      },

      message: (value) => {
        const errors = [];
        if (!value.trim()) {
          errors.push("メッセージは必須項目です。");
        } else if (value.trim().length < 10) {
          errors.push("メッセージは10文字以上で入力してください。");
        } else if (value.trim().length > 1000) {
          errors.push("メッセージは1000文字以内で入力してください。");
        }
        return errors;
      },
    };

    // エラーメッセージ表示関数
    function showError(field, errors) {
      const errorElement = document.getElementById(field.id + "-error");
      if (errorElement) {
        if (errors.length > 0) {
          errorElement.textContent = errors[0];
          errorElement.classList.add("show");
          field.classList.add("error");
          field.classList.remove("valid");
        } else {
          errorElement.textContent = "";
          errorElement.classList.remove("show");
          field.classList.remove("error");
          field.classList.add("valid");
        }
      }
    }

    // リアルタイムバリデーション
    if (nameField) {
      nameField.addEventListener("blur", () => {
        const errors = validators.name(nameField.value);
        showError(nameField, errors);
      });
    }

    if (emailField) {
      emailField.addEventListener("blur", () => {
        const errors = validators.email(emailField.value);
        showError(emailField, errors);
      });
    }

    if (subjectField) {
      subjectField.addEventListener("change", () => {
        const errors = validators.subject(subjectField.value);
        showError(subjectField, errors);
      });
    }

    if (messageField) {
      messageField.addEventListener("blur", () => {
        const errors = validators.message(messageField.value);
        showError(messageField, errors);
      });
    }

    // フォーム送信処理
    contactFormEl.addEventListener("submit", function (event) {
      event.preventDefault();

      let hasErrors = false;

      // 全フィールドのバリデーション
      const fields = [
        { field: nameField, validator: validators.name },
        { field: emailField, validator: validators.email },
        { field: subjectField, validator: validators.subject },
        { field: messageField, validator: validators.message },
      ];

      fields.forEach(({ field, validator }) => {
        if (field) {
          const errors = validator(field.value);
          showError(field, errors);
          if (errors.length > 0) hasErrors = true;
        }
      });

      if (!hasErrors) {
        // フォーム送信処理
        const submitBtn = contactFormEl.querySelector(".submit-btn");
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = "📤 送信中...";

        setTimeout(() => {
          submitBtn.textContent = "✅ 送信完了！";

          setTimeout(() => {
            // 成功メッセージ表示
            alert("お問い合わせを送信しました。ありがとうございます！");

            // フォームリセット
            contactFormEl.reset();

            // フィールドのクラスをクリア
            fields.forEach(({ field }) => {
              if (field) {
                field.classList.remove("valid", "error");
                const errorElement = document.getElementById(
                  field.id + "-error"
                );
                if (errorElement) {
                  errorElement.classList.remove("show");
                }
              }
            });

            // ボタンを元に戻す
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }, 2000);
        }, 2000);
      }
    });

    // リセットボタンの処理
    const resetBtn = contactFormEl.querySelector(".reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        // エラーメッセージとクラスをクリア
        const fields = [nameField, emailField, subjectField, messageField];
        fields.forEach((field) => {
          if (field) {
            field.classList.remove("valid", "error");
            const errorElement = document.getElementById(field.id + "-error");
            if (errorElement) {
              errorElement.classList.remove("show");
            }
          }
        });
      });
    }
  }

  // 背景動画の初期化と切り替え
  const backgroundVideos = [
    document.getElementById("video1"),
    document.getElementById("video2"),
  ];

  // 動画の初期化
  backgroundVideos.forEach((backgroundVideo) => {
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

  // 動画の切り替え機能（index.htmlのみ）
  if (backgroundVideos[0] && backgroundVideos[1]) {
    let currentVideoIndex = 0;

    setInterval(() => {
      // 現在の動画を非表示に
      backgroundVideos[currentVideoIndex].classList.remove("active");

      // 次の動画に切り替え
      currentVideoIndex = (currentVideoIndex + 1) % backgroundVideos.length;

      // 新しい動画を表示
      backgroundVideos[currentVideoIndex].classList.add("active");
    }, 10000); // 10秒ごとに切り替え
  }
});
