const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const SIZE = 30;
const CELL_SIZE = canvas.width / SIZE;

const snake = [{ x: 15, y: 15, direction: "UP" }];
const apple = {
  x: 10,
  y: 10,
};
const newApple = () => {
  let collides = false;

  do {
    apple.x = Math.floor(Math.random() * SIZE);
    apple.y = Math.floor(Math.random() * SIZE);

    snake.forEach((s) => {
      if (s.x === apple.x && s.y === apple.y) collides = true;
    });
  } while (collides);
};

const newSnake = () => {
  const tail = snake[snake.length - 1];
  const newTail = { ...tail };

  switch (tail.direction) {
    case "UP":
      newTail.y++;
      break;
    case "DOWN":
      newTail.y--;
      break;
    case "RIGHT":
      newTail.x--;
      break;
    case "LEFT":
      newTail.x++;
      break;
    default:
      break;
  }

  snake.push(newTail);
};

newSnake();
newSnake();
newSnake();

const moveSnake = () => {
  for (let i = snake.length - 1; i >= 0; i--) {
    switch (snake[i].direction) {
      case "UP":
        snake[i].y--;
        break;
      case "DOWN":
        snake[i].y++;
        break;
      case "RIGHT":
        snake[i].x++;
        break;
      case "LEFT":
        snake[i].x--;
        break;
      default:
        break;
    }

    if (i !== 0) snake[i].direction = snake[i - 1].direction;
  }
};

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (snake[0].direction !== "DOWN") snake[0].direction = "UP";
      break;
    case "ArrowDown":
      if (snake[0].direction !== "UP") snake[0].direction = "DOWN";
      break;
    case "ArrowLeft":
      if (snake[0].direction !== "RIGHT") snake[0].direction = "LEFT";
      break;
    case "ArrowRight":
      if (snake[0].direction !== "LEFT") snake[0].direction = "RIGHT";
      break;

    default:
      break;
  }
});

let interval;

const tick = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "red";
  ctx.fillRect(apple.x * CELL_SIZE, apple.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

  moveSnake();
  if (snake[0].x === apple.x && snake[0].y === apple.y) {
    newSnake();
    newApple();
  }

  if (snake[0].x < 0 || snake[0].x >= SIZE - 1 || snake[0].y < 0 || snake[0].y >= SIZE - 1) {
    clearInterval(interval);
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      clearInterval(interval);
    }
  }

  ctx.fillStyle = "limegreen";
  snake.forEach((s) => {
    ctx.fillRect(s.x * CELL_SIZE, s.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  });
};

interval = setInterval(tick, 100);
