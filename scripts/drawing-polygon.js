class DrawingPolygon extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.actionCount = 0;
    }

    onMouseDown(coord,event){
        this.contextReal.strokeStyle = "#df4b26";//line color
        this.contextDraft.strokeStyle = "#df4b26";//line color
        this.contextReal.lineCap = "round";
        this.contextReal.lineWidth = 5;//line width
        this.contextDraft.lineWidth = 5;//line width
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
            //if the end point is 20px away from the original starting point, we complete the polygon
            if (Math.pow((this.firstOrigX - coord[0]),2)<400 && Math.pow((this.firstOrigY - coord[1]),2)<400){
                this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                this.contextReal.lineTo(this.firstOrigX,this.firstOrigY);
                this.contextReal.stroke();
                this.actionCount = 0;
            } 
            //if the end point is more than 20px away from the original starting point, we continue draw lines
            else {
                this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                this.contextReal.lineTo(coord[0],coord[1]);
                this.contextReal.stroke();
                //this.contextReal.beginPath();
                this.contextReal.moveTo(this.origX,this.origY);
            }
        }
    }

    //shows the draft line
    onMouseMove(coord,event){
        if (this.actionCount === 1){
            this.contextDraft.closePath();
            this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
            this.contextDraft.beginPath(); 
            this.contextDraft.moveTo(this.origX,this.origY);
            this.contextDraft.lineTo(coord[0],coord[1]);
            this.contextDraft.stroke();
        }
    }

}