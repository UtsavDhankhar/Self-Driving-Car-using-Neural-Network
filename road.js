class Road{

    constructor(x,width , laneCount=3){
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x-width/2;
        this.right = x + width/2;

        const infinity = 100000;
        this.top = -infinity;
        this.bottom = infinity;

        this.topleft = {x: this.left , y: this.top};
        this.topright = {x: this.right , y:this.top};
        this.bottomleft = {x:this.left , y:this.bottom};
        this.bottomright = {x: this.right , y:this.bottom};

        this.borders = [
            [this.topleft , this.bottomleft],
            [this.topright , this.bottomright]
        ];

    }

    

    draw(ctx){

        ctx.lineWidth = 5;
        ctx.strokeStyle ="White";

        ctx.setLineDash([20,20]);

        for(let i = 1 ; i < this.laneCount ; i++){

            let x = lenv(this.left , this.right , i/this.laneCount);
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x , this.bottom);
            ctx.stroke();
        }

        ctx.setLineDash([]);
        ctx.beginPath();

        this.borders.forEach(element => {
            ctx.moveTo(element[0].x, element[0].y);
            ctx.lineTo(element[1].x , element[1].y);
            ctx.stroke();
        });



    }
    

}
