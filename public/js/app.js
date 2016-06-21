'use strict';

var xhr = new XMLHttpRequest();
var url = '/gallery-data';

var defaultSlide = 3;
var imgPath = '/img/';

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var data = JSON.parse(xhr.responseText);
    window.testGallery.run('gt', data, {
      defaultSlide: defaultSlide,
      imgPath: imgPath
    });
  }
};
xhr.open('GET', url, true);
xhr.send();