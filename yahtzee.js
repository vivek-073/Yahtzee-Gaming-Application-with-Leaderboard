

const diceImages = [
  './Assets/Die1.png',
  './Assets/Die2.png',
  './Assets/Die3.png',
  './Assets/Die4.png',
  './Assets/Die5.png',
  './Assets/Die6.png',
];
const rollGIF = './Assets/DieGIF.gif';
const dieRollAudio = new Audio('./Assets/DiceRollSound.mp3');

const diceSlots = document.querySelectorAll('.dice-slot');
const keepButtons = document.querySelectorAll('.keep-button');
const startButton = document.querySelector('#start');
const rollButton = document.querySelector('#roll');
const resetButton = document.querySelector('#reset');
const message = document.querySelector('#message');
const scoreMessage = document.querySelector('#score-message');
const winCriteria = [
  [1, 2, 3, 4, 5],
  [2, 3, 4, 5, 6],
];
const rollsRemainingSpan = document.querySelector('.remainRoll-text');
const scoreMsg = document.getElementById('score-message');
const rollsRSpan = document.querySelector('.remainRoll-text');
const delayTime = 1500;
const showErrorTime = 2000;
var defaultRolls = 3;
var rollsRemain = defaultRolls;
var diceValues = [0, 0, 0, 0, 0];
var keptDiceValues = [0, 0, 0, 0, 0];
var keptDice = [false, false, false, false, false];

// Audio settings and functions
var audioSpeed = 2500 / delayTime;
console.log('Audio Speed: ' + audioSpeed);
dieRollAudio.playbackRate = audioSpeed;
// Playing the audio from the start
function playAudio() {
  dieRollAudio.currentTime = 0;
  dieRollAudio.play();
}

// Preload images
function preloadImages() {
  diceImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
  const gif = new Image();
  gif.src = rollGIF;
}

// Call preloadImages when the page loads
window.onload = preloadImages;

// Update Remaining Rolls
rollsRemainingSpan.textContent = rollsRemain;

// This function randomizes the die
function randDie(inx) {
  const randomIndex = Math.floor(Math.random() * diceImages.length);
  diceValues[inx] = randomIndex;
  // console.log(randomIndex);
  return randomIndex;
}

// console.log(keepButtons);
// console.log(diceSlots);

function updateRollsRemaining() {
  if (rollsRemain !== 0) {
    scoreMsg.innerHTML =
      'You have <span class="remainRoll-text" id="rolls-remaining">' +
      rollsRemain +
      '</span> roll(s) available.';
    rollsRemainingSpan.textContent = rollsRemain;
  }
}

// This function decrements rolls
function decrementRoll() {
  rollsRemain = rollsRemain - 1;
  updateRollsRemaining();
  console.log('Rolls Remain ' + rollsRemain);
}

// This function rolls a die
function rollDie(index) {
  spinDice();
  const imgElement = diceSlots[index].querySelector('img');
  imgElement.setAttribute('src', rollGIF);
  playAudio();
}

// This function updates die images
function updateDieImg(ino) {
  const imgElement = diceSlots[ino].querySelector('img');
  imgElement.setAttribute('src', diceImages[randDie(ino)]);
}

// This function starts the game
function startGame() {
  startButton.disabled = true;
  rollsRemain = defaultRolls;
  rollsRemainingSpan.textContent = rollsRemain;

  keepButtons.forEach((button, index) => {
    rollDie(index);
    setTimeout(() => {
      updateDieImg(index);
    }, delayTime - delayTime / 2.2);
    setTimeout(() => {
      button.disabled = false;
      rollButton.disabled = false;
      resetButton.disabled = false;
    }, delayTime);
  });
  setTimeout(() => {
    if (rollsRemain > 0) {
      decrementRoll();
    }
    console.log('After Roll ' + diceValues);
  }, delayTime);
}

// This function handles rolls
function diceRoller() {
  if (rollsRemain > 0) {
    keepButtons.forEach((button, index) => {
      button.disabled = true;
      rollButton.disabled = true;
      resetButton.disabled = true;
      if (keptDice[index] == false) {
        rollDie(index);
      }
      if (keptDice[index] == false) {
        setTimeout(() => {
          updateDieImg(index);
        }, delayTime - delayTime / 2.2);
      }
      setTimeout(() => {
        if (keptDice[index] == false) {
          button.disabled = false;
        }
        if (rollsRemain < 2) {
          rollButton.disabled = true;
          scoreMessage.innerHTML =
            "You don't have any rolls left!<br>" +
            "Check to see if there's any dice you can keep for a win.<br>" +
            '<br>Click <span class="underline-text">Reset Game</span> if you want to play again.';
        } else {
          rollButton.disabled = false;
        }
        resetButton.disabled = false;
      }, delayTime);
    });

    setTimeout(() => {
      decrementRoll();
      console.log('After Roll ' + diceValues);
    }, delayTime + 100);
  }
}
// Disables all buttons and resets the game
function resetGame() {
  rollButton.disabled = true;
  resetButton.disabled = true;
  keepButtons.forEach((button, index) => {
    button.disabled = true;
    button.textContent = 'Keep?';
    button.classList.remove('kept-button');
    button.classList.add('keep-button');
  });
  startButton.disabled = false;
  rollsRemain = defaultRolls;
  updateRollsRemaining();

  keepButtons.forEach((button, index) => {
    const imgElement = diceSlots[index].querySelector('img');
    imgElement.setAttribute('src', '');
  });

  diceValues = [0, 0, 0, 0, 0];
  keptDiceValues = [0, 0, 0, 0, 0];
  keptDice = [false, false, false, false, false];
}

// This function checks if you already kept a number
function checkStat(inw) {
  var hasAny = keptDiceValues.includes(inw);
  console.log('Button already kept? ' + hasAny);
  return hasAny;
}

// This functions checks win
function checkWin() {
  var hasAll = winCriteria.some((arr) =>
    arr.every((num) => keptDiceValues.includes(num))
  );
  return hasAll;
}

// This function checks if all dice are kept
function checkAllKept() {
  var allKept = keptDice.every((element) => element === true);
  return allKept;
}

// Checks if all dice are kept and if you won. Disables roll button and outputs text in scoreMessage.
function checkWinStatus() {
  console.log('Running checkWinStatus...');
  if (checkAllKept() == true) {
    if (checkWin() == true) {
      scoreMessage.innerHTML =
        'You won!<br>' +
        '<br>Click <span class="underline-text">Reset Game</span> if you want to play again.';

      rollButton.disabled = true;
      resetButton.disabled = false;

      console.log('You won!');
    } else {
      scoreMessage.innerHTML =
        'You lost...<br>' +
        '<br>Click <span class="underline-text">Reset Game</span> if you want to play again.';

      rollButton.disabled = true;
      resetButton.disabled = false;

      console.log('You lost...');
    }
  }
}

// This function makes ONLY the die images spin when you click roll for delayTime
function spinDice() {
  const degree = (delayTime / 1000) * 360 + 360;
  const style = document.createElement('style');
  style.textContent = `:root { --spin-degree: ${degree}deg; }`;
  document.head.appendChild(style);

  diceSlots.forEach((slot, index) => {
    if (keptDice[index] == false) {
      const imgElement = slot.querySelector('img');
      imgElement.classList.add('spin');
      imgElement.style.animationDuration = `${delayTime}ms`;
      setTimeout(() => {
        imgElement.classList.remove('spin');
      }, delayTime);
    }
  });

  setTimeout(() => {
    document.head.removeChild(style);
  }, delayTime);
}

// This function shows a small pop up that says "You already have that die!" on the by creating a new div element
let alreadyKeptShown = false;

async function showAlreadyKept() {
  if (alreadyKeptShown) {
    return;
  }
  alreadyKeptShown = true;
  const alreadyKept = document.createElement('div');
  alreadyKept.classList.add('already-kept');
  alreadyKept.textContent = 'You already have that die!';
  document.body.appendChild(alreadyKept);

  await new Promise((resolve) => setTimeout(resolve, showErrorTime));
  alreadyKept.classList.add('fade-out');
  alreadyKept.addEventListener(
    'animationend',
    () => {
      alreadyKept.remove();
      alreadyKeptShown = false;
    },
    { once: true }
  );
}

// This function jiggles the originally kept die, corresponding to the clicked "keep" button if you try to keep another die with the same number again. It jiggles the die image, not the button.
async function jiggleDie(inx) {
  const imgElement = diceSlots[inx].querySelector('img');
  imgElement.classList.add('jiggle');
  imgElement.style.animationDuration = `0.5s`;
  imgElement.addEventListener(
    'animationend',
    () => {
      imgElement.classList.remove('jiggle');
    },
    { once: true }
  );
}

// This executes when "Start" is clicked.
startButton.addEventListener('click', function () {
  startGame();
  console.log('Start was clicked!');
});

// This executes when "Roll" is clicked.
rollButton.addEventListener('click', function () {
  diceValues = [0, 0, 0, 0, 0];
  console.log('Current Dice Values ' + diceValues);
  diceRoller();
  console.log('Roll was clicked!');
});

// This executes when "Reset" is clicked.
resetButton.addEventListener('click', function () {
  resetGame();
  console.log('Reset was clicked!');
});

// Response for "Keep" button clicks
for (let i = 0; i < keepButtons.length; i++) {
  keepButtons[i].addEventListener('click', function (event) {
    // Get the ID of the parent element of the clicked button
    const parentId = event.target.parentNode.id;

    // Log the ID of the parent element to the console
    console.log('Button clicked in element with ID:', parentId);

    keepButtons.forEach((button, index) => {
      if (parentId == index) {
        if (checkStat(diceValues[index] + 1) !== true) {
          button.disabled = true;
          button.textContent = 'Kept!';
          button.classList.remove('keep-button');
          button.classList.add('kept-button');
          keptDice[index] = true;
          keptDiceValues[parentId] = diceValues[index] + 1;
        } else {
          showAlreadyKept();
          jiggleDie(keptDiceValues.indexOf(diceValues[index] + 1));
        }
      }

      checkWinStatus();
    });
    console.log('Status ' + keptDice + ', All kept? ' + checkAllKept());
    console.log('Current Roll ' + diceValues);
    console.log('Kept Dice ' + keptDiceValues);
    console.log('Won? ' + checkWin());
  });
}
