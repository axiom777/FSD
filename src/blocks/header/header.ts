document.addEventListener('DOMContentLoaded', () => {
  const hamburgers: NodeList = document.querySelectorAll(
    '.js-header__mobile-button',
  );
  hamburgers.forEach((hamburger) => {
    const controls = hamburger.parentNode?.querySelector(
      '.js-header__controls',
    ) as HTMLElement;
    hamburger.addEventListener('click', () => {
      (hamburger as HTMLElement).classList.toggle('header__mobile-button_actived');
      controls.classList.toggle('header__controls_actived');
    });
  });
});
