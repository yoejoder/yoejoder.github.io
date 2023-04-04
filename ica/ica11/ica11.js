const buttton = document.querySelector("#js-new-quote");
buttton.addEventListener('click', getQuote);

const answerButton = document.querySelector("#js-tweet")
answerButton.addEventListener('click', showAnswer);

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

async function getQuote() {
    try {  //try to fetch
        const response = await fetch(endpoint)
        if (!response.ok) {
            throw Error(response.statusText)
        }
        const json = await response.json();
        // console.log(json.question);
        // console.log(json.answer);  
        displayQuote(json.question);
        showAnswer(json.answer)
        
    }
    catch (err) {  //mess up above? - resort to this put it out to console
        console.log(err);
        alert('Failed to fetch new trivia');
    }
 }


function displayQuote(quote) {
    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = quote;
}

function showAnswer(quote) {
    const answerText = document.querySelector("#js-answer-text");
    answerText.textContent = quote;
}

getQuote();