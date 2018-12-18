/**
 * Created by abaddon on 31.05.2017.
 */

class LazyLoad {
  constructor() {
    this.list = [];
  }

  init(list) {
    for (let i = 0, ln = list.length; i < ln; i += 1) {
      this.list.push(list[i]);
    }
    this.scrollHandler();
    $(window).scroll(this.scrollHandler);
  }

  /**
   * Обработка скрола страницы
   */
  scrollHandler = () => {
    for (let i = 0, ln = this.list.length; i < ln; i += 1) {
      const image = this.list[i];
      if (image && !image.isLoad) {
        if (LazyLoad.checkElementInViewport(image)) {
          LazyLoad.loadImage(image, i).then((j) => {
            this.list[j].isLoad = true;
          });
        }
      } else {
        this.list.splice(i, 1);
      }
    }
  };

  /**
   * Проверяет находится ли изображение в области просмотра
   * @param image
   */
  static checkElementInViewport(image) {
    const rect = image.getBoundingClientRect();
    return (
      rect.top >= 0
      && rect.left >= 0
      && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  /**
   * Подгрузка изображения
   * @param image
   * @param index
   */
  static loadImage(image, index) {
    const localImage = image;
    return new Promise((resolve, reject) => {
      const img = new Image();
      const src = image.getAttribute('data-img');
      const type = image.getAttribute('data-type');
      img.onload = () => {
        const isParent = !!image.parent;
        if (isParent) {
          if (type === 'bg') {
            localImage.parentNode.classList.add('is-load');
            localImage.parentNode.style.cssText += `background-image: url(${src})`;
          } else {
            img.classList.add('is-load');
            localImage.parent.replaceChild(img);
          }
        } else if (type === 'bg') {
          localImage.parentNode.classList.add('is-load');
          localImage.parentNode.style.cssText += `background-image: url(${src})`;
        } else {
          localImage.classList.add('is-load');
          localImage.src = src;
        }
        resolve(index);
      };
      img.onerror = () => {
        reject(index);
      };
      img.src = src;
    });
  }
}

export default new LazyLoad();
