'use strict';

var xhr = new XMLHttpRequest();
var url = '/gallery-data';
var gallery = document.getElementById('gallery');
var currentSlide = 3;

var getChildrenByClass = function getChildrenByClass(parent, _class) {
  var children = [];
  var classes = void 0;
  for (var i = 0; i < parent.childNodes.length; i++) {
    classes = parent.childNodes[i].className.split(' ');
    if (classes.indexOf(_class) >= 0) {
      children.push(parent.childNodes[i]);
    }
  }
  return children;
};

var show = getChildrenByClass(gallery, 'show')[0];
var fullSize = getChildrenByClass(show, 'show__fullSize')[0];
var prevButton = getChildrenByClass(show, 'show__prevButton')[0];
var nextButton = getChildrenByClass(show, 'show__nextButton')[0];

var changeSlide = function changeSlide(data) {
  var slide = arguments.length <= 1 || arguments[1] === undefined ? currentSlide : arguments[1];
  return function () {
    var futureSlide = slide;
    if (slide === 'next') {
      futureSlide = currentSlide + 1;
    } else if (slide === 'prev') {
      futureSlide = currentSlide - 1;
    }
    currentSlide = futureSlide;
    fullSize.src = '/img/' + data.find(function (el) {
      return el.id === currentSlide;
    }).image;
  };
};

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var data = JSON.parse(xhr.responseText);
    prevButton.addEventListener('click', changeSlide(data, 'prev'));
    nextButton.addEventListener('click', changeSlide(data, 'next'));
    // TODO: Initialize thumbnails
    changeSlide(data)();
  }
};
xhr.open('GET', url, true);
xhr.send();