
class DrawingClear extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;       
        //this.contextReal.globalCompositeOperation="destination-out";
        this.contextReal.fillStyle = "white";
        this.contextReal.fillRect(0,0,canvasReal.width,canvasReal.height);
        this.onFinish();
    }
    onFinish(){
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount] = new Image();
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount].src = canvasReal.toDataURL();
        canvasSettings.undoObject.actionCount++;
    }
}