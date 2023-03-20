const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

const storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
const insertX = ["Big Mama", "Big Daddy", "Big Pimp"];
const insertY = ["Hell","Olive Garden","Mount Everest"];
const insertZ = ["ran a marathon","sang karoke all night","lit up the bathroom"];


randomize.addEventListener('click', result);

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}



function result() {

let newStory = storyText
const xItem = randomValueFromArray(insertX);
const yItem = randomValueFromArray(insertY);
const zItem = randomValueFromArray(insertZ);
newStory = newStory.replace(':insertx:',xItem).replace(':insertx:',xItem).replace(':inserty:',yItem).replace(':insertz:',zItem);


  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll("Bob", name);    


  }

  if(document.getElementById("uk").checked) {
    const weight = "300 pounds";
    const temperature =  "94 fahrenheit";
    newStory = newStory.replaceAll(weight, "21 stone");
    newStory = newStory.replaceAll(temperature, "34 celcius");


  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}

