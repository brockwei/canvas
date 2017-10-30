class DrawingRectangle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;            
    }
    
    onMouseDown(coord,event){
        this.contextReal.strokeStyle = canvasSettings.colorStroke; //canvas-configuration.js
        this.contextReal.fillStyle = canvasSettings.colorFill; //canvas-configuration.js
        this.contextReal.lineWidth = canvasSettings.brushSize; //canvas-configuration.js
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.contextDraft.strokeStyle = canvasSettings.colorStroke; //canvas-configuration.js
        this.contextDraft.fillStyle = canvasSettings.colorFill; //canvas-configuration.js
        this.contextDraft.lineWidth = canvasSettings.brushSize; //canvas-configuration.js
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.beginPath();
        this.contextDraft.fillRect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY);        
        this.contextDraft.strokeRect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY);        
        this.contextDraft.fill();
        this.contextDraft.stroke();
        this.contextDraft.closePath();
    }
    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.beginPath();
        this.contextReal.rect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY);
        this.contextReal.fill();
        this.contextReal.stroke();
        this.contextReal.closePath();
        this.onFinish();
    }
    onMouseLeave(){}
    onMouseEnter(){}
    onFinish(){
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount] = new Image();
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount].src = canvasReal.toDataURL();
        canvasSettings.undoObject.actionCount++;
    }
}