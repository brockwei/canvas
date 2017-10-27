class DrawingRectangle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;            
    }
    
    onMouseDown(coord,event){
        this.contextReal.strokeStyle = "balck";//border color
        this.contextReal.fillStyle = "#f44";//fill color
        this.contextReal.lineWidth = "5";//border width
        this.origX = coord[0];
        this.origY = coord[1];
        
    }
    onDragging(coord,event){
        this.contextDraft.strokeStyle = "black";//border color        
        this.contextDraft.fillStyle = "#f44";//fill color
        this.contextDraft.lineWidth = "5";//border width
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
    }
    onMouseLeave(){}
    onMouseEnter(){}
}