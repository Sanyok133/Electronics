const button = document.querySelector('.header__menu-button')
const nav = document.querySelector('.header__nav-wrapper')
const page = document.querySelector('.page__body')
const navAbout = document.querySelector('.nav-about');
nav.classList.remove('header__nav-wrapper--no-js')
button.addEventListener('click', () => {
  nav.classList.toggle('header__nav-wrapper--opened')
  page.classList.toggle('page__body--no-scroll')
  navAbout.style.cssText = `height: ${window.innerHeight - 75}px`
})

const category = document.querySelectorAll('.info-list__category')
const list = document.querySelectorAll('.info-list__links-list')
const arrow = document.querySelectorAll('.info-list__category-arrow')
for (let i = 0; i < list.length; i++) {
  let deg = 0
  list[i].classList.remove('info-list__links-list--no-js')
  category[i].addEventListener('click', (e) => {
    e.preventDefault()
    category[i].classList.toggle('info-list__category--opened')
    arrow[i].style.cssText = `transform: rotate(${deg += 180}deg)`
    list[i].classList.toggle('info-list__links-list--opened')
  })
}
