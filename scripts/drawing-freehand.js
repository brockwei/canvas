class DrawingFreehand extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;
    }
    
    onMouseDown(coord,event){
        this.clearText(this.contextReal);//For text box bug(MF)
        this.context.strokeStyle = canvasSettings.colorStroke;    
        this.context.lineJoin = "round";
        this.context.lineCap = "round"; //lineCap = "butt" or "round"
        this.context.lineWidth = canvasSettings.brushSize; //Changes stroke size
        this.context.beginPath();
        this.context.moveTo(coord[0],coord[1]);
        this.draw(coord[0],coord[1]);
    }
    onDragging(coord,event){
        this.draw(coord[0],coord[1]);
    }
    onMouseMove(){}
    onMouseUp(){
        this.context.closePath();
        this.context.stroke();
        this.onFinish();
    }
    onMouseLeave(coord,event){
        this.context.closePath();
        this.context.stroke();  
    }
    onMouseEnter(coord,event){
        this.context.beginPath();
        this.context.moveTo(coord[0],coord[1]);
    }
    draw(x,y){
        this.context.lineTo(x,y);
        this.context.moveTo(x,y);
        this.context.closePath();
        this.context.stroke();    
    }

    //Remove the text input box for text box bug(MF)
    clearText(){
        $('#textInput').css({"display":"none","transform":"translateY(0) translateX(0)"});
        $('#textInput').val('');
        this.textX= [];
        this.textY = [];
    }

    onFinish(){
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount] = new Image();
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount].src = canvasReal.toDataURL();
        canvasSettings.undoObject.actionCount++;
    }
}