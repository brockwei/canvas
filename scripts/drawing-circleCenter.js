// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse
// Drawing a circle using Ellipse

class DrawingCircleCenter extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        // Change border width 'lineWidth' below in px
        this.contextDraft.lineWidth = this.contextReal.lineWidth = 10;
        // Change border colour 'strokeStyle' below
        this.contextDraft.strokeStyle = this.contextReal.strokeStyle = 'blue';
        // Change fill colour 'fillStyle' below
        this.contextDraft.fillStyle = this.contextReal.fillStyle = 'red';
        
    }
    
    onMouseDown(coord,event){
        this.contextReal.beginPath();
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height); //- to clear draft context before redrawing
        this.contextDraft.beginPath();
        this.contextDraft.ellipse(this.origX, this.origY, Math.abs(coord[0] - this.origX), Math.abs(coord[0] - this.origX), 0 * Math.PI/180, 0, 2 * Math.PI) // rotation hardcoded as zero - essentially drawing an arc from zero @ x-axis to 2pi;
        this.contextDraft.fill();
        this.contextDraft.stroke();
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.ellipse(this.origX, this.origY, Math.abs(coord[0] - this.origX), Math.abs(coord[0] - this.origX), 0* Math.PI/180, 0, 2 * Math.PI)// rotation hardcoded as zero - use a JS text promt for user feedback?;
        this.contextReal.fill();
        this.contextReal.stroke();
    }
    onMouseLeave(){}
    onMouseEnter(){}
}