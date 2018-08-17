//Get below info from window
width = 1920;
height = 1080;

class Walker{
    constructor(){
        this.x = width/2;
        this.y = height/2;
    }
    display(){

    }
    step(){
        let choice = Math.floor(Math.random() * Math.floor(4));
        if(choice === 0){
            x++;
        }
        else if(choice === 1){
            x--;
        }
        else if(choice === 2){
            y++;
        }
        else {
            y--;
        }
    }

}

setup(){
    const w = new Walker();

}

draw(){
    w.step();
    w.display();
}