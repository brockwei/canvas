class DrawingText extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.fontWeight = 600; //font weight
        this.fontSize = 35; //font size
        this.fontStyle = "Arial"; //font-family
        this.fillStyle = "orange"; //font color
        this.textX = [];
        this.textY = [];
    }
    
    onMouseDown(coord,event){
        //Set up contextReal text properties
        this.contextReal.font = `${this.fontWeight} ${this.fontSize}px ${this.fontStyle}`;
        this.contextReal.fillStyle = this.fillStyle;
        //Store the text starting (x,y)
        this.textX.push(coord[0]);
        this.textY.push(coord[1]);
        //Make the input box appear on the clicked area
        this.fontStartY = this.textY[0] - this.fontSize;
        $('#textInput').css({"display":"block","transform":"translateY("+coord[1]+"px) translateX("+coord[0]+"px)","font-size":this.fontSize,"color":this.fillStyle,"font-family":this.fontStyle,"font-weight":this.fontWeight,"padding":"0"});
        //If user click outside the input box, text will be printed on the canvas real
        if ((this.textX.length > 1) && (event.target.id != $('#textInput'))){
            this.outputText(this.contextReal);
        }
    }

    //Print the text on the caval real
    outputText(ctx){
        let inputText = $('#textInput').val();
        contextReal.fillText(inputText,this.textX[0],this.textY[0]+this.fontSize);
        //contextReal.stroke();
        $('#textInput').css({"display":"none","transform":"translateY(0) translateX(0)"});
        $('#textInput').val('');
        this.textX= [];
        this.textY = [];
        this.onFinish();
    }
    onFinish(){
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount] = new Image();
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount].src = canvasReal.toDataURL();
        canvasSettings.undoObject.actionCount++;
    }
}