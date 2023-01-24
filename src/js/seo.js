const seoLink = document.querySelector('.seo__link')
const seoArrow = document.querySelector('.seo__link-arrow')
const seoWrapper = document.querySelector('.seo__wrapper')
let seoDeg = 0;
seoLink.addEventListener('click', (e) => {
  e.preventDefault();
  seoArrow.style.cssText = `transform: rotate(${seoDeg += 180}deg)`
  seoWrapper.classList.toggle('seo__wrapper--opened')
})