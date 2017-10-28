class DrawingText extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.actionCount = 0;
        this.textX = [];
        this.textY = [];
    }
    
    onMouseDown(coord,event){
        this.contextReal.font = "48px serif";
        this.contextReal.lineWidth = "5";
        
        this.textX.push(coord[0]);
        this.textY.push(coord[1]);
        console.log('inside if (x,y) '+this.textX[0]+','+this.textY[0]);
        $('#textInput').css({"display":"inline-block","top":this.textY[0],"left":this.textX[0]});
        
        if (this.textX.length > 1 && event.target.id != $('#textInput')){
            this.outputText(this.textX,this.textY,this.contextReal);
        }
        
    }
    
    outputText(ctx){
        console.log('inside outputText function (x,y) '+this.textX[0]+','+this.textY[0]);
        let inputText = $('#textInput').val();
        console.log('input is '+ inputText);
        contextReal.fillText(inputText,this.textX[0],this.textY[0]);
        $('#textInput').css({"display":"none","top":"0","left":"0"});
        $('body').find('input[type=text],input').val('');
        this.textX= [];
        this.textY = [];
        console.log('after clearing arrays '+this.textX+' , '+this.textY);
    }
        
}