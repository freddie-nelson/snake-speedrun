const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

let interval;

const SIZE = 30;
const CELL_SIZE = canvas.width / SIZE;

const snake = [
  {
    x: SIZE / 2,
    y: SIZE / 2,
    direction: "UP",
  },
];

let apple = {
  x: Math.floor(Math.random() * SIZE),
  y: Math.floor(Math.random() * SIZE),
};

const moveSnake = () => {
  for (let i = snake.length - 1; i >= 0; i--) {
    const s = snake[i];

    switch (s.direction) {
      case "UP":
        s.y--;
        break;
      case "DOWN":
        s.y++;
        break;
      case "RIGHT":
        s.x++;
        break;
      case "LEFT":
        s.x--;
        break;
      default:
        break;
    }

    if (i !== 0) {
      s.direction = snake[i - 1].direction;
    }
  }
};

const newApple = () => {
  let collides = false;

  do {
    apple = {
      x: Math.floor(Math.random() * SIZE),
      y: Math.floor(Math.random() * SIZE),
    };

    snake.forEach((s) => {
      if (s.x == apple.x && s.y == apple.y) collides = true;
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

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (snake[0].direction !== "DOWN") snake[0].direction = "UP";
      break;
    case "ArrowDown":
      if (snake[0].direction !== "UP") snake[0].direction = "DOWN";
      break;
    case "ArrowRight":
      if (snake[0].direction !== "LEFT") snake[0].direction = "RIGHT";
      break;
    case "ArrowLeft":
      if (snake[0].direction !== "RIGHT") snake[0].direction = "LEFT";
      break;
    default:
      break;
  }
});

const tick = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw apple
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x * CELL_SIZE, apple.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

  moveSnake();
  if (apple.x === snake[0].x && apple.y === snake[0].y) {
    newSnake();
    newApple();
  }

  if (snake[0].x < 0 || snake[0].x >= SIZE || snake[0].y < 0 || snake[0].y >= SIZE) {
    clearInterval(interval);
  }

  snake.forEach((s, i) => {
    if (i === 0) return;
    else if (snake[0].x === s.x && snake[0].y === s.y) {
      clearInterval(interval);
    }
  });

  // draw snake
  ctx.fillStyle = "limegreen";
  snake.forEach((s) => {
    ctx.fillRect(s.x * CELL_SIZE, s.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  });
};

interval = setInterval(tick, 200);
