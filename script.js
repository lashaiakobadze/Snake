const row = 20;

const left = 37;
const up = 38;
const right = 39;
const down = 40;
const containerRow = row * row;


const container = document.getElementById("container");

const createGameBoard = () => {
  for (let i = 1; i <= containerRow; i++) {
    container.innerHTML = `${container.innerHTML} <div class="gameBoardPixel" id="pixel${i}"></div>`;
  }
};

const gameBoard = document.getElementsByClassName("gameBoardPixel");


let foodPosition = 0;
const createFood = () => {
  // Remove previous food;
  gameBoard[foodPosition].classList.remove("food");

  // Create new food
  foodPosition = Math.random();
  foodPosition = Math.floor(
    foodPosition * containerRow
  );
  gameBoard[foodPosition].classList.add("food");
};


// Snake
let snakeDirection = right;

// Control the key codes
const changeDirection = (newCode) => {
  if (newCode === snakeDirection) return;

  if (newCode === left && snakeDirection != right) {
    snakeDirection = newCode;
  } else if (newCode === up && snakeDirection != down) {
    snakeDirection = newCode;
  } else if (newCode === right && snakeDirection != left) {
    snakeDirection = newCode;
  } else if (newCode === down && snakeDirection != up) {
    snakeDirection = newCode;
  }
};

// Let the starting position
let snakeHeadPosition = containerRow / 2;

// Initial snake length
let snakeLength = 200;

// Move snake and repeat this function:
const moveSnake = () => {
  switch (snakeDirection) {
    case left:
       --snakeHeadPosition;
      const snakeOnLeft = snakeHeadPosition % row === row - 1 || snakeHeadPosition < 0;
      if (snakeOnLeft) {
        snakeHeadPosition = snakeHeadPosition + row;
      }
      break;
    case up:
      snakeHeadPosition = snakeHeadPosition - row;
      const snakeOnUp = snakeHeadPosition < 0;
      if (snakeOnUp) {
        snakeHeadPosition = snakeHeadPosition + containerRow;
      }
      break;
    case right:
      ++snakeHeadPosition;
      const snakeOnRight = snakeHeadPosition % row === 0;
      if (snakeOnRight) {
        snakeHeadPosition = snakeHeadPosition - row;
      }
      break;
    case down:
      snakeHeadPosition = snakeHeadPosition + row;
      const snakeOnDown = snakeHeadPosition > containerRow - 1;
      if (snakeOnDown) {
        snakeHeadPosition = snakeHeadPosition - containerRow;
      }
    break;
    default: break;
  }

  let nextSnakeHeadPixel = gameBoard[snakeHeadPosition];

  // if snake it bites itself:
  if (nextSnakeHeadPixel.classList.contains("snakeBodyPixel")) {
    clearInterval(moveSnakeInterval);
    window.location.reload();
  }

  nextSnakeHeadPixel.classList.add("snakeBodyPixel");

  setTimeout(() => {
    nextSnakeHeadPixel.classList.remove("snakeBodyPixel");
  }, snakeLength);

  // Eat food.
  if (snakeHeadPosition === foodPosition) {
    snakeLength = snakeLength + 100;
    createFood();
  }
};


createGameBoard();
createFood();

// Move snake:
let moveSnakeInterval = setInterval(moveSnake, 100);

// Keydown events:
addEventListener("keydown", (e) => changeDirection(e.keyCode));

