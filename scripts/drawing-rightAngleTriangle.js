class DrawingRightAngleTriangle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        // Change border width 'lineWidth' below in px
        this.contextDraft.lineWidth = this.contextReal.lineWidth = 5;
        // Change border colour 'strokeStyle' below
        this.contextDraft.strokeStyle = this.contextReal.strokeStyle = 'red';
        // Change fill colour 'fillStyle' below
        this.contextDraft.fillStyle = this.contextReal.fillStyle = 'blue';
    }
    
    onMouseDown(coord,event){
        this.contextReal.beginPath();
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(coord[0], coord[1]);
        this.contextDraft.lineTo(this.origX, coord[1]);
        this.contextDraft.lineTo(this.origX,this.origY);
        this.contextDraft.closePath();
        this.contextDraft.fill();
        this.contextDraft.stroke();
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
//        this.contextReal.moveTo(coord[0], coord[1]);
        this.contextReal.moveTo(coord[0], coord[1]);
        this.contextReal.lineTo(this.origX, coord[1]);
        this.contextReal.lineTo(this.origX,this.origY);
        this.contextReal.closePath();
        this.contextReal.fill();
        this.contextReal.stroke();
    }
    onMouseLeave(){}
    onMouseEnter(){}
}