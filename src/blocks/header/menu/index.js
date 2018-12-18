/**
 * Created by abaddon on 19.04.2017.
 */

class Nav {
  constructor() {
    this.toggle = document.querySelector('.js-toggle');
    this.menu = document.querySelector('.js-menu');
  }

  init() {
    if (this.toggle) {
      this.toggle.addEventListener('click', this.toggleHandler, false);
    }
  }

  /**
   * Обработчик отображения плашки меню
   * @param e
   * @private
   */
  toggleHandler = (e) => {
    const item = e.currentTarget;
    if (item.classList.contains('is-open')) {
      item.classList.remove('is-open');
      $(this.menu).stop(1, 1).slideUp(500);
    } else {
      item.classList.add('is-open');
      $(this.menu).stop(1, 1).slideDown(500);
    }
  }
}

export default new Nav();
