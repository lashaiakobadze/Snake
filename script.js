/// OOP
let container = document.getElementById("container");

class Config {
  row;
  left;
  up;
  right;
  down;
  containerRow;

  constructor() {
    this.row = 20;
    this.left = 37;
    this.up = 38;
    this.right = 39;
    this.down = 40;
    this.containerRow = this.row * this.row;
  }
}

const gameBoard = document.getElementsByClassName("gameBoardPixel");
/// Catalog
class Catalog extends Config {

  createGameBoard() {
    for (let i = 1; i <= this.containerRow; i++) {
      container.innerHTML = `${container.innerHTML} <div class="gameBoardPixel" id="pixel${i}"></div>`;
    }
  };


  foodPosition = 0;

  // createFood() {
  //   // Remove previous food;
  //   gameBoard[this.foodPosition].classList.remove("food");
  //   // Create new food
  //   this.foodPosition = Math.random();
  //   this.foodPosition = Math.floor(this.foodPosition * this.containerRow);
  //   gameBoard[this.foodPosition].classList.add("food");
  // };
createFood() {
    // Remove previous food;
    gameBoard[this.foodPosition].classList.remove("food");

    // Generate a new food position that is not part of the snake
    do {
        this.foodPosition = Math.floor(Math.random() * this.containerRow);
    } while (gameBoard[this.foodPosition].classList.contains("snakeBodyPixel"));

    // Create new food
    gameBoard[this.foodPosition].classList.add("food");
}


  // Snake
  snakeDirection = this.right;

  // Control the key codes
  changeDirection(newCode) {
    if (newCode === this.snakeDirection) return;

    if (newCode === this.left && this.snakeDirection != this.right) {
      this.snakeDirection = newCode;
    } else if (newCode === this.up && this.snakeDirection != this.down) {
      this.snakeDirection = newCode;
    } else if (newCode === this.right && this.snakeDirection != this.left) {
      this.snakeDirection = newCode;
    } else if (newCode === this.down && this.snakeDirection != this.up) {
      this.snakeDirection = newCode;
    }
  };


  // Let the starting position
  snakeHeadPosition = this.containerRow*0.5;


  // Initial snake length
  snakeLength = 200;


  // Move snake and repeat this function:
  moveSnake(){
    switch (this.snakeDirection) {
      case this.left:
        --this.snakeHeadPosition;
        const snakeOnLeft = this.snakeHeadPosition % this.row === this.row - 1 || this.snakeHeadPosition < 0;
        if (snakeOnLeft) {
          this.snakeHeadPosition = this.snakeHeadPosition + this.row;
        }
        break;
      case this.up:
        this.snakeHeadPosition = this.snakeHeadPosition - this.row;
        const snakeOnUp = this.snakeHeadPosition < 0;
        if (snakeOnUp) {
          this.snakeHeadPosition = this.snakeHeadPosition + this.containerRow;
        }
        break;
      case this.right:
        ++this.snakeHeadPosition;
        const snakeOnRight = this.snakeHeadPosition % this.row === 0;
        if (snakeOnRight) {
          this.snakeHeadPosition = this.snakeHeadPosition - this.row;
        }
        break;
      case this.down:
        this.snakeHeadPosition = this.snakeHeadPosition + this.row;
        const snakeOnDown = this.snakeHeadPosition > this.containerRow - 1;
        if (snakeOnDown) {
          this.snakeHeadPosition = this.snakeHeadPosition - this.containerRow;
        }
      break;
      default: break;
    }

    let nextSnakeHeadPixel = gameBoard[this.snakeHeadPosition];

    // if snake it bites itself:
    if (nextSnakeHeadPixel.classList.contains("snakeBodyPixel")) {
      clearInterval(this.moveSnakeInterval);
      window.location.reload();
    }

    nextSnakeHeadPixel.classList.add("snakeBodyPixel");

    setTimeout(() => {
      nextSnakeHeadPixel.classList.remove("snakeBodyPixel");
    }, this.snakeLength);

    // Eat food.
    if (this.snakeHeadPosition === this.foodPosition) {
      this.snakeLength = this.snakeLength + 100;
      this.createFood();
    }
  };

  // Move snake:
  moveSnakeInterval = setInterval( () => {
    this.moveSnake()
  }, 100);
  moveSnakeInterval;

  game() {
    this.createGameBoard();
    this.createFood();
    addEventListener("keydown", (e) => this.changeDirection(e.keyCode));
    this.moveSnakeInterval;
  }
}

let snake = new Catalog();
snake.game();


