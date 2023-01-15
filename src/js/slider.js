$(document).ready(function () {
  $('.slider').slick({
    arrows: false,
    dots: true,
    speed: 1000,
    easing: 'ease-in',
    autoplay: true,
    autoplaySpeed: 4000,
    draggable: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true
        }
      }
    ]
  });
})