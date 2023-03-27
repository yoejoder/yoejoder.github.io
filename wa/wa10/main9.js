const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

const imageArray = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

const imageAltText = {
  'pic1.jpg': 'Golden Gate Bridge from a low viewpoint',
  'pic2.jpg': 'A San Francisco Sunset',
  'pic3.jpg': 'Climbing at Vent 5 Climbing Area',
  'pic4.jpg': 'Golden Gate Bridge from a tourist viewpoint',
  'pic5.jpg': 'A Cloud ring around a full moon'
};

/* Looping through the images */
for(let i = 0; i < imageArray.length; i++) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', 'images/' + imageArray[i]);
  newImage.setAttribute('alt', imageAltText[imageArray[i]]);
  thumbBar.appendChild(newImage);

  /* Adding a click event listener to each thumbnail image */
  newImage.addEventListener('click', (function(index) {
    return function() {
      displayedImage.setAttribute('src', 'images/' + imageArray[index]);
      displayedImage.setAttribute('alt', imageAltText[imageArray[index]]);
    }
  })(i));
}

/* Writing a handler that runs the darken/lighten button */
btn.addEventListener('click', function() {
  const currentClass = btn.getAttribute('class');
  if(currentClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});
