class DrawingCircle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;           
    }
    
    onMouseDown(coord,event){
        this.contextReal.strokeStyle = "black";//border color
        this.contextDraft.strokeStyle = "black";//border color
        this.contextReal.fillStyle = "#df4b26";//fill color
        this.contextDraft.fillStyle = "#df4b26";//fill color
        this.contextReal.lineWidth = 5;//border width
        this.contextDraft.lineWidth = 5;//border width
        this.origX = coord[0];
        this.origY = coord[1];
        this.contextReal.beginPath();
    }

    onDragging(coord,event){
        dragging = true;
        this.circleRadius = Math.sqrt(Math.pow(this.origX-coord[0],2)+Math.pow(this.origY-coord[1],2));
        console.log('radius '+this.circleRadius);
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.beginPath();
        this.contextDraft.arc(this.origX,this.origY,this.circleRadius,0,2*Math.PI);
        this.contextDraft.closePath();
        this.contextDraft.fill();
        this.contextDraft.stroke();
    }

    onMouseMove(){}

    onMouseUp(coord,event){
        dragging = false;
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.arc(this.origX,this.origY,this.circleRadius,0,2*Math.PI);
        this.contextReal.closePath();
        this.contextReal.fill();
        this.contextReal.stroke();
        this.circleRadius = 0;
    }

    onMouseLeave(){}
    onMouseEnter(){}
}