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
        point(this.position.x, this.position.y);
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

let w;

let canvasPadding = 30;

function setup(){
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    w = new Walker();


}


function draw(){
    w.step();
    w.display();
}

function mouseClicked(){
    w.changeVelocity();

}