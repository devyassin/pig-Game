'use strict';

//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentOne = document.querySelector('#current--0');
const currentTwo = document.querySelector('#current--1');
//starting conditions:
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let scores = [0, 0];
let diceTotal = 0;
let activePlayer = 0;
let playing = true;
const swicthPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  diceTotal = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};
//function dice roll :

btnRoll.addEventListener('click', function () {
  //1. Generate a random number :
  if (playing) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;

    //2. display a dice :
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNum}.png`;

    //3. check of the role one:
    if (diceNum !== 1) {
      diceTotal = diceTotal + diceNum;
      //change player dynamacly:
      document.querySelector(`#current--${activePlayer}`).textContent =
        diceTotal;
    } else {
      //switch to next player :
      swicthPlayer();
    }
  }
});

//fonction hold score :

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + diceTotal;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if score>=100 :(player win)
    if (scores[activePlayer] >= 100) {
      //finish the game :
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector('.logo--1').src = 'logo2.png';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch the player:
      swicthPlayer();
    }
  }
});

// function reset :

btnNew.addEventListener('click', function () {
  playing = true;
  diceTotal = 0;
  scores = [0, 0];
  document.querySelector('.logo--1').src = 'logo.png';
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentOne.textContent = 0;
  currentTwo.textContent = 0;
});
