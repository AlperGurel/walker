//CONTROLS
var maxSpeed = 5;
var accelerationFactor = 200;

var speedInput = document.getElementById("speed");
var accelerationInput = document.getElementById("acceleration");
var blopElement = document.getElementById("blop");

speedInput.value = maxSpeed;
accelerationInput.value = accelerationFactor;

function updateSpeed(value) {
  maxSpeed = value;
}

function updateAcceleration(value) {
  accelerationFactor = value;
}

let movers = [];

function createNewCircle() {
  blopElement.play();
  m = new Mover();
  movers.push(m);
}

//mover class

class Mover {
  constructor() {
    this.location = createVector(400, 175);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.currentTarget = createVector(random(0, 800), random(0, 350));
    this.movementType = "idle";
    this.blue = random(0, 255);

    setInterval(() => {
      this.currentTarget = createVector(random(0, 800), random(0, 350));
    }, 1000);
  }

  display() {
    stroke(255, 225, this.blue);

    fill(255, 225, this.blue);
    ellipse(this.location.x, this.location.y, 30, 30);
  }

  update() {
    var targetPosition;
    // if (this.movementType == "idle") {
    //   targetPosition = this.currentTarget;
    // } else if (this.movementType == "follow") {
    //   targetPosition = createVector(mouseX, mouseY);
    // }
    if (mouseX >= 0 && mouseX <= 800 && mouseY >= 0 && mouseY <= 350) {
      targetPosition = createVector(mouseX, mouseY);
    } else {
      targetPosition = this.currentTarget;
    }

    let directionVector = p5.Vector.sub(targetPosition, this.location);
    let distance = directionVector.mag();
    let accelerationMultiplier = distance / accelerationFactor;
    directionVector.normalize();
    directionVector.mult(accelerationMultiplier);
    this.acceleration = directionVector;
    let friction = p5.Vector.mult(this.acceleration, 0.1);
    // this.acceleration.set(this.acceleration.x - 10, this.acceleration.y - 10);
    this.acceleration.sub(friction);

    this.velocity.add(this.acceleration);
    this.velocity.limit(maxSpeed);
    this.location.add(this.velocity);
  }
}

function setup() {
  var canvas = createCanvas(800, 350);
  canvas.parent("p5-container");
  m = new Mover();
  movers.push(m);
}

function draw() {
  background(24, 38, 53);
  movers.forEach((m) => {
    m.update();
    m.display();
  });
}
