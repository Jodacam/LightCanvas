//Main Class that handle everything. 
import RenderContext from "./Render/RenderContext"



export default class LigthCanvas 
{
    static Create(_renderType,_canvas) {
        RenderContext.GetContext(_renderType,_canvas);
    }
}

