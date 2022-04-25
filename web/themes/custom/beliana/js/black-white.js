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

  function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
  }

  function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
  }
})();
