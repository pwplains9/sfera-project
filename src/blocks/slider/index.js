/**
 * Created by Abaddon on 26.02.2017.
 */
import '../../js/vendors/flex/flexslider.css';

require('../../js/vendors/flex/jquery.flexslider-min');

class MainSlider {
  constructor(slider) {
    this.slider = slider;
  }

  init() {
    if (this.slider) {
      const speed = +this.slider.getAttribute('data-speed');
      $(this.slider).flexslider({
        touch: true,
        slideshowSpeed: Number.isNaN(speed) ? 5000 : speed,
        animationSpeed: 2000,
      });
    }
  }
}

export default new MainSlider();
