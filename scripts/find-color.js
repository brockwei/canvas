class FindColor extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;
    }
    onMouseDown(coord,event){
        this.clearText(this.contextReal);//For text box bug(MF)
        this.useColor(coord);
    }
    onDragging(coord,event){
        this.useColor(coord);
    }
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(coord,event){}
    onMouseEnter(coord,event){}

    toHex(num){
        var hex = num.toString(16);
        return hex.length ==1 ? "0" + hex : hex;
    }
    useColor(coord){
        var color = this.context.getImageData(coord[0],coord[1],1,1).data;
        var hexCode = this.toHex(color[0])+this.toHex(color[1])+this.toHex(color[2]);
        $('#colorStroke').val("#"+hexCode);
        canvasSettings.colorStroke = "#"+hexCode;
    }

    clearText(){
        $('#textInput').css({"display":"none","transform":"translateY(0) translateX(0)"});
        $('#textInput').val('');
        this.textX= [];
        this.textY = [];
    }

}