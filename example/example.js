class ScrollObject extends SpriteObject{

    /**
     * 
     * @param {number} timeDelta 
     * @param {CanvasRenderingContext2D} hitbox 
     */
Update(timeDelta,hitbox){
    super.Update(timeDelta,hitbox);
    if(this.position.x < -(this.width-hitbox.canvas.width)){
        this.position = new Vector2(0,0);
    }
}


}



window.addEventListener("load",function(){
            
    let realCanvas = new CanvasManager("mycanvas",1280,720);
    let object = new ScrollObject("BackGround",new Vector2(0,0),"img/Back.jpeg",720,3000);

    object.velocity = new Vector2(-3,0);
    realCanvas.AddObject(object,0);
    let flecha = new HitableObject("Flecha",new Vector2(0,50),"img/right-arrow.png",150,150);
    let flecha2 = new HitableObject("Flecha2",new Vector2(180,90),"img/right-arrow.png",150,150);


    let flecha3 = new HitableObject("Flecha3",new Vector2(0,50),"img/right-arrow.png",150,150);
    let flecha4 = new HitableObject("Flecha4",new Vector2(180,200),"img/right-arrow.png",150,150);
    flecha4.velocity = new Vector2(-1,-1);
    flecha.velocity = new Vector2(0,0);
    flecha.OnClick = function(e){
       this.velocity = this.velocity.add(new Vector2(1,0));
    }

    flecha2.velocity = new Vector2(0,0);
    realCanvas.AddObject(flecha4,3);
    realCanvas.AddObject(flecha,4);
    realCanvas.AddObject(flecha2,4);

    realCanvas.Start();
});