const canvas = document.getElementById("myCanvas")
canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");

const car = new Car(100 , 300 ,20 , 40);
const road = new Road(canvas.width/2,canvas.width*.9);
car.draw(ctx); 

animate();

function animate(){

    car.update();
    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0,-car.y + canvas.height*.7);

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}