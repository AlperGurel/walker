//Get below info from window
width = 1920;
height = 1080;

class Walker{
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.probs = [];
        for(let i = 0; i < 100; i++){
            if(i < 11){
                this.probs.push("n");
            }
            else if(i < 22){
                this.probs.push("ne");
            }
            else if(i < 33){
                this.probs.push("e");
            }
            else if(i < 44){
                this.probs.push("se");
            }
            else if(i < 55){
                this.probs.push("s");
            }
            else if(i < 66){
                this.probs.push("sw");
            }
            else if(i < 77){
                this.probs.push("w");
            }
            else if(i < 88){
                this.probs.push("nw");
            }
            else if(i < 100){
                this.probs.push("d");
            }
        }
        this.regmousex = null;
        this.regmousey = null;

    }



    display(){
        stroke(0);
        point(this.x, this.y);



    }


    step() {
        // let stepx = Math.random() * Math.floor(3) -1.42;
        // let stepy = Math.random() * Math.floor(3) -1.42;
        // this.x += stepx;
        // this.y += stepy;

        //Step size setting
        let r = Math.floor(Math.random()*100);
        //let step = distribution.ppf(Math.random());
        let step = this.montecarlo()*1.5;

        //change probs every frame
        if(this.regmousex && this.regmousey){
            this.changeProbFrame(this.regmousex, this.regmousey);
        }

        r = this.probs[r];
        if(r === "n"){

            this.y -= step;

        }
        if(r === "ne"){
            this.y -= step;
            this.x += step;
        }
        if(r === "e"){
            this.x += step;
        }
        if(r === "se"){
            this.x += step;
            this.y += step;
        }
        if(r === "s"){
            this.y += step;
        }
        if(r === "sw"){
            this.y += step;
            this.x -= step;
        }
        if(r === "w"){
            this.x -= step;
        }
        if(r === "nw"){
            this.y -= step;
            this.x -= step;
        }

    }
    changeProbFrame(mx, my){
        let deltax = mx - this.x;
        let deltay = my - this.y;
        let angle = Math.atan2(deltax, deltay);
        angle = 180*angle/Math.PI;
        let preferredDirection;
        if(157.5 <= angle && angle <= 180){
            preferredDirection = "n";
        }
        else if(-157.5 >= angle && angle >= -180){
            preferredDirection = "n";
        }
        else if(112.5 <= angle && angle <= 157.5){
            preferredDirection = "ne";
        }
        else if(67.5 <= angle && angle <= 112.5){
            preferredDirection = "e";
        }
        else if(22.5 <= angle && angle <= 67.5){
            preferredDirection = "se";
        }
        else if(-22.5 <= angle && angle <= 22.5){
            preferredDirection = "s";
        }
        else if(-67.5 <= angle && angle <= -22.5){
            preferredDirection = "sw";
        }
        else if(-112.5 <= angle && angle <= -67.5){
            preferredDirection = "w";
        }
        else if(-157.5 <= angle && angle <= -112.5){
            preferredDirection = "nw";
        }
        else{
            preferredDirection = "d";
        }
        this.propMaker(preferredDirection);
    }
    changeProb(){
        this.regmousex = mouseX;
        this.regmousey = mouseY;


    }


    propMaker(direction){

        const greatProb = 50;
        const littleProb = (100 - greatProb)/8;
        let dlist = ["n", "ne", "e", "se", "s", "sw", "w", "nw", "d"];
        let newlist = [];
        for(let i = 0; i < greatProb; i++){
            newlist.push(direction);
        }
        dlist.filter(x => x !== direction);
        for(let i = 0; i < dlist.length; i++){
            for(let j = 0; j < littleProb; j++){
                newlist.push(dlist[i]);
            }
        }
        this.probs = newlist;

    }

    montecarlo(){
        while(1){
            let r1 = Math.random();
            let probability = r1*r1;
            let r2 = Math.random();
            if(r2 < probability){
                return r1;
            }
        }
    }



}

let w;
let distribution = gaussian(1.5, 0.02);
let canvasPadding = 30;

function setup(){
    //createCanvas(1800, 900);
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    w = new Walker();


}


function draw(){
    w.step();
    w.display();
}

function mouseClicked(){
    w.changeProb();
}