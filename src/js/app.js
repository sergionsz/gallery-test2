const xhr = new XMLHttpRequest;
const url = '/gallery-data';
const gallery = document.getElementById('gallery');
let currentSlide = 3;

const getChildrenByClass = (parent, _class) => {
  const children = [];
  let classes;
  for (let i = 0; i < parent.childNodes.length; i++) {
    classes = parent.childNodes[i].className.split(' ');
    if (classes.indexOf(_class) >= 0) {
      children.push(parent.childNodes[i]);
    }
  }
  return children;
};

const show = getChildrenByClass(gallery, 'show')[0];
const fullSize = getChildrenByClass(show, 'show__fullSize')[0];
const prevButton = getChildrenByClass(show, 'show__prevButton')[0];
const nextButton = getChildrenByClass(show, 'show__nextButton')[0];

const changeSlide = (data, slide = currentSlide) => () => {
  let futureSlide = slide;
  if (slide === 'next') {
    futureSlide = currentSlide + 1;
  } else if (slide === 'prev') {
    futureSlide = currentSlide - 1;
  }
  currentSlide = futureSlide;
  fullSize.src = `/img/${data.find(el => el.id === currentSlide).image}`;
};

xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    prevButton.addEventListener('click', changeSlide(data, 'prev'));
    nextButton.addEventListener('click', changeSlide(data, 'next'));
    // TODO: Initialize thumbnails
    changeSlide(data)();
  }
};
xhr.open('GET', url, true);
xhr.send();
