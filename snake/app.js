/* Things we need to do:
1. Randomly generate an apple after an apple has been eaten
2. Be able to control the snake
3. The snake will move automatically after 1 second
3. Have the snake grow by one cell after an apple has been eaten
4. If the snake bumps into itself or into a wall it is game over. 
*/

document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const arrowKeys = { left: 37, up: 38, right: 39, down: 40 };
  let snake = {
    Coordinates: [32, 31, 30],
    Direction: [1, 1, 1],
    TailDirection: 30,
  };
  const rowWidth = 10;
  let nextCurrentDirection = 1;

  function moveSnake() {
    [gameOver, apple] = collisionDetect(
      snake.Coordinates[0],
      snake.Direction[0]
    );
    snake.Coordinates.forEach((index) =>
      squares[index].classList.remove("snake")
    );
    if (!gameOver) {
      if (apple) {
        let tailCoordinate =
          snake.Coordinates[snake.Coordinates.length - 1] +
          -1 * snake.TailDirection;
        snake.Coordinates.push(tailCoordinate);
        snake.Direction.push(snake.TailDirection);
      }
      for (i = 0; i < snake.Coordinates.length; i++) {
        snake.Coordinates[i] = snake.Coordinates[i] + snake.Direction[i];
        squares[snake.Coordinates[i]].classList.add("snake");
      }
    } else {
      alert("Game Over");
      clearInterval(timerID);
    }
    snake.TailDirection = snake.Direction.pop();
    snake.Direction.unshift(nextCurrentDirection);
  }

  /* Collision detection must account for the future state
  i.e. current direction */
  function collisionDetect(headCoordinate, currentDirection) {
    let gameOver = false;
    let apple = false;
    let futureHead = headCoordinate + currentDirection;
    if (
      futureHead < 0 ||
      (headCoordinate % rowWidth === 0 && currentDirection === -1) ||
      (headCoordinate % rowWidth === rowWidth - 1 && currentDirection === 1) ||
      futureHead > rowWidth * rowWidth ||
      snake.Coordinates.indexOf(futureHead) !== -1
    ) {
      gameOver = true;
    } else if (squares[futureHead].classList.contains("apple")) {
      squares[futureHead].classList.remove("apple");
      generateApple();
      apple = true;
    }
    return [gameOver, apple];
  }

  function generateApple() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * Math.pow(rowWidth, 2));
    } while (squares[randomIndex].classList.contains("snake"));
    squares[randomIndex].classList.add("apple");
  }

  function controlSnake(event) {
    switch (event.keyCode) {
      case arrowKeys["left"]:
        if (snake.Direction[0] != 1) {
          nextCurrentDirection = -1;
        }
        break;
      case arrowKeys["up"]:
        if (snake.Direction[1] !== rowWidth) {
          nextCurrentDirection = -rowWidth;
        }
        break;
      case arrowKeys["right"]:
        if (snake.Direction[0] !== -1) {
          nextCurrentDirection = 1;
        }
        break;
      case arrowKeys["down"]:
        if (snake.Direction[0] !== -rowWidth) {
          nextCurrentDirection = rowWidth;
        }
        break;
    }
  }

  document.addEventListener("keydown", controlSnake);
  let timerID = setInterval(moveSnake, 250);
});
