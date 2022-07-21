/**
 * @file
 * WCAG tools
 */
(function () {

  "use strict";

  /** Black and white version **/
  const html = document.getElementsByTagName('html')[0];
  var black_white = localStorage.getItem('black-white') || 'normal';

  if (black_white === 'black-white') {
    html.classList.add('black-white');
    localStorage.setItem('black-white', 'black-white')
  } else {
    html.classList.remove('black-white');
    localStorage.setItem('black-white', 'normal')
  }
})();
