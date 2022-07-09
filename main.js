const canvas = document.getElementById("myCanvas")
canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");

const road = new Road(canvas.width/2,canvas.width*.9);

const car = new Car(100 , 300 ,20 , 40 , "main",2);

const traffic = [
    new Car(road.getLaneCenter(1) , -100 , 20,40 , "dummy"),
];


animate();

function animate(){

    
    car.update(road.borders);
    canvas.height = window.innerHeight;

    // for(let i = 0 ; i < traffic.length ; i++){
    //     traffic[i].update();
    // }

    ctx.save();
    ctx.translate(0,-car.y + canvas.height*.7);

    road.draw(ctx);
    car.draw(ctx);

    // for(let i = 0 ; i < traffic.length ; i++){
    //     traffic[i].draw(ctx);
    // }

    ctx.restore();
    requestAnimationFrame(animate);
}