'use strict';

var shapeImagePaths = {
  'o': './assets/shape-o.png',
  'i': './assets/shape-i.png',
  's': './assets/shape-s.png',
  'z': './assets/shape-z.png',
  'l': './assets/shape-l.png',
  'j': './assets/shape-j.png',
  't': './assets/shape-t.png'
};


function getShapeImage(shapeType) {
  let image = document.createElement('img');
  image.src = shapeImagePaths[shapeType];
  image.style.width = '100px';
  return image;
}

