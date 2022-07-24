class Car{

    constructor(x,y,width,height , cType , maxspeed=1){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.maxspeed = maxspeed;
        this.friction = 0.05;
        this.accelaration = .2; 
        this.angle = 0;
        this.flip = 1;
        this.damage = false;
        this.cType = cType;

        this.controls = new Control(cType);
        this.usebrain = cType=="Ai";

        if(this.cType!="Bot")
            this.sensor = new Sensor(this);
            const rayCount = 5
            this.min_speed = 1.5
            this.brain = new Network([rayCount , 6 ,4]);

    }

    update(roadBorders , traffic){
        
        if(!this.damage){
            this.#move();
            this.polygon = this.#creaatePolygon();
            this.damage = this.#assessDamage(roadBorders , traffic);
        }

        if(this.cType!="Bot"){
            this.sensor.update(roadBorders , traffic);
            const offsets = this.sensor.readings.map(s=>s==null? 0 : 1 - s.offset);

            const outputs = Network.feedforward(offsets , this.brain);

            this.controls.forward = outputs[0];
            this.controls.left = outputs[1];
            this.controls.right = outputs[2];
            // this.controls.reverse = outputs[3];

        }

    }

    #move(){
        
        
        if(this.controls.forward){
            this.speed -= this.accelaration;
        }

        if(this.controls.reverse){
            this.speed += this.accelaration;
        }

        if(this.speed > this.maxspeed/2){
            this.speed = this.maxspeed/2;
        }

        if(this.speed < -this.maxspeed){
            this.speed = -this.maxspeed;
        }


        if(Math.abs(this.speed) < this.friction){
            this.speed = 0;
        }

        if(this.speed>0){
            this.speed -= this.friction;
        }

        if(this.speed < 0){
            this.speed += this.friction;
        }

        if(this.speed!=0){
            this.flip = this.speed >0? -1 : 1;
        
            if(this.controls.left){
                this.angle +=.02*this.flip;
            }

            if(this.controls.right){
                this.angle -=.02*this.flip;
            } 
        }

        if(this.cType!="Bot"){
            if(this.speed > -this.min_speed){
                this.speed = -this.min_speed;
            }
        }

        this.x += Math.sin(this.angle)*this.speed;
        this.y += Math.cos(this.angle)*this.speed;
    }

    #creaatePolygon(){

        const points = [];
        const rad = Math.hypot(this.width , this.height)/2;
        const alpha = Math.atan2(this.width, this.height);

        points.push({
            x: this.x - Math.sin(this.angle - alpha)*rad,
            y: this.y - Math.cos(this.angle - alpha)*rad
        });

        points.push({
            x : this.x - Math.sin(this.angle + alpha)*rad,
            y : this.y - Math.cos(this.angle + alpha)*rad
        });

        points.push({
            x : this.x - Math.sin(Math.PI +this.angle - alpha)*rad,
            y : this.y - Math.cos(Math.PI +this.angle - alpha)*rad
        });

        points.push({
            x : this.x - Math.sin(Math.PI + this.angle + alpha )*rad,
            y : this.y - Math.cos(Math.PI + this.angle + alpha)*rad
        });

        return points;
    }

    #assessDamage(roadBorders , traffic){

        for(let i = 0 ; i < roadBorders.length ; i++){

            if(polyIntersect(this.polygon , roadBorders[i])){
                return true;
            }
        }

        for(let i = 0 ; i < traffic.length ; i++){

            if(polyIntersect(this.polygon , traffic[i].polygon)){
                return true;
            }
        }

        return false;
    }

    draw(ctx , isbestcar){


        if(this.damage){
            ctx.fillStyle = "gray";
        }
        else{
            ctx.fillStyle = "blue";
        }

        if(this.cType == 'Bot'){
            ctx.fillStyle = "red";
        }

        ctx.beginPath();

        ctx.moveTo(this.polygon[0].x , this.polygon[0].y);

        for(let i = 1; i < this.polygon.length ; i++){

            ctx.lineTo(this.polygon[i].x,
                this.polygon[i].y);
        }

        ctx.fill();

        if(isbestcar){
            this.sensor.draw(ctx);
        }
    
    }
}