class Vector2 {
    constructor(x,y){
        this._x = x;
        this._y = y;
        
    }
    get x(){
        return this._x;
    }
    get y(){return this._y;}
    set x(x1){this._x=x1;}
    set y(y1){this._y =y1;}
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
        this._position = position;
        this.name = name;
        this.sprite = new Image(width,height);
        this.sprite.src = imgSrc;
       
        this.idleSprite = this.sprite;
        this._height = height;
        this._width = width;

        this.animationList = {};
        this.actualAnim = null;
    }
    get height(){return this._height;}
    get width(){return this._width;}
    get position() {return this._position}

    set height(h){this._height = h;}
    set width(w){this._width = w;}
    set position(pos) {this._position = pos}

    Render(renderCanvas){
        renderCanvas.drawImage(this.sprite,this.position.x,this.position.y,this.width,this.height);
    }
    Update(timeDelta,hitbox){     
        hitbox.fillStyle = "red";
        hitbox.fillRect(this.position.x,this.position.y,this.width,this.height);
        this.position.add(new Vector2(timeDelta*10,0));
    }

    AddAnimation(animation,name){
        this.animationList[name] = animation;
    }

    SetAnimation(name){
        this.actualAnim = this.animationList[name];
    }
}
var _actualScene;
class CanvasManager{
    constructor(canvasName,w,h){
            this.canvasElement = document.getElementById(canvasName);
            this.canvasElement.width = w;
            this.canvasElement.height = h;
            this.canvasScene = this.canvasElement.getContext('2d');    
            this.hitcanvas =   document.getElementById(canvasName+"-hitbox");
            this.hitcanvas.width = w;
            this.hitcanvas.height = h;
            this.hitScene = this.hitcanvas.getContext('2d');
            CanvasManager.actualScene = this.canvasScene;
            this.objectList = [];
            for(let i = 0; i<4;i++){
                this.objectList[i] = [];
            }
            this.timePased = 0;
           
            
                
    }

static get actualScene() {return _actualScene; }
static set actualScene(scene) {_actualScene = scene}


    addObject(object,layerMask){
        if(object.Update != undefined && object.Render != undefined){
            this.objectList[layerMask].push(object);
        }
    }

    RenderAndUpdate(timeDelta){

       this.canvasScene.clearRect(0, 0, this.canvasElement.width,this.canvasElement.height);
       this.hitcanvas.width = this.hitcanvas.width;
       for(let objLayer of this.objectList){
           for(let obj of objLayer){
               obj.Render(this.canvasScene);
               obj.Update(timeDelta,this.hitScene);
           }


       }
    }

    Start(){
        window.requestAnimationFrame(this.MainLoop.bind(this));
    }



    MainLoop(timeStamp){
        let timeDelta = (timeStamp-this.timePased)*0.001;
        this.timePased = timeStamp;
        this.RenderAndUpdate(timeDelta);       
        window.requestAnimationFrame(this.MainLoop.bind(this))
    }

}