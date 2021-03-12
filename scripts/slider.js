const content = [
  {
    city: "Rostov-on-Don <br>LCD admiral",
    area: "81 m2",
    repairTime: "3.5 months",
    сost: "Upon request",
  },
  {
    city: "Sochi <br>Thieves",
    area: "105 m2",
    repairTime: "4 months",
    сost: "Upon request",
  },
  {
    city: "Rostov-on-Don <br>Patriotic",
    area: "93 m2",
    repairTime: "3 months",
    сost: "Upon request",
  },
];
// Позиция трека галереи
let position = 0;

// Элементы галереи (картинки)
const slidereContainer = document.querySelector(".slider-container");
const sliderTrack = document.querySelector(".slider-track");
const sliderItem = document.querySelectorAll(".slider-item");
const itemW = sliderItem[0].width;
const trackW = itemW * (sliderItem.length - 1);

// Элементы DOM для текста
const cityNode = document.querySelector("#city");
const areaNode = document.querySelector("#area");
const repairTimeNode = document.querySelector("#repair-time");
const costNode = document.querySelector("#cost");

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
      slideByPointsLinks(position);
      addActiveClass(idx);
      renderContent(idx);
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
// Рендер текста
function renderContent(idx) {
  cityNode.innerHTML = content[idx].city;
  areaNode.innerText = content[idx].area;
  repairTimeNode.innerText = content[idx].repairTime;
  costNode.innerText = content[idx].сost;
}

/* Была задумка, что поля с названием города, площади, времени и цены
  в HTML сделать пустым, потом динамически заполнить в скрипте при "onload".
  Потом подумал, что оставлять в HTML пустые элементы неправильно. 
*/
// window.addEventListener("load", () => {
//   renderContent(0);
// });

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

  // Рендер текста
  renderContent(idx);
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

  // Рендер текста
  renderContent(idx);
}

function slideByPointsLinks(position) {
  removeActiveClass([...controlPoints, ...links]);
  sliderTrack.style.transform = `translateX(${position}px)`;
}
