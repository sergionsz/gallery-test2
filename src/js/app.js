const xhr = new XMLHttpRequest;
const url = '/gallery-data';

const defaultSlide = 3;
const imgPath = '/img/';

xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    window.testGallery.run('gt', data, {
      defaultSlide,
      imgPath,
    });
  }
};
xhr.open('GET', url, true);
xhr.send();
