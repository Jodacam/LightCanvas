
export const RenderType = 
{
    CANVAS: "2d",
    WEBGL:"web-gl"
}
//Main Render Context. Abstract class for other render context.
export default class RenderContext
{
    static GetContext(_context,_canvas)
    {
        switch(_context)
        {
            case RenderType.CANVAS:
            console.log("2D");
            break;
            case RenderType.WEBGL:
            console.log("Web");
            break;
        }
    }
}