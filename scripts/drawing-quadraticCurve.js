class DrawingQuadraticCurve extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.actionCounter = 0;
    }

        onMouseDown(coord,event){
            if (this.actionCounter === 0){
                this.contextReal.lineCap = "round"; //lineCap = "butt" or "round"
                this.contextDraft.lineCap = "round"; //lineCap = "butt" or "round"
                this.contextReal.strokeStyle = canvasSettings.colorStroke; //canvas-configuration.js
                this.contextDraft.strokeStyle = canvasSettings.colorStroke; //canvas-configuration.js
                this.contextReal.lineWidth = canvasSettings.brushSize; //canvas-configuration.js
                this.contextDraft.lineWidth = canvasSettings.brushSize; //canvas-configuration.js
                this.origX = coord[0];
                this.origY = coord[1];
                this.contextReal.beginPath();
                this.contextReal.moveTo(this.origX,this.origY);
            } 
            else if (this.actionCounter === 1){
            }
        }
        onDragging(coord,event){
            if (this.actionCounter === 0){
                this.endX = coord[0];
                this.endY = coord[1];
                this.contextDraft.closePath();
                this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                this.contextDraft.beginPath();
                this.contextDraft.moveTo(this.origX,this.origY);
                this.contextDraft.quadraticCurveTo(this.origX,this.origY,this.endX,this.endY);
                this.contextDraft.stroke();
            } else if (this.actionCounter === 1){
                this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                this.contextDraft.beginPath();
                this.contextDraft.moveTo(this.origX,this.origY);
                this.contextDraft.quadraticCurveTo(coord[0],coord[1],this.endX,this.endY);
                this.contextDraft.stroke();
            }
        }
        onMouseUp(coord,event){
            if (this.actionCounter === 0){
                this.actionCounter = 1;
            } else if (this.actionCounter === 1){
                this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                this.contextReal.quadraticCurveTo(coord[0],coord[1],this.endX,this.endY);
                this.contextReal.stroke();
                this.actionCounter = 0;
                this.onFinish();
            }
        }
        onFinish(){
            canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount] = new Image();
            canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount].src = canvasReal.toDataURL();
            canvasSettings.undoObject.actionCount++;
        }
}