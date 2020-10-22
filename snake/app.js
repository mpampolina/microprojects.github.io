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
    // Current XY value pairs for the snake segments head => tail
    currentXY: [[100, 150], [50, 150], [0, 150]],
    // The width of a given snake segment
    w: 50,
    // The height of a given snake segment
    h: 50,
    // The next player inputted dx and dy values in the queue
    nextdx: 2.5,
    nextdy: 0,
    // The current dx and dy values assigned to each segment head => tail
    currentDxDy: [[2.5, 0], [2.5, 0], [2.5, 0]],
    speed: 2.5,
  };
  const start = document.querySelector("#start");
  const scoreboard = document.querySelector("#score");
  const arrowKeys = { left: 37, up: 38, right: 39, down: 40 };

  function controlSnake(event) {
    switch (event.keyCode) {
      case arrowKeys["left"]:
        // Check that the head's dx value is not going right
        if (snakeSegment.currentDxDy[0][0] !== snakeSegment.speed) {
          snakeSegment.nextdx = -snakeSegment.speed
          snakeSegment.nextdy = 0
        }
        break;
      case arrowKeys["right"]:
        // Check that the head's dx value is not going left
        if (snakeSegment.currentDxDy[0][0] !== -snakeSegment.speed) {
          snakeSegment.nextdx = snakeSegment.speed;
          snakeSegment.nextdy = 0
        }
        break;
      case arrowKeys["up"]:
        // Check that the head's y value is not going down
        if (snakeSegment.currentDxDy[0][1] !== snakeSegment.speed) {
          snakeSegment.nextdy = -snakeSegment.speed;
          snakeSegment.nextdx = 0;
        }
        break;
      case arrowKeys["down"]:
        // Check that the head's dy value not going up
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

  /**
   * If the head is going right or left AND the the head coordinate of the snake
   * segment is divisible by the snake segment width with no remainder (i.e the
   * head segment is within the gridlines) OR If the head is going up or down
   * AND the the head coordinate is divisible by the snake segment height with
   * no remainder, remove the last set of instruction from currentDxDy
   * and add the next set of instructions from the user input (i.e change the 
   * snake direction).
   * OTHERWISE cycle through each snake segment and update their coordinates
   * by the snake segment vector.
   */
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
    for (let i=0; i<snakeSegment.currentXY.length; i++)  {
      snakeSegment.currentXY[i][0] += snakeSegment.currentDxDy[i][0];
      snakeSegment.currentXY[i][1] += snakeSegment.currentDxDy[i][1];
    }
    
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function update() {
    // Clear the board
    clear();
    // Draw each of the snake segments based on current XY values
    for (let i=0; i<snakeSegment.currentXY.length; i++) {
      drawSnakeSegment(snakeSegment.currentXY[i][0], snakeSegment.currentXY[i][1]);
    }
    // Change the current XY values
    nextPosition();
    // Queue up the next frame update
    requestAnimationFrame(update);
  }

  document.addEventListener("keydown", controlSnake);
  // update();
});
