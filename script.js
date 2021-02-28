// Access the DOM element 'msg'
const msgElement = document.getElementById('msg');

// Random Number function
let getRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
}
//  OR
// function getRandomNumber() {
//     return Math.floor(Math.random() * 100) + 1;
// }

// Create a Random Number
const randomNum = getRandomNumber();
console.log(randomNum);
// Lines 17 - 25 are utilizing the code from the API
// Initalize the Speach Recognition Object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Create a new Instance called Recognition
let recognition = new window.SpeechRecognition();

recognition.start();

recognition.addEventListener('result', onSpeak);

// capture's input
function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    console.log(msg);
    writeMessage(msg);
    checkNumber(msg);
}
// display's user's input
function writeMessage(msg) {
    msgElement.innerHTML = `
        <div> You said: </div>
        <span class="box">${msg}</span>
        
    `;
}

function checkNumber(msg) {
    const num = +msg;//converts string to number

    // check for valid number
    if (Number.isNaN(num)) {
        msgElement.innerHTML += `<div>That is not a valid number</div>`;
        return;
    }

    //check range
    if (num > 100 || num < 1) {
        msgElement.innerHTML += `<div>Number must be between 1 and 100</div>`;
        return;
    }

    // check number
    if (num === randomNum) {
        document.body.innerHTML = `
            <h2>Congrats! You have guessed the number!<h2><br><br>
            It was ${num}</h2>
            <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if (num > randomNum) {
        msgElement.innerHTML += `<div>GO LOWER</div>`;
    } else {
        msgElement.innerHTML += `<div>GO HIGHER</div>`;
    }

}

// end speech recognition
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
})