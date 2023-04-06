// Define the API URL
const apiUrl = "https://meme-api.com/gimme/CollegeMemes";

// Define the HTML elements
const memePhoto = document.querySelector("#js-meme-photo");
const memeText = document.querySelector("#js-meme-text");
const newMemeBtn = document.querySelector("#js-new-meme");
const counter = document.querySelector("#js-counter");
let count = 0;

// Define a function to get a random meme from the API
async function getRandomMeme() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Define a function to update the meme photo and text
function updateMeme(meme) {
  memePhoto.style.backgroundImage = `url(${meme.url})`;
  memeText.textContent = meme.title;
  count++;
  counter.textContent = `Memes generated: ${count}`;
}   

// Add an event listener to the "Generate a new meme" button
newMemeBtn.addEventListener("click", async () => {
  const meme = await getRandomMeme();
  updateMeme(meme);
});

// Generate a random meme when the page first loads
getRandomMeme().then((meme) => {
  updateMeme(meme);
});
