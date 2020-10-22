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
    currentXY: [[100, 150], [50, 150], [0, 150]],
    w: 50,
    h: 50,
    dx: 2.5,
    dy: 0,
    nextdx: 2.5,
    nextdy: 0,
    currentDxDy: [[2.5, 0], [2.5, 0], [2.5, 0]],
    speed: 2.5,
  };
  const start = document.querySelector("#start");
  const scoreboard = document.querySelector("#score");
  const arrowKeys = { left: 37, up: 38, right: 39, down: 40 };

  function controlSnake(event) {
    switch (event.keyCode) {
      case arrowKeys["left"]:
        if (snakeSegment.currentDxDy[0][0] !== snakeSegment.speed) {
          snakeSegment.nextdx = -snakeSegment.speed
          snakeSegment.nextdy = 0
        }
        break;
      case arrowKeys["right"]:
        if (snakeSegment.currentDxDy[0][0] !== -snakeSegment.speed) {
          snakeSegment.nextdx = snakeSegment.speed;
          snakeSegment.nextdy = 0
        }
        break;
      case arrowKeys["up"]:
        if (snakeSegment.currentDxDy[0][1] !== snakeSegment.speed) {
          snakeSegment.nextdy = -snakeSegment.speed;
          snakeSegment.nextdx = 0;
        }
        break;
      case arrowKeys["down"]:
        if (snakeSegment.currentDxDy[0][1] !== -snakeSegment.speed) {
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
    if ((Math.abs(snakeSegment.currentDxDy[0][0]) == snakeSegment.speed && 
      snakeSegment.currentXY[0][0] % snakeSegment.w === 0) ||
      (Math.abs(snakeSegment.currentDxDy[0][1]) == snakeSegment.speed && 
        snakeSegment.currentXY[0][1] % snakeSegment.h === 0)
      ) {
      snakeSegment.currentDxDy.pop()
      snakeSegment.currentDxDy.unshift([snakeSegment.nextdx, snakeSegment.nextdy])
      console.log(`x ${snakeSegment.currentXY[0][0]} y ${snakeSegment.currentXY[0][1]}`)
    }
    for (let i=0; i<snakeSegment.currentDxDy.length; i++)  {
      snakeSegment.currentXY[i][0] += snakeSegment.currentDxDy[i][0];
      snakeSegment.currentXY[i][1] += snakeSegment.currentDxDy[i][1];
    }
    
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function updateIterFrames() {
    clear();
    for (let i=0; i<snakeSegment.currentXY.length; i++) {
      drawSnakeSegment(snakeSegment.currentXY[i][0], snakeSegment.currentXY[i][1]);
    }
    nextPosition();
    requestAnimationFrame(updateIterFrames);
  }

  document.addEventListener("keydown", controlSnake);
  // updateIterFrames();
});
