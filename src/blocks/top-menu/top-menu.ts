function handleTouch(evt: Event) {
  const element: HTMLElement = evt.target as HTMLElement;
  if (element.classList.contains('top-menu__link_submenu')) {
    evt.preventDefault();
    const parentElement = element.parentNode as HTMLElement;
    parentElement.classList.toggle('top-menu__item_active');
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const topMenus = document.querySelectorAll('.js-top-menu');
  const screenWidth = window.innerWidth;
  if (topMenus.length > 0 && screenWidth < 992) {
    topMenus.forEach((topMenu) => {
      topMenu.classList.remove('top-menu_desktop');
      topMenu.classList.add('top-menu_touchable');
      topMenu.addEventListener('click', (evt) => handleTouch.call(window, evt));
    });
  }
});
