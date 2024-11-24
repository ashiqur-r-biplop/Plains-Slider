const sliderContent = document.querySelector(".slider-content");
const slides = document.querySelectorAll(".slide-card");
const dots = document.querySelectorAll(".slider-dot");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const sliderContainer = document.querySelector(".slider-container");

let currentSlideIndex = 0;
let slideWidth = slides[0].offsetWidth;
let autoSlideInterval; // Stores the auto-slide interval
let isAnimating = false; // Prevents multiple clicks during animation

// Updates the slide width dynamically on window resize
function updateSlideWidth() {
  slideWidth = slides[0].offsetWidth;
}

// Updates the active dot's appearance
function updateActiveDot(index) {
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

// Updates button colors based on the current slide index
function updateButtonColors(index) {
  prevButton.style.backgroundColor = index === 0 ? "#222020" : "#1B3A57";
  nextButton.style.backgroundColor =
    index >= slides.length - 3 ? "#222020" : "#1B3A57";
}

// Moves the slider to a specific slide
function goToSlide(index) {
  if (isAnimating) return;
  isAnimating = true;

  const maxIndex = slides.length - 3;
  currentSlideIndex = Math.max(0, Math.min(index, maxIndex));

  const isMobile = window.innerWidth < 768;
  const translateValue = currentSlideIndex * (isMobile ? window.innerWidth : 390);
  sliderContent.style.transform = `translateX(-${translateValue}px)`;
  sliderContent.style.transition = "transform 0.5s ease-in-out";

  updateActiveDot(currentSlideIndex);
  updateButtonColors(currentSlideIndex);

  setTimeout(() => (isAnimating = false), 500);
}

// Handles previous and next button clicks
function slideLeft() {
  goToSlide(currentSlideIndex - 1);
}
function slideRight() {
  goToSlide(currentSlideIndex + 1);
}

// Auto-slide functionality
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    slideRight();
    if (currentSlideIndex === slides.length - 3) {
      clearInterval(autoSlideInterval);
      setTimeout(() => {
        goToSlide(0);
        startAutoSlide();
      }, 3000);
    }
  }, 3000);
}
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Event Listeners
prevButton.addEventListener("click", slideLeft);
nextButton.addEventListener("click", slideRight);
dots.forEach((dot) => {
  dot.addEventListener("click", () =>
    goToSlide(parseInt(dot.getAttribute("data-index")))
  );
});
window.addEventListener("resize", () => {
  updateSlideWidth();
  goToSlide(currentSlideIndex);
});
sliderContainer.addEventListener("mouseover", stopAutoSlide);
sliderContainer.addEventListener("mouseleave", startAutoSlide);

// Initialize slider
updateSlideWidth();
updateButtonColors(currentSlideIndex);
startAutoSlide();
