/* Things we need to do:
1. Randomly generate an apple after an apple has been eaten
2. Be able to control the snake
3. The snake will move automatically after 250ms
3. Have the snake grow by one cell after an apple has been eaten
4. If the snake bumps into itself or into a wall it is game over. 
*/

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const snakeSegment = {
    x: 0,
    y: 150,
    w: 50,
    h: 50,
    dx: 2.5,
    dy: 0,
    nextdx: 2.5,
    nextdy: 0,
    speed: 2.5,
  };
  const start = document.querySelector("#start");
  const scoreboard = document.querySelector("#score");
  const arrowKeys = { left: 37, up: 38, right: 39, down: 40 };

  function controlSnake(event) {
    switch (event.keyCode) {
      case arrowKeys["left"]:
        if (snakeSegment.dx !== snakeSegment.speed) {
          snakeSegment.nextdx = -snakeSegment.speed
          snakeSegment.nextdy = 0
        }
        break;
      case arrowKeys["right"]:
        if (snakeSegment.dx !== -snakeSegment.speed) {
          snakeSegment.nextdx = snakeSegment.speed;
          snakeSegment.nextdy = 0
        }
        break;
      case arrowKeys["up"]:
        if (snakeSegment.dy !== snakeSegment.speed) {
          snakeSegment.nextdy = -snakeSegment.speed;
          snakeSegment.nextdx = 0;
        }
        break;
      case arrowKeys["down"]:
        if (snakeSegment.dy !== -snakeSegment.speed) {
          snakeSegment.nextdy = snakeSegment.speed;
          snakeSegment.nextdx = 0;
        }
        break;
    }
  }

  function drawSnakeSegment(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, snakeSegment.w, snakeSegment.h);
    ctx.fillStyle = "blue";
    ctx.fill();
  }

  function nextPosition() {
    if ((Math.abs(snakeSegment.dx) == snakeSegment.speed && 
      snakeSegment.x % snakeSegment.w === 0) ||
      (Math.abs(snakeSegment.dy) == snakeSegment.speed && 
        snakeSegment.y % snakeSegment.h === 0)
      ) {
      snakeSegment.dx = snakeSegment.nextdx;
      snakeSegment.dy = snakeSegment.nextdy;
      console.log(`x ${snakeSegment.x} y ${snakeSegment.y}`)
    }
    snakeSegment.x += snakeSegment.dx;
    snakeSegment.y += snakeSegment.dy;
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function updateIterFrames() {
    clear();
    drawSnakeSegment(snakeSegment.x, snakeSegment.y);
    nextPosition();
    requestAnimationFrame(updateIterFrames);
  }

  document.addEventListener("keydown", controlSnake);
  // updateIterFrames();
});
