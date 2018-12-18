/**
 * Created by abaddon on 01.06.2017.
 */
module.exports = {
    addClass: (el, className) => {
        el.classList.add(className);
    },
    removeClass: (el, className) => {
        el.classList.remove(className);
    },
    hasClass: (el, className) => {
        return el.classList.contains(className);
    }
};