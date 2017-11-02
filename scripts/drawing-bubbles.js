class DrawingBubbles extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;
        this.points = [];
        this.context.fillStyle = canvasSettings.colorStroke;    
        this.context.lineJoin = "round";
        this.context.lineCap = "round"; //lineCap = "butt" or "round"
        this.context.lineWidth = canvasSettings.brushSize; //Changes stroke size
    }
    
    onMouseDown(coord,event){
        this.context.fillStyle = canvasSettings.colorStroke;    
        this.context.lineJoin = "round";
        this.context.lineCap = "round"; //lineCap = "butt" or "round"
        this.context.lineWidth = canvasSettings.brushSize; //Changes stroke size
        this.points.push({ 
            x: coord[0], 
            y: coord[1],
            radius: this.getRandomInt(this.context.lineWidth, this.context.lineWidth+10),
            opacity: Math.random()*0.05 // manually added the 0.15 multiplier to reduce opacity
        });
    };
      
    onDragging(coord,event){
        this.points.push({ 
            x: coord[0], 
            y: coord[1],
            radius: this.getRandomInt(this.context.lineWidth, this.context.lineWidth+10),
            opacity: Math.random()*0.03
        });
          for (var i = 0; i < this.points.length; i++) {
            this.context.beginPath();
            this.context.globalAlpha = this.points[i].opacity;
            this.context.arc(
                this.points[i].x, this.points[i].y, this.points[i].radius, 
                false, Math.PI * 2, false);
                this.context.fill();
        }
        //console.log(coord[0],coord[1]);
    };
    onMouseMove(){}
    onMouseUp(){
        this.points.length = 0;
        this.context.globalAlpha = 1;
        this.onFinish();
    }
    onMouseLeave(){}
    onMouseEnter(){}
    getRandomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    onFinish(){
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount] = new Image();
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount].src = canvasReal.toDataURL();
        canvasSettings.undoObject.actionCount++;
    }
}