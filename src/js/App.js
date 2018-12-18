/**
 * Created by abaddon on 26.05.2017.
 */
/* global SvgEvery, isMobile */
import config from '../../config/environments.config';
import {
  onloadCSS,
  afterLoadCSS,
} from './components/loadCSS';

const {
  loadCSS,
} = require('fg-loadcss');

class Application {
  constructor() {
    this.body = document.querySelector('body');
  }

  /**
   * Run application function
   */
  start() {
    const css = loadCSS(process.env.DEMO_ENV === 'production' ? config.productionStyles : 'css/style.css');
    onloadCSS(css, () => {
      // Анимация для страницы
      if (document.querySelector('.has-anim')) {
        require.ensure([], (require) => {
          const AOS = require('aos');
          AOS.init({
            disable: 'mobile',
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 100,
          });
        });
      }
      afterLoadCSS();
    });

    SvgEvery();
    if (isMobile.any) {
      this.body.classList.add('is-mobile');
    }
    // Навигация
    require.ensure([], (require) => {
      const Nav = require('../blocks/header/menu/index').default;
      Nav.init();
    });

    // Отложенная подгрузка изображений
    const Images = document.querySelectorAll('.js-lazy');
    if (Images.length) {
      require.ensure([], (require) => {
        const Lazy = require('./components/LazyLoad').default;
        Lazy.init();
      });
    }
    //Маска для телефона
    const tel = document.querySelector('.js-tel');
    if (tel) {
      require.ensure([], (require) => {
        const Inputmask = require('inputmask');
        Inputmask({ "mask": "(999) 999-9999" }).mask('.js-tel');
      });
    }

    Application.initFancybox();
    Application.pagesMenu();
  }

  /**
   * Подключение fancybox
   */
  static initFancybox() {
    const fancy = document.querySelectorAll('.js-fancy') || [];
    if (fancy.length) {
      require.ensure([], (require) => {
        require('./vendors/fancybox/jquery.fancybox.js');
        require('./vendors/fancybox/jquery.fancybox.css');
        $('.js-fancy').fancybox();
      });
    }
  }

  /**
   * Подгрузка дев меню для отладки
   */
  static pagesMenu() {
    if (process.env.NODE_ENV === 'development') {
      Application.loadPagesMenuJs();
    } else if (process.env.DEMO_ENV === 'demo') {
      Application.loadPagesMenuJs();
    }
  }

  /**
   * Подгрузка скриптов для дев
   */
  static loadPagesMenuJs() {
    require.ensure([], (require) => {
      const pageWidget = require('./vendors/pages').default;
      pageWidget(['index']);
    });
  }
}

export default new Application();
