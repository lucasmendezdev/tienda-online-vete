const slides = document.querySelectorAll(".slide");

let index = 0;

setInterval(() => {

  slides[index].classList.remove("active");

  index = (index + 1) % slides.length;

  slides[index].classList.add("active");

}, 4000);

const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let position = 0;
const cardWidth = 300; // ancho aproximado card + gap

nextBtn.addEventListener('click', () => {
  position -= cardWidth;
  if (Math.abs(position) > track.scrollWidth - track.clientWidth) {
    position = 0;
  }
  track.style.transform = `translateX(${position}px)`;
});

prevBtn.addEventListener('click', () => {
  position += cardWidth;
  if (position > 0) {
    position = -(track.scrollWidth - track.clientWidth);
  }
  track.style.transform = `translateX(${position}px)`;
});