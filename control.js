class Control{

    constructor(cType){
        this.forward = false;
        this.left = false;
        this.reverse = false;
        this.right = false;
       
        if(cType=="Ai")
            this.#addkeyboardListeners();

        if(cType=="Bot"){
            this.forward=true;
        }
    }

    #addkeyboardListeners(){
        document.onkeydown = (event)=>{

            switch(event.key){
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
   
        }

        document.onkeyup = (event)=>{

            switch(event.key){
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
        }

    }
}