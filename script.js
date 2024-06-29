document.addEventListener("DOMContentLoaded", function () {
  const sliderContent = document.querySelector(".slider-content");
  const slides = document.querySelectorAll(".slide-card");
  const dots = document.querySelectorAll(".dot");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  const totalSlides = slides.length;
  let slideWidth = slides[0].offsetWidth;
  let currentSlideIndex = 0;
  let isAnimating = false; // Flag to prevent rapid multiple clicks

  function updateSlideWidth() {
    slideWidth = slides[0].offsetWidth;
  }

  function updateActiveDot(index) {
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  function updateButtonColors(index) {
    if (index === 0) {
      prevButton.style.backgroundColor = "#222020";
    } else {
      prevButton.style.backgroundColor = "#0071BD";
    }

    if (index >= totalSlides - 3) {
      nextButton.style.backgroundColor = "#222020";
    } else {
      nextButton.style.backgroundColor = "#0071BD";
    }
  }

  function goToSlide(index) {
    if (isAnimating) return;
    isAnimating = true;

    if (index >= totalSlides - 3) {
      currentSlideIndex = totalSlides - 3;
    } else if (index < 0) {
      currentSlideIndex = 0;
    } else {
      currentSlideIndex = index;
    }

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      sliderContent.style.transform = `translateX(-${
        currentSlideIndex * 375
      }px)`;
    } else {
      sliderContent.style.transform = `translateX(-${
        currentSlideIndex * 390
      }px)`;
    }

    sliderContent.style.transition = "transform 0.5s ease-in-out";
    updateActiveDot(currentSlideIndex);
    updateButtonColors(currentSlideIndex);

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  function slideLeft() {
    goToSlide(currentSlideIndex - 1);
  }

  function slideRight() {
    goToSlide(currentSlideIndex + 1);
  }

  document.querySelector(".prev").addEventListener("click", slideLeft);
  document.querySelector(".next").addEventListener("click", slideRight);

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      goToSlide(parseInt(this.getAttribute("data-index")));
    });
  });

  window.addEventListener("resize", () => {
    updateSlideWidth();
    goToSlide(currentSlideIndex);
  });

  updateSlideWidth();
  updateButtonColors(currentSlideIndex); // Initialize button colors
});
