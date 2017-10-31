class DrawingPolygon extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.actionCount = 0;
    }

    onMouseDown(coord,event){
        dragging = false;
        this.contextReal.strokeStyle = canvasSettings.colorStroke; //canvas-configuration.js
        this.contextDraft.strokeStyle = canvasSettings.colorStroke; //canvas-configuration.js
        this.contextReal.lineCap = "round";
        this.contextDraft.lineCap = "round";
        this.contextReal.lineWidth = canvasSettings.brushSize; //canvas-configuration.js
        this.contextDraft.lineWidth = canvasSettings.brushSize; //canvas-configuration.js
        this.origX = coord[0];
        this.origY = coord[1];
        
        //action for the First click
        if (this.actionCount === 0){
            this.firstOrigX = coord[0];
            this.firstOrigY = coord[1];
            this.contextReal.beginPath();
            this.contextReal.moveTo(this.origX,this.origY);
            this.actionCount = 1;
        } 
        //action for the Second or Later click
        else if (this.actionCount === 1){
            this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
            this.contextReal.lineTo(coord[0],coord[1]);
            this.contextReal.stroke();
            this.contextReal.moveTo(this.origX,this.origY);
        }
    }

    onMouseUp(coord,event){
        //if the end point is 20px away from the original starting point, we complete the polygon
        dragging = false;
        if ((this.actionCount === 1) && (Math.pow((this.firstOrigX - coord[0]),2)<400 && Math.pow((this.firstOrigY - coord[1]),2)<400)){
            this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
            this.contextReal.lineTo(this.firstOrigX,this.firstOrigY);
            this.contextReal.stroke();
            this.actionCount = 0;
            this.onFinish();//Stores undo state
        }
    }

    //shows the draft line
    onDragging(coord,event){
        dragging = true;
        if (this.actionCount === 1){
            this.contextDraft.closePath();
            this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
            this.contextDraft.beginPath(); 
            this.contextDraft.moveTo(this.origX,this.origY);
            this.contextDraft.lineTo(coord[0],coord[1]);
            this.contextDraft.stroke();
        }
    }
    onFinish(){
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount] = new Image();
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount].src = canvasReal.toDataURL();
        canvasSettings.undoObject.actionCount++;
    }

}