document.addEventListener('DOMContentLoaded', () => {
  const hamburgers = document.querySelectorAll('.js-header__mobile-button');
  hamburgers.forEach((hamburger) => {
    const controls = hamburger.parentNode.querySelector('.js-header__controls');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('header__mobile-button_actived');
      controls.classList.toggle('header__controls_actived');
    });
  });
});
