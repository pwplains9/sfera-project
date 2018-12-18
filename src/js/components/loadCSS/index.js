export const linkSupportsPreload = function (tokenList, token) {
  if (!tokenList || !tokenList.supports) {
    return false;
  }
  try {
    return tokenList.supports(token);
  } catch (e) {
    return false;
  }
};
export default linkSupportsPreload;

export const onloadCSS = function (ss, callback) {
  let called;

  function newcb() {
    if (!called && callback) {
      called = true;
      callback.call(ss);
    }
  }

  if (ss.addEventListener) {
    ss.addEventListener('load', newcb);
  }
  if (ss.attachEvent) {
    ss.attachEvent('onload', newcb);
  }

  if ('isApplicationInstalled' in navigator && 'onloadcssdefined' in ss) {
    ss.onloadcssdefined(newcb);
  }
};

export const afterLoadCSS = function () {
  let css = `.loader {
    display: none;
  }`;
  const head = document.head || document.getElementsByTagName('head')[0];
  let style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  setTimeout(() => {
    head.appendChild(style);
    css = null;
    style = null;
  }, 300);
};
