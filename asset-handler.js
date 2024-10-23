'use strict';

var shapeImagePathsHorizontal = {
  'o': './assets/shape-o.png',
  'i': './assets/horizontal/shape-i.png',
  's': './assets/horizontal/shape-s.png',
  'z': './assets/horizontal/shape-z.png',
  'l': './assets/horizontal/shape-l.png',
  'j': './assets/horizontal/shape-j.png',
  't': './assets/horizontal/shape-t.png'
};

var shapeImagePathsVertical = {
  'o': './assets/shape-o.png',
  'i': './assets/vertical/shape-i.png',
  's': './assets/vertical/shape-s.png',
  'z': './assets/vertical/shape-z.png',
  'l': './assets/vertical/shape-l.png',
  'j': './assets/vertical/shape-j.png',
  't': './assets/vertical/shape-t.png'
};


function getShapeImage(shapeType) {
  let image = document.createElement('img');
  if (generateShapesHorizontally) {
    image.src = shapeImagePathsHorizontal[shapeType];
  } else {
    image.src = shapeImagePathsVertical[shapeType];
  }
  image.style.width = '100px';
  return image;
}

