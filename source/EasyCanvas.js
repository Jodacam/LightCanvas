class Vector2 {
    constructor(x,y){
        this.x = x;
        this.y = y;
        
    }
    get x(){
        return this.x;
    }
    get y(){return this.y;}
    set x(x){this.x=x;}
    set y(y){this.y = y;}
    get magnitude(){return Math.sqrt((this.x*this.x)+(this.y*this.y))}

    add(vector){
        this.x += vector.x;
        this.y += vector.y;
    }
    mult(number){
        this.x *=number;
        this.y *= number;
    }
    dot(vector){
      return this.x*vector.x + this.y*vector.y;
    }

    distance(point){
        let deltaX = this.x - point.x;
        let deltaY = this.y - point.y;
        let vector = new Vector2(deltaX,deltaY);
        return vector.magnitude;
    }
    normalize(){
        if(this.x+this.y == 0){
            return 0;
        }else{
            let magnitude = this.magnitude;
            this.x /=magnitude;
            this.y /=magnitude;
        }

    }

}

class SpriteObject {
    constructor(name,position,imgSrc,height,width){
        this.position = position;
        this.name = name;
        this.sprite = new Image(width,height);
        this.sprite.scr = imgSrc;

    }
    Render(){}
    Update(timeDelta){}
}




class CanvasManager{

    constructor(canvasName,w,h){
            this.canvasElement = document.getElementById(canvasName);
            this.canvasElement.width = w;
            this.canvasElement.height = h;
            this.canvasScene = this.canvasElement.getContext('2d');       
            this.objectList = [];
            for(let i = 0; i<4;i++){
                this.objectList[i] = [];
            }
            
                
    }


    addObject(object,layerMask){
        if(object.Update != undefined && object.Render != undefined){
            this.objectList[layerMask].push(object);
        }
    }

    Render(){
       for(let obj in this.objectList){
           
       }
    }

    UpdateObjects(){

    }
}