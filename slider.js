// Позиция трека галереи
let position = 0;
// Позиция трека текстового описания
let positionAbout = 0;

// Элементы галереи (картинки)
const slidereContainer = document.querySelector(".slider-container");
const sliderTrack = document.querySelector(".slider-track");
const sliderItem = document.querySelectorAll(".slider-item");
const itemW = sliderItem[0].width;
const trackW = itemW * (sliderItem.length - 1);

// Элементы с текстовым описанием галереи (картинок)
const slidereAboutContainer = document.querySelector(".slider-about-container");
const sliderAboutTrack = document.querySelector(".slider-about-track");
const sliderAboutItem = document.querySelectorAll(".slider-about-item");
const itemAboutH = slidereAboutContainer.clientHeight; // sliderAboutItem[0].clientHeight;
const trackAboutH = itemAboutH * (sliderAboutItem.length - 1);
console.log(itemAboutH);
// Элементы управления
const prev = document.querySelector(".arrow-left");
const next = document.querySelector(".arrow-right");
const mobilePrev = document.querySelector(".mobile-arrow-left");
const mobileNext = document.querySelector(".mobile-arrow-right");
const controlPoints = Array.from(document.querySelectorAll(".point"));
const links = Array.from(document.querySelectorAll(".projects-nav-item a"));

// Добавить слушатели на ссылки и точки
function addSlideListener(arr) {
  arr.forEach((item, idx) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      position = -idx * itemW;
      positionAbout = -idx * itemAboutH;
      slideByPointsLinks(position, positionAbout);
      addActiveClass(idx);
    });
  });
}

// Добавить активный класс для точек и ссылок
function addActiveClass(idx) {
  links[idx].classList.add("active");
  controlPoints[idx].classList.add("active");
}
// Удалить активный класс с точек и ссылок
function removeActiveClass(arr) {
  arr.forEach((item) => item.classList.remove("active"));
}

// Listeners
addSlideListener(controlPoints);
addSlideListener(links);
prev.addEventListener("click", slideArrowBack);
next.addEventListener("click", slideArrowNext);
mobilePrev.addEventListener("click", slideArrowBack);
mobileNext.addEventListener("click", slideArrowNext);

function slideArrowNext() {
  // Активный класс для точек и ссылок
  removeActiveClass([...controlPoints, ...links]);
  let idx = Math.abs(position) / itemW + 1;
  if (idx > controlPoints.length - 1) idx = 0;
  controlPoints[idx].classList.add("active");
  links[idx].classList.add("active");

  // слайд картинок
  Math.abs(position) >= trackW ? (position = 0) : (position -= itemW);
  sliderTrack.style.transform = `translateX(${position}px)`;

  // слайд текста
  Math.abs(positionAbout) >= trackAboutH
    ? (positionAbout = 0)
    : (positionAbout -= itemAboutH);
  sliderAboutTrack.style.transform = `translateY(${positionAbout}px)`;
}

function slideArrowBack() {
  // Активный класс для точек и ссылок
  removeActiveClass([...controlPoints, ...links]);
  let idx = Math.abs(position) / itemW - 1;
  if (idx < 0) idx = controlPoints.length - 1;
  controlPoints[idx].classList.add("active");
  links[idx].classList.add("active");

  // слайд картинок
  position === 0 ? (position = -trackW) : (position += itemW);
  sliderTrack.style.transform = `translateX(${position}px)`;

  // слайд текста
  positionAbout === 0
    ? (positionAbout -= itemAboutH * (sliderAboutItem.length - 1))
    : (positionAbout += itemAboutH);
  sliderAboutTrack.style.transform = `translateY(${positionAbout}px)`;
}

function slideByPointsLinks(position, positionAbout) {
  removeActiveClass([...controlPoints, ...links]);
  sliderTrack.style.transform = `translateX(${position}px)`;
  sliderAboutTrack.style.transform = `translateY(${positionAbout}px)`;
}
