/*
Gallery test

A module that creates a gallery on a div using JSON data.

To use, just add gt.js and gt.css to your HTML and call

  tg.run(<div id>, <data>, options)

Notes:
  - JSON data can be and object or a string.
  - Data must be in the following format:
    {
      "id": <int Identifier>,
      "image": <string Main image URL or filename>,
      "thumb_url": <string Thumbnail URL or filename>,
      "title": <string Description>,
      "date": <string Date>,
      "location": <string Location>
    }

*/

window.testGallery = (function galleryTest() {
  const exports = {};

  const optDefaults = {
    imgPath: '',
    thumbPath: '',
    defaultSlide: 0,
  };

  /*
  Function createNode
    Creates a DOM element with optional class or list of class names,
    attributes and text.
    Returns the finished element.
  */
  function createNode(type, className = [], attributes = {}, text = '') {
    const node = document.createElement(type);
    if (typeof className === 'string') {
      node.classList.add(className.trim());
    } else {
      className.forEach(cls => node.classList.add(cls.trim()));
    }
    Object.keys(attributes).forEach(key =>
      node.setAttribute(key, attributes[key])
    );
    if (text !== '') {
      node.textContent = text;
    }
    return node;
  }

  /*
  Function appendAll
    Appends children to a specified element.
  */
  function appendAll(element, ...children) {
    if (children.length > 0) {
      children.forEach(child => element.appendChild(child));
    }
  }

  /*
  Function initializeData
    Checks for existence of data
    Converts a data string into an object
    Returns a data object
  */
  function initializeData(data) {
    if (data === null || typeof data === 'undefined') {
      throw new Error('Error: At least one image should be provided');
    }
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    return data;
  }

  /*
  Function getGalleryNode
    Returns the object that should be used for the gallery
  */
  function getGalleryNode(node) {
    switch (typeof node) {
      // A string is treated as an ID
      case 'string':
        if (node !== '') {
          return document.getElementById(node);
        }
        throw new Error('No node to atach Test Gallery');
      default:
        return node;
    }
  }

  /*
  Function gt.run
    Initializes the gallery creating and attaching the necessary nodes
    The options object can have the following modifiers:
      imgPath: Path to images
      thumbPath: Path to thumbnails
      defaultSlide: The slide that should be shown when the gallery
      is initialized
  */
  exports.run = (gNode = '', _data, _opts = {}) => {
    // Initialize data
    const data = initializeData(_data);

    // Initialize options
    const opts = Object.assign(optDefaults, _opts);
    let currentSlide;

    // Get node for gallery
    const gallery = getGalleryNode(gNode);
    gallery.innerHTML = '';

    // Create gallery
    // Create show
    const show = createNode('div', 'show');
    const prevButton = createNode('a', 'show__prevButton', {}, 'prev');
    const img = createNode('img', 'show__fullSize', {
      src: `${opts.imgPath}/${data[opts.defaultSlide].image}`,
    });
    const nextButton = createNode('a', 'show__nextButton', {}, 'next');
    // Create caption
    const caption = createNode('div', 'caption');
    const capSub = createNode('h2', 'caption__subtitle', {}, data[0].title);
    const capNote = createNode('h2', 'caption__subtitle', {}, data[0].title);
    // Create reel
    // TODO: Create reel
    const reel = createNode('div', 'reel');

    // Set up Gallery
    /* TODO: Make it go back to the first image when going next from the last
             one */
    function changeSlide(slideId = opts.defaultSlide) {
      return () => {
        if (slideId === currentSlide) {
          return;
        }
        let slide;
        if (slideId === 'next') {
          slide = data.find(sld => sld.id === currentSlide + 1);
        } else if (slideId === 'prev') {
          slide = data.find(sld => sld.id === currentSlide - 1);
        } else {
          slide = data.find(sld => sld.id === slideId);
        }
        if (typeof slide === 'undefined') {
          return;
        }
        img.src = `${opts.imgPath}/${slide.image}`;
        currentSlide = slide.id;
      };
    }

    prevButton.addEventListener('click', changeSlide('prev'));
    nextButton.addEventListener('click', changeSlide('next'));

    // Assemble all
    appendAll(show, prevButton, img, nextButton);
    appendAll(caption, capSub, capNote);
    appendAll(gallery, show, caption, reel);

    // Change to the defaultSlide
    changeSlide(opts.defaultSlide)();
  };

  return exports;
}());
