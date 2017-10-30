class DrawingLine extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;            
    }
    
    onMouseDown(coord,event){
        this.contextReal.strokeStyle = canvasSettings.colorStroke; //canvas-configuration.js
        this.contextDraft.strokeStyle = canvasSettings.colorStroke;
        this.contextReal.lineJoin = "round";
        this.contextDraft.lineJoin = "round";
        this.contextReal.lineCap = "round"; //lineCap = "butt" or "round"
        this.contextDraft.lineCap = "round"; //lineCap = "butt" or "round"
        this.contextReal.lineWidth = canvasSettings.brushSize //canvas-configuration.js
        this.contextDraft.lineWidth = canvasSettings.brushSize //canvas-configuration.js
        this.origX = coord[0];
        this.origY = coord[1];
        this.contextReal.beginPath();
        this.contextReal.moveTo(this.origX,this.origY);
    }
    onDragging(coord,event){       
        this.contextDraft.closePath();
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.beginPath(); 
        this.contextDraft.moveTo(this.origX,this.origY);
        this.contextDraft.lineTo(coord[0],coord[1]);
        this.contextDraft.stroke();
    }
    onMouseUp(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.lineTo(coord[0],coord[1]);
        this.contextReal.stroke();
        this.onFinish();
    }
    onFinish(){
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount] = new Image();
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount].src = canvasReal.toDataURL();
        canvasSettings.undoObject.actionCount++;
    }
}