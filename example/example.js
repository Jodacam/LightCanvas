


var realCanvas;
window.addEventListener("load",function(){
    realCanvas = new CanvasManager("mycanvas",1280,720);
    StartMainGame();
});





function StartMainGame(){  
    let object = new SpriteObject("BackGround",new Vector2(0,0),"img/Back.jpeg",720,1280);
    object.velocity = new Vector2(0,0);
    realCanvas.AddObject(object,0);
    let flecha = new HitableObject("Timy",new Vector2(0,50),"img/Timy.gif",150,150);
    let flecha2 = new HitableObject("Flecha2",new Vector2(180,90),"img/right-arrow.png",150,150);
    flecha.velocity = new Vector2(0,0);
    flecha.OnClick = function(e){
       this.velocity = this.velocity.add(new Vector2(1,0));
    }
    flecha2.velocity = new Vector2(0,0);
    realCanvas.AddObject(flecha,1);
    realCanvas.AddObject(flecha2,2);

    realCanvas.Start();

}