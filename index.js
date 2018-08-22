//Get below info from window
width = 1920;
height = 1080;

class Walker{
    constructor() {
        this.distributionx = gaussian(0, 2);
        this.distributiony = gaussian(0, 2);
        this.position = createVector(width / 2, height / 2);
        this.clickedPosition = null;
    }



    display(){
        stroke(0);
        point(this.position.x, this.position.y)
    }


    step() {
        if(this.clickedPosition){
            //let difference = this.clickedPosition.sub(this.position);
            let difference = p5.Vector.sub(this.clickedPosition, this.position);
            difference.normalize();
            this.distributionx = gaussian(difference.x, 0.5);
            this.distributiony = gaussian(difference.y, 0.5);
        }
        let stepx = this.distributionx.ppf(Math.random());
        let stepy = this.distributiony.ppf(Math.random());
        let velocity = createVector(stepx, stepy);
        velocity.normalize();
        velocity = velocity.mult(2);
        this.position.add(velocity);
    }

    changeVelocity(){
        this.clickedPosition = createVector(mouseX, mouseY);
        console.log(this.clickedPosition.x, this.clickedPosition.y);

    }




}

class Car{
    constructor(){
        this.location = createVector(100, height/2);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0,0);
        this.accActive = false;
        this.decActive = false;

    }

    display(){
        stroke(0);
        background(255,255,255);
        fill(175);
        ellipse(this.location.x, this.location.y, 16, 16);
    }

    update(){
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        if(this.accActive){

            this.acceleration.x += 0.001;
            this.acceleration.x = constrain(this.acceleration.x, 0, 10 );
        }
        if(this.decActive){
            if(this.velocity.x < 0){
                this.acceleration.x = 0;
            }
            else{
                this.acceleration.x -= 0.005;

            }
        }
    }
}

class Mover{
    constructor(){
        this.location = createVector(width/2, height/2);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0,0);
    }

    display(){
        stroke(0);
        background(255,255,255);
        fill(175);
        ellipse(this.location.x, this.location.y, 50, 50);
    }

    update(){
        let mousePosition = createVector(mouseX, mouseY);
        let directionVector = p5.Vector.sub(mousePosition, this.location);
        let distance = directionVector.mag();
        let accelerationMultiplier = distance/50;
        directionVector.normalize();
        directionVector.mult(accelerationMultiplier);
        this.acceleration = directionVector;

        this.velocity.add(this.acceleration);
        this.velocity.limit(20);
        this.location.add(this.velocity);
    }
}

let w;
let c;
let m;
let canvasPadding = 30;

function setup(){
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    //w= new Walker();
    //c = new Car();
    m = new Mover();
}


function draw(){
     // w.step();
     // w.display();
    //c.update();
    //c.display();
    m.update();
    m.display();

}

function mouseClicked(){
    // w.changeVelocity();

}

// function keyPressed(){
//     if(keyCode === LEFT_ARROW){
//         c.decActive = true;
//     }
//     if(keyCode === RIGHT_ARROW){
//         c.accActive = true;
//     }
// }
//
// function keyReleased(){
//     if(keyCode === LEFT_ARROW){
//         c.decActive = false;
//     }
//     if(keyCode === RIGHT_ARROW){
//         c.accActive = false;
//     }
// }