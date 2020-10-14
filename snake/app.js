/* Things we need to do:
1. Randomly generate an apple after an apple has been eaten
2. Be able to control the snake
3. The snake will move automatically after 1 second
3. Have the snake grow by one cell after an apple has been eaten
4. If the snake bumps into itself or into a wall it is game over. */

document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  let snake = {
    tailCoordinate: 0,
    body: 3,
    direction: 1,
  };
  const arrowKeys = { left: 37, up: 38, right: 39, down: 40 };
  const rowWidth = 10;
  let iterations = 4;

  function moveSnake() {
    squares.forEach((square) => {
      square.classList.remove("snake");
    });
    for (i = 0; i < snake.body; i++) {
      squares[snake.tailCoordinate + i + snake.direction].className = "snake";
    }
    snake.tailCoordinate++;
    iterations--;
    if (iterations <= 0) {
      clearInterval(timerID);
      alert("done.")
    }
  }

  function snakeTurn(snake) {}

  function controlSnake(event) {
    switch (event.keyCode) {
      case arrowKeys["left"]:
        direction = -1;
        break;
      case arrowKeys["up"]:
        direction = -rowWidth;
        break;
      case arrowKeys["right"]:
        direction = 1;
        break;
      case arrowKeys["down"]:
        direction = rowWidth;
        break;
    }
  }

  let timerID = setInterval(moveSnake, 1000)


});
