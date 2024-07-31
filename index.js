const canvas = document.getElementById('cityCanvas');
const ctx = canvas.getContext('2d');

class City {
  constructor(gridSize, ctx) {
    this.gridSize = gridSize;
    this.blockSize = 10;
    this.streetThickness = 8;
    this.totalBlockSize = this.blockSize + this.streetThickness;
    this.blockColor = 'grey';
    this.streetColor = 'white';
    this.ctx = ctx;
  }

  getStreetThickness() {
    return this.streetThickness;
  }

  getTotalBlockSize() {
    return this.totalBlockSize;
  }

  getMap() {
    return this.ctx;
  }

  drawGrid() {
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        const x = col * this.totalBlockSize;
        const y = row * this.totalBlockSize;

        this.ctx.fillStyle = this.streetColor;
        this.ctx.fillRect(0, y, canvas.width, this.streetThickness);

        this.ctx.fillRect(x, 0, this.streetThickness, canvas.height);

        this.ctx.fillStyle = this.blockColor;
        this.ctx.fillRect(
          x + this.streetThickness,
          y + this.streetThickness,
          this.blockSize,
          this.blockSize
        );
      }
    }
  }

  drawRobot(position, color) {
    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, 5, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  drawTrace(from, to, newFrom, newTo, color) {
    this.ctx.beginPath();
    this.ctx.moveTo(from, to);
    this.ctx.lineTo(newFrom, newTo);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  eraseRobot(position) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, 6, 0, 2 * Math.PI);
    this.ctx.clip();
    this.ctx.clearRect(position.x - 6, position.y - 6, 12, 12);
    this.ctx.restore();
  }

  updateRobotPosition(position, color) {
    this.eraseRobot({ x: position.prevX, y: position.prevY });
    this.drawRobot({ x: position.x, y: position.y }, color);
    this.drawTrace(
      position.prevX,
      position.prevY,
      position.x,
      position.y,
      color
    );
  }
}

class Robot {
  constructor(x, y, color, city) {
    this.streetThickness = city.getStreetThickness();
    this.totalBlockSize = city.getTotalBlockSize();
    this.x = x * this.totalBlockSize + this.streetThickness / 2;
    this.y = y * this.totalBlockSize + this.streetThickness / 2;
    this.color = color;
    this.previousX = this.x;
    this.previousY = this.y;
    this.direction = 'up';
    this.city = city;
    this.city.drawRobot({ x: this.x, y: this.y }, this.color);
  }

  move(direction) {
    this.previousX = this.x;
    this.previousY = this.y;

    switch (direction) {
      case 'up':
        this.y -= this.totalBlockSize;
        break;
      case 'down':
        this.y += this.totalBlockSize;
        break;
      case 'left':
        this.x -= this.totalBlockSize;
        break;
      case 'right':
        this.x += this.totalBlockSize;
        break;
    }

    this.direction = direction;
    this.city.updateRobotPosition(
      {
        x: this.x,
        y: this.y,
        prevX: this.previousX,
        prevY: this.previousY
      },
      this.color
    );
  }
}

const city = new City(100, ctx);

city.drawGrid();

const robots = [
  new Robot(10, 10, 'red', city),
  new Robot(20, 20, 'blue', city),
  new Robot(30, 30, 'green', city)
];

// Mover robots cada segundo
setInterval(() => {
  const directions = ['up', 'down', 'left', 'right'];
  robots.forEach((robot) => {
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];
    robot.move(randomDirection);
  });
}, 1000);
