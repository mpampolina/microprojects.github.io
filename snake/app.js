/* Things we need to do:
1. Randomly generate an apple after an apple has been eaten
2. Be able to control the snake
3. The snake will move automatically after 1 second
3. Have the snake grow by one cell after an apple has been eaten
4. If the snake bumps into itself or into a wall it is game over. 
3+2+1*10 = 15
4+1+2*10 = 25
5+0+10 = 15
*/

document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  console.log(squares);
  let snake = {
    Coordinates: [32, 31, 30],
    Direction: [1, 1, 1],
  };
  const arrowKeys = { left: 37, up: 38, right: 39, down: 40 };
  const rowWidth = 10;
  let currentDirection = 1;

  function moveSnake() {
    squares.forEach((square) => square.classList.remove("snake"));
    gameOver = collisionDetect(snake.Coordinates[0]);
    if (gameOver !== true) {
      for (i = 0; i < snake.Coordinates.length; i++) {
        snake.Coordinates[i] = snake.Coordinates[i] + snake.Direction[i];
        squares[snake.Coordinates[i]].classList.add("snake");
      }
    } else {
      alert("Game Over");
      clearInterval(timerID);
    }
    snake.Direction.pop();
    snake.Direction.unshift(currentDirection);
    console.log(currentDirection);
  }

  function collisionDetect(headCoordinate) {
    let gameOver = false;
    if (headCoordinate + currentDirection < 0) {
      gameOver = true;
    } else if (headCoordinate % 10 === 0) {
      gameOver = true;
    } else if (headCoordinate % 10 === 9) {
      gameOver = true;
    } else if (headCoordinate + currentDirection > 100) {
      gameOver = true;
    } else if (snake.Coordinates.length >= 4) {
      for (i = 3; i < snake.Coordinates.length; i++) {
        if (snake.Coordinates[i] + snake.Direction[i] === headCoordinate) {
          gameOver = true;
          return gameOver;
        }
      }
    }
    return gameOver;
  }

  function controlSnake(event) {
    console.log("hello");
    switch (event.keyCode) {
      case arrowKeys["left"]:
        if (snake.Direction[0] != 1) {
          currentDirection = -1;
        }
        break;
      case arrowKeys["up"]:
        if (snake.Direction[1] !== rowWidth) {
          currentDirection = -rowWidth;
        }
        break;
      case arrowKeys["right"]:
        if (snake.Direction[0] !== -1) {
          currentDirection = 1;
        }
        break;
      case arrowKeys["down"]:
        if (snake.Direction[0] !== -rowWidth) {
          currentDirection = rowWidth;
        }
        break;
    }
  }

  document.addEventListener("keydown", controlSnake);
  let timerID = setInterval(moveSnake, 250);
});
