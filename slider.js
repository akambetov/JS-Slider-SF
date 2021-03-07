let position = 0;
const slidereContainer = document.querySelector(".slider-container");
const sliderTrack = document.querySelector(".slider-track");
const sliderItem = document.querySelectorAll(".slider-item");
const itemW = sliderItem[0].width;
const trackW = itemW * (sliderItem.length - 1);

const prev = document.querySelector(".arrow-left");
const next = document.querySelector(".arrow-right");
const controlPoints = Array.from(document.querySelectorAll(".point"));
console.log(controlPoints);

prev.addEventListener("click", slideBack);
next.addEventListener("click", slideNext);
controlPoints.forEach((point, idx) => {
  point.addEventListener("click", () => {
    position = -idx * itemW;
    slideByPoints(position);
    point.classList.add("active");
  });
});

function slideNext() {
  // Классы для точек слайдера
  controlPoints.forEach((item) => item.classList.remove("active"));
  let idx = Math.abs(position) / itemW + 1;
  if (idx > controlPoints.length - 1) idx = 0;
  controlPoints[idx].classList.add("active");
  console.log(idx);

  Math.abs(position) >= trackW ? (position = 0) : (position -= itemW);
  sliderTrack.style.transform = `translateX(${position}px)`;
}
function slideBack() {
  // Классы для точек слайдера
  controlPoints.forEach((item) => item.classList.remove("active"));
  let idx = Math.abs(position) / itemW + 1;
  if (idx > controlPoints.length - 1) idx = 0;
  controlPoints[idx].classList.add("active");
  console.log(idx);

  position === 0 ? (position = -trackW) : (position += itemW);
  sliderTrack.style.transform = `translateX(${position}px)`;
}
function slideByPoints(position) {
  controlPoints.forEach((item) => item.classList.remove("active"));
  sliderTrack.style.transform = `translateX(${position}px)`;
}
