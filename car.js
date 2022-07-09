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

        this.controls = new Control(cType);
        this.sensor = new Sensor(this);

    }

    update(roadBorders){
        
        this.#move();
        this.sensor.update(roadBorders);
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

        this.x += Math.sin(this.angle)*this.speed;
        this.y += Math.cos(this.angle)*this.speed;
    }

    draw(ctx){

        ctx.save();
        ctx.translate(this.x , this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height,
        )
       
        ctx.fill();
        ctx.restore();

        this.sensor.draw(ctx);

    
    }
}