
var today= new Date();
console.log(today);

const canvas = document.getElementById("myCanvas")
canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");

const road = new Road(canvas.width/2,canvas.width*.9);

let num = 1000;
const cars = generatecars(num);
let bestcar = cars[0];

const traffic = [
    new Car(road.getLaneCenter(0) , -400 , 20,40 , "Bot"),
    new Car(road.getLaneCenter(0) , -800 , 20,40 , "Bot"),
    new Car(road.getLaneCenter(0) , -1200 , 20,40 , "Bot"),

    new Car(road.getLaneCenter(1) , -100 , 20,40 , "Bot"),
    new Car(road.getLaneCenter(1) , -600 , 20,40 , "Bot"),
    new Car(road.getLaneCenter(1) , -1000 , 20,40 , "Bot"),
    
    new Car(road.getLaneCenter(2) , -500 , 20,40 , "Bot"),
    new Car(road.getLaneCenter(2) , -300 , 20,40 , "Bot"),
    new Car(road.getLaneCenter(2) , -900 , 20,40 , "Bot"),

];

function generatecars(num){

    const cars = [];

    for(let i = 0 ; i < num ; i++){
        cars.push(new Car(road.getLaneCenter(1) , 300 ,20 ,40 , "Ai",2.5));
    }

    return cars;
}

function save(){

    localStorage.setItem("brain" , JSON.stringify(bestcar.brain));
}

function discard(){
    localStorage.removeItem("brain");
}

if(localStorage.getItem("brain")){

    let random = Math.random()/2 + .1;
    console.log(random);
    for(let i = 0 ; i < cars.length ; i++){
        cars[i].brain = JSON.parse(localStorage.getItem("brain"));
    

        if(i!=0){
            
            Network.mutate(cars[i].brain , random);
        }
    }
}

let pos_best_car = bestcar.y;

function check_movement(){

setTimeout(function(){

    if(pos_best_car== bestcar.y){
        save();
        location.reload();
    }
    else{
        pos_best_car = bestcar.y;
        today = new Date();
        console.log(today );
        check_movement();
    }
},5000)

}

check_movement();


animate();

function animate(){

    bestcar = cars.find(
        c=> c.y == Math.min(
            ...cars.map(c=>c.y)
        )
    );

    for(let i = 0 ; i < traffic.length; i++){
        // console.log(traffic[i].y - bestcar.y)

        if(traffic[i].y - bestcar.y > 500 ){
            let lane = Math.random()*3;
            lane = Math.floor(lane) ;
            traffic[i].y = bestcar.y - 1000;
            traffic[i].x = road.getLaneCenter(lane);
            console.log(traffic[i].x +"  " + traffic[i].y)
            console.log("this one  " + i);
        }
    }

    canvas.height = window.innerHeight;

    for(let i = 0 ; i < traffic.length ; i++){
        traffic[i].update(road.borders , []);
    }
    
    for(let i = 0 ; i < num ; i++){
        cars[i].update(road.borders,traffic);
    }


    ctx.save();
    ctx.translate(0,-bestcar.y + canvas.height*.7);

    road.draw(ctx);
    
    for(let i = 0 ; i < traffic.length ; i++){
        traffic[i].draw(ctx);
    }

    ctx.globalAlpha = 0.2;
    for(let i = 0 ; i < num ; i++){
        cars[i].draw(ctx);
    }

    ctx.globalAlpha = 1;
    bestcar.draw(ctx,true);

    ctx.restore();
    requestAnimationFrame(animate);
}