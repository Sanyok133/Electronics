$(document).ready(function () {
  const header = $('.header')
  const nav = $('.header__nav-wrapper')
  $(window).on('wheel', function (e) {
    if ($(this).innerWidth() < 768 && !nav.hasClass('header__nav-wrapper--opened')) {
      if (e.originalEvent.wheelDelta <= 0) {
        header.addClass('header--hidden')
      } else {
        header.removeClass('header--hidden')
      }
    } else if ($(this).innerWidth() > 768) {
      header.removeClass('header--hidden')
    }
  })

  // По свайпу
  let last;
  $(window).bind('touchmove', function (e) {
    let current = e.originalEvent.touches[0].clientY;
    if ($(this).innerWidth() < 768) {
      if (current < last) {
        header.addClass('header--hidden')
      } else {
        header.removeClass('header--hidden')
      }
    }
    last = current;
  })
})
