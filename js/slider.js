$(document).ready(function () {
  $('#slider-main').slick({
    arrows: false,
    dots: true,
    easing: 'ease-in',
    mobileFirst: true,
    appendDots: $('.slider__dots-main'),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true
        }
      }
    ]
  });

  $("#slider-news").slick({
    arrows: true,
    dots: true,
    easing: 'ease-in',
    appendDots: $('.slider__dots'),
    mobileFirst: true,
  });
})