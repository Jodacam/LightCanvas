class Vector2 {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  set x(x1) {
    this._x = x1;
  }
  set y(y1) {
    this._y = y1;
  }

  /**
   * @returns {number}
   * Return the module of the vector
   */
  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   *
   * @param {Vector2} vector
   * @returns {Vector2} the addition
   */
  add(vector) {
    let nV = new Vector2(this.x + vector.x, this.y + vector.y);
    return nV;
  }

  /**
   *
   * @param {number} number
   * @returns {Vector2} the multiplication
   */
  mult(number) {
    let nV = new Vector2(this.x * number, this.y * number);
    return nV;
  }
  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  distance(point) {
    let deltaX = this.x - point.x;
    let deltaY = this.y - point.y;
    let vector = new Vector2(deltaX, deltaY);
    return vector.magnitude;
  }

  normalize() {
    if (this.magnitude == 0) {
      return 0;
    } else {
      let magnitude = this.magnitude;
      this.x /= magnitude;
      this.y /= magnitude;
    }
  }
}

class SpriteObject {
  /**
     * 
     * @param {String} name 
     * @param {Vector2} position 
     * @param {String} imgSrc 
     * @param {number} height 
     * @param {number} width      
     
         
     */
  constructor(name, position, imgSrc, height, width) {
    this._position = position;
    this.name = name;
    this.sprite = new Image(width, height);
    this.sprite.src = imgSrc;

    this.idleSprite = this.sprite;
    this._height = height;
    this._width = width;

    this.animationList = {};
    this.actualAnim = null;
    this._velocity = new Vector2(0, 0);
  }

  /**
   * @returns {number}
   */
  get height() {
    return this._height;
  }
  /**
   * @returns {number}
   */
  get width() {
    return this._width;
  }
  /**
   * @returns {Vector2}
   */
  get position() {
    return this._position;
  }

  set height(h) {
    this._height = h;
  }
  set width(w) {
    this._width = w;
  }
  set position(pos) {
    this._position = pos;
  }

  set velocity(vector) {
    this._velocity = vector;
  }

  /**
   * @returns {Vector2}
   */
  get velocity() {
    return this._velocity;
  }

  /**
   * @param {CanvasRenderingContext2D} renderCanvas
   */
  Render(renderCanvas) {
    let xAbsolute = this.position.x + this.width;
    let yAbsolute = this.position.y + this.height;
    //We only render if our Object is at the screen

    renderCanvas.drawImage(
      this.sprite,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  /**
   *
   * @param {number} timeDelta
   * @param {CanvasRenderingContext2D} hitbox
   */
  Update(timeDelta, hitbox) {
    let deltaPos = this.velocity.mult(timeDelta);
    this.position = this.position.add(deltaPos);
  }

  AddAnimation(animation, name) {
    this.animationList[name] = animation;
  }

  SetAnimation(name) {
    this.actualAnim = this.animationList[name];
  }
}
var _actualScene;

class HitableObject extends SpriteObject {
  /**
     * 
     * @param {String} name 
     * @param {Vector2} position 
     * @param {String} imgSrc 
     * @param {number} height 
     * @param {number} width 
     
     */
  constructor(name, position, imgSrc, height, width) {
    super(name, position, imgSrc, height, width);
    this._hitColor = "#ffffff";
    this._activeHit = true;
  }

  /**
   * @returns {String}
   */
  get hitColor() {
    return this._hitColor;
  }
  /**
   * @param {String}
   */
  set hitColor(color) {
    this._hitColor = color;
  }

  activate() {
    this._activeHit = true;
  }
  /**
   * @param {Bool}
   */
  deactivate() {
    this._activeHit = false;
  }

  /**
   *
   * @param {Object} eventInfo the click info
   */
  OnClick(eventInfo) {
    console.log(this.name);
  }

  /**
     
     * @param {number} timeDelta 
     * @param {CanvasRenderingContext2D} hitbox 
     */
  Update(timeDelta, hitbox) {
    if (this._activeHit) {
      super.Update(timeDelta, hitbox);
      hitbox.fillStyle = this.hitColor;

      hitbox.fillRect(
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  }
}

class CanvasManager {
  /**
   *
   * @param {String} canvasName
   * @param {number} w
   * @param {number} h
   *
   */
  constructor(canvasName, w, h) {
    this.canvasElement = document.getElementById(canvasName);
    this._targetHeight = h;
    this._targetWidth = w;
    this.heightRelation = h / this.canvasElement.height;
    this.widhthRelation = w / this.canvasElement.width;

    this.canvasScene = this.canvasElement.getContext("2d");
    this.hitcanvas = document.getElementById(canvasName + "-hitbox");
    this.canvasElement.addEventListener("click", this.OnClick.bind(this));
    this.hitScene = this.hitcanvas.getContext("2d");
    CanvasManager.actualScene = this.canvasScene;
    this.objectList = [];
    for (let i = 0; i < 5; i++) {
      this.objectList[i] = [];
    }
    this.timePased = 0;
    this.clickObjects = new Map();
  }
  /**
   * @returns {number}
   */
  get targetHeight() {
    return this._targetHeight;
  }
  /**
   * @returns {number}
   */
  get targetWidth() {
    return this._targetWidth;
  }

  set targetHeight(h) {
    this._targetHeight = h;
  }
  set targetWidth(w) {
    this._targetWidth = w;
  }

  static get actualScene() {
    return _actualScene;
  }
  static set actualScene(scene) {
    _actualScene = scene;
  }

  /**
   *
   * @param {SpriteObject | HitableObject} object An Object to render
   * @param {number} layerMask The layer Mask
   */
  AddObject(object, layerMask) {
    if (object.Update != undefined && object.Render != undefined) {
      this.objectList[layerMask].push(object);
    }
    if (object.OnClick != undefined && object.hitColor != undefined) {
      let randomColor = this.getRamdomColor();
      object.hitColor = randomColor;
      this.clickObjects.set(randomColor, object);
    }
  }

  RenderAndUpdate(timeDelta) {
    this.canvasScene.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    this.hitcanvas.width = this.hitcanvas.width;

    for (let objLayer of this.objectList) {
      for (let obj of objLayer) {
        obj.Render(this.canvasScene);
        obj.Update(timeDelta, this.hitScene);
      }
    }
  }

  /**
   * Start the MainLoop
   */
  Start() {
    window.requestAnimationFrame(this.MainLoop.bind(this));
  }

  /**
   *
   * @param {number} timeStamp TimePased
   */
  MainLoop(timeStamp) {
    let timeDelta = (timeStamp - this.timePased) * 0.01;
    this.timePased = timeStamp;
    this.RenderAndUpdate(timeDelta);
    window.requestAnimationFrame(this.MainLoop.bind(this));
  }
  /**
   *
   * @param {MouseEvent} e
   */
  OnClick(e) {
    const mousePos = {
      y: e.clientY - this.hitcanvas.offsetParent.offsetTop,
      x: e.clientX - this.hitcanvas.offsetParent.offsetLeft
    };

    let relationH = this.targetHeight / this.hitcanvas.offsetHeight;
    let relationW = this.targetWidth / this.hitcanvas.offsetWidth;

    mousePos.x *= relationW;
    mousePos.y *= relationH;

    const pixel = this.hitScene.getImageData(mousePos.x, mousePos.y, 1, 1).data;

    const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

    let clickedObject = this.clickObjects.get(color);

    if (clickedObject != null) {
      clickedObject.OnClick(mousePos);
    }
  }

  /**
   * @returns {String} the color
   */
  getRamdomColor() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
  }
}
