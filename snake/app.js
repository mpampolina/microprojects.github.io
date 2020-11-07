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
  let snakeSegment;
  let apple;
  let playAgain;
  const start = document.querySelector("#start");
  const scoreboard = document.querySelector("#score");
  let score = 0;
  const arrowKeys = { left: 37, up: 38, right: 39, down: 40 };
  const squareTypes = { snake: "blue", apple: "green" };

  function startGame() {
    playAgain = false;
    snakeSegment = {
      // Current XY value pairs for the snake segments head => tail
      currentXY: [
        [150, 150],
        [100, 150],
        [50, 150],
      ],
      // The width of a given snake segment
      w: 50,
      // The height of a given snake segment
      h: 50,
      // The next player inputted dx and dy values in the queue
      nextdx: 2.5,
      nextdy: 0,
      // The current dx and dy values assigned to each segment head => tail
      currentDxDy: [
        [2.5, 0],
        [2.5, 0],
        [2.5, 0],
      ],
      speed: 2.5,
      tailDxDy: [0, 150],
      tailXY: [0, 150],
    };
    apple = {
      x: 400,
      y: 150,
    };
    update();
  }

  function controlSnake(event) {
    switch (event.keyCode) {
      case arrowKeys["left"]:
        // Check that the head's dx value is not going right
        if (snakeSegment.currentDxDy[0][0] !== snakeSegment.speed) {
          snakeSegment.nextdx = -snakeSegment.speed;
          snakeSegment.nextdy = 0;
        }
        break;
      case arrowKeys["right"]:
        // Check that the head's dx value is not going left
        if (snakeSegment.currentDxDy[0][0] !== -snakeSegment.speed) {
          snakeSegment.nextdx = snakeSegment.speed;
          snakeSegment.nextdy = 0;
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

  /**
   * Consumes the current apple and then respawns a new apple.
   * Things to note:
   * 1) appleEat() works because it is called on a square evenly divisible
   * by 50. The verification would be more complex otherwise.
   * 2) since the board is cleared every frame, we don't need to clear the
   * current apple explicitly. We simply move its position.
   */
  function appleEat() {
    let canDeploy = false;
    do {
      let x = Math.floor(Math.random() * 10) * 50;
      let y = Math.floor(Math.random() * 10) * 50;
      for (let i = 0; i < snakeSegment.currentXY.length; i++) {
        if (
          snakeSegment.currentXY[i][0] !== x &&
          snakeSegment.currentXY[i][1] !== y
        ) {
          apple.x = x;
          apple.y = y;
          canDeploy = true;
        }
      }
    } while (canDeploy === false);
  }

  // Hitbox is larger and accounts for the root of all rectangles
  // being in the top right corner
  function checkApple() {
    let appleEaten = false;
    const currentDx = snakeSegment.currentDxDy[0][0];
    const currentDy = snakeSegment.currentDxDy[0][1];
    if (currentDx === snakeSegment.speed) {
      if (
        snakeSegment.currentXY[0][0] + snakeSegment.w === apple.x &&
        snakeSegment.currentXY[0][1] === apple.y
      ) {
        appleEat();
        appleEaten = true;
      }
    } else if (currentDy == snakeSegment.speed) {
      if (
        snakeSegment.currentXY[0][0] === apple.x &&
        snakeSegment.currentXY[0][1] + snakeSegment.h === apple.y
      ) {
        appleEat();
        appleEaten = true;
      }
    } else if (currentDx === -snakeSegment.speed) {
      if (
        snakeSegment.currentXY[0][0] - snakeSegment.w === apple.x &&
        snakeSegment.currentXY[0][1] === apple.y
      ) {
        appleEat();
        appleEaten = true;
      }
    } else if (currentDy === -snakeSegment.speed) {
      if (
        snakeSegment.currentXY[0][0] === apple.x &&
        snakeSegment.currentXY[0][1] - snakeSegment.w === apple.y
      ) {
        appleEat();
        appleEaten = true;
      }
    }
    return appleEaten;
  }

  function addSegment(tailDirective) {
    let rear = snakeSegment.currentXY[snakeSegment.currentXY.length - 1];
    let x2;
    let y2;
    if (tailDirective[0] === 2.5) {
      x2 = rear[0] - 50;
      y2 = rear[1];
      snakeSegment.currentXY.push([x2, y2]);
    } else if (tailDirective[0] === -2.5) {
      x2 = rear[0] + 50;
      y2 = rear[1];
      snakeSegment.currentXY.push([x2, y2]);
    } else if (tailDirective[1] === 2.5) {
      x2 = rear[0];
      y2 = rear[1] - 50;
      snakeSegment.currentXY.push([x2, y2]);
    } else if (tailDirective[1] === -2.5) {
      x2 = rear[0];
      y2 = rear[1] + 50;
      snakeSegment.currentXY.push([x2, y2]);
    }
  }

  function stopSnake() {
    // Change the speed of all snake segments to zero.
    for (let i = 0; i < snakeSegment.currentDxDy.length; i++) {
      snakeSegment.currentDxDy[i][0] = 0;
      snakeSegment.currentDxDy[i][1] = 0;
    }
    alert("Game Over");
  }

  function collisionDetectWall() {
    if (
      // Left Wall
      (snakeSegment.currentXY[0][0] <= 0 &&
        snakeSegment.currentDxDy[0][0] === -snakeSegment.speed) ||
      // Right Wall
      (snakeSegment.currentXY[0][0] >= canvas.width - snakeSegment.w &&
        snakeSegment.currentDxDy[0][0] === snakeSegment.speed) ||
      // Top Wall
      (snakeSegment.currentXY[0][1] <= 0 &&
        snakeSegment.currentDxDy[0][1] === -snakeSegment.speed) ||
      // Bottom Wall
      (snakeSegment.currentXY[0][1] >= canvas.height - snakeSegment.h &&
        snakeSegment.currentDxDy[0][1] === snakeSegment.speed)
    ) {
      stopSnake();
    }
  }

  function collisionDetectSelf() {
    const headX = snakeSegment.currentXY[0][0];
    const headY = snakeSegment.currentXY[0][1];
    for (let i=1; i <(snakeSegment.currentXY.length - 1); i++) {
      if (headX == snakeSegment.currentXY[i][0] && headY == snakeSegment.currentXY[i][1]) {
        stopSnake();
      }
    }
  }

  function drawSquare(x, y, type) {
    ctx.beginPath();
    ctx.rect(x, y, snakeSegment.w, snakeSegment.h);
    ctx.fillStyle = squareTypes[type];
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
    if (
      (Math.abs(snakeSegment.currentDxDy[0][0]) == snakeSegment.speed &&
        snakeSegment.currentXY[0][0] % snakeSegment.w === 0) ||
      (Math.abs(snakeSegment.currentDxDy[0][1]) == snakeSegment.speed &&
        snakeSegment.currentXY[0][1] % snakeSegment.h === 0)
    ) {
      snakeSegment.tailDxDy = snakeSegment.currentDxDy.pop();
      snakeSegment.currentDxDy.unshift([
        snakeSegment.nextdx,
        snakeSegment.nextdy,
      ]);
      // console.log(
      //   `x ${snakeSegment.currentXY[0][0]} y ${snakeSegment.currentXY[0][1]}`
      // );
      collisionDetectWall();
      collisionDetectSelf();
      appleEaten = checkApple();
      if (appleEaten) {
        addSegment(snakeSegment.tailDxDy);
        snakeSegment.currentDxDy.push(snakeSegment.tailDxDy);
        console.log(snakeSegment.currentXY);
        score++;
        scoreboard.innerText = score;
      }
    }
    for (let i = 0; i < snakeSegment.currentXY.length; i++) {
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
    for (let i = 0; i < snakeSegment.currentXY.length; i++) {
      drawSquare(
        snakeSegment.currentXY[i][0],
        snakeSegment.currentXY[i][1],
        "snake"
      );
    }
    drawSquare(apple.x, apple.y, "apple");
    // Change the current XY values
    nextPosition();
    // Queue up the next frame update
    requestAnimationFrame(update);
  }

  start.addEventListener("click", startGame);
  document.addEventListener("keydown", controlSnake);
});
