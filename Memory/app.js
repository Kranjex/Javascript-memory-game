// Constants
const board = document.getElementById('board'); // board element
const restartBtn = document.getElementById('restartButton'); // restart button
const easyMode = document.getElementById('easyMode'); // easy mode button
const hardMode = document.getElementById('hardMode'); // hard mode button
const stopwatch = document.getElementById('timer'); // timer placeholder
const scoreboard = document.getElementById('score'); // scoreborad / score placeholder

// Variables
// Variables for game dificulty
let hardModeON = false;
let easyModeON = false;

// Variables for comparing clicked cards
let clickedCards = [];
let clickedCardsID = [];

// Variables for score, moves and time
let score = 0;
let moves = 0;
let seconds = 0;
let minutes = 0;

// Timer variable for global scope
var Timer;

// Cards array with all of the cards
const Cards = [
  { name: 'javascript', img: 'img/javascriptLogo.png' },
  { name: 'react', img: 'img/reactLogo.png' },
  { name: 'node', img: 'img/nodeLogo.png' },
  { name: 'vue', img: 'img/vueLogo.png' },
  { name: 'mongo', img: 'img/mongodbLogo.png' },
  { name: 'html', img: 'img/htmlLogo.png' },
  { name: 'css', img: 'img/cssLogo.png' },
  { name: 'angular', img: 'img/angularLogo.png' },
  { name: 'javascript', img: 'img/javascriptLogo.png' },
  { name: 'react', img: 'img/reactLogo.png' },
  { name: 'node', img: 'img/nodeLogo.png' },
  { name: 'vue', img: 'img/vueLogo.png' },
  { name: 'mongo', img: 'img/mongodbLogo.png' },
  { name: 'html', img: 'img/htmlLogo.png' },
  { name: 'css', img: 'img/cssLogo.png' },
  { name: 'angular', img: 'img/angularLogo.png' },
];

Cards.sort(() => 0.5 - Math.random());

// Easy mode layout creation Event listener
// easyMode.addEventListener('click', () => {
// 3 x 3 layout
// });

// Right now, this is the only one working mode
// Hard mode layout creation Event listener
hardMode.addEventListener('click', () => {
  // 4 x 4 layout
  if (!hardModeON) {
    hardModeON = true;
    for (let i = 0; i < Cards.length; i++) {
      var card = document.createElement('div');
      card.classList.add('card');
      card.addEventListener('click', flipCard);
      var image = document.createElement('img');
      image.setAttribute('src', 'img/cardBack.png');
      image.setAttribute('data-id', i);
      card.appendChild(image);
      board.appendChild(card);
    }
    stopwatch.classList.add('numberAnim');
    Timer = setInterval(() => {
      if (hardModeON) {
        seconds++;
        if (seconds === 60) {
          minutes++;
          seconds = 0;
        }
        stopwatch.innerText = `${minutes}:${seconds}`;
      }
    }, 1000);
  }
});

// Restart button
restartBtn.addEventListener('click', () => {
  while (board.hasChildNodes()) {
    board.removeChild(board.firstChild);
  }
  hardModeON = false;
  easyModeON = false;
  clearInterval(Timer);
  score = 0;
  moves = 0;
  seconds = 0;
  minutes = 0;
  stopwatch.innerText = '00:00';
  stopwatch.classList.remove('numberAnim');
  scoreboard.innerText = '0';
});

// Flip function
function flipCard(e) {
  var cardID = e.target.getAttribute('data-id');
  clickedCards.push(Cards[cardID].name);
  clickedCardsID.push(cardID);
  e.target.setAttribute('src', Cards[cardID].img);
  scoreboard.classList.remove('scoreAnim');
  if (clickedCards.length === 2) {
    moves++;
    scoreboard.innerText = moves;
    scoreboard.classList.add('scoreAnim');
    setTimeout(matchCheck, 500);
  }
}

// Check for match
function matchCheck() {
  var cards = document.querySelectorAll('img');
  const optionOne = clickedCardsID[0];
  const optionTwo = clickedCardsID[1];
  if (clickedCards[0] != clickedCards[1]) {
    cards[optionOne].setAttribute('src', 'img/cardBack.png');
    cards[optionTwo].setAttribute('src', 'img/cardBack.png');
  } else if (clickedCards[0] === clickedCards[1]) {
    score++;
  }
  if (score === Cards.length / 2) {
    finalMoves = Math.round(moves / 2);
    alert(
      `Congratulations! You have found all of the cards in ${finalMoves} moves and in ${minutes} minutes and ${seconds} seconds.`
    );
    clearInterval(Timer);
  }
  clickedCards = [];
  clickedCardsID = [];
}
