const buttton = document.querySelector("#js-new-meme");
buttton.addEventListener('click', getQuote);



const endpoint = "https://meme-api.com/gimme/49";

async function getMeme() {
    try {  //try to fetch
        const response = await fetch(endpoint)
        if (!response.ok) {
            throw Error(response.statusText)
        }
        const json = await response.json();
        // console.log(json.question);
        // console.log(json.answer);  
        displayMeme(json.question);
        // showAnswer(json.answer)
        
    }
    catch (err) {  //mess up above? - resort to this put it out to console
        console.log(err);
        alert('Failed to fetch new meme');
    }
 }


function displayMeme(meme) {
    const memePhoto = document.querySelector("#js-meme-photo");
    memePhoto. = meme;
}



memePhoto();