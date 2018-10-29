var hitNum = 0;
window.addEventListener("load",function(){
            
    let realCanvas = new CanvasManager("mycanvas",1280,720);
    let object = new SpriteObject("BackGround",new Vector2(0,0),"img/Back.jpeg",720,1280);
    object.velocity = new Vector2(0,0);
    realCanvas.AddObject(object,0);
    let flecha = new HitableObject("Flecha",new Vector2(0,50),"img/right-arrow.png",150,150);
    let flecha2 = new HitableObject("Flecha2",new Vector2(180,90),"img/right-arrow.png",150,150);
    flecha.velocity = new Vector2(0,0);

    flecha.OnClick = function(e){
       this.velocity = this.velocity.add(new Vector2(10,0));
       hitNum+=1;

       if(hitNum==2){
        this.velocity = new Vector2(0,0);
        hitNum = 0;
        flecha.deactivate();
        realCanvas.clickObjects.delete(flecha._hitColor);
        var i = 0;
       }
    }
    flecha2.velocity = new Vector2(0,0);
    realCanvas.AddObject(flecha,1);
    realCanvas.AddObject(flecha2,2);

    realCanvas.Start();
});