class DrawingFreehand extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;
        console.log($(".activeColor").attr("class").match(/[h][e][x][0-9a-z]+/)[0].replace("hex","#")); 
    }
    
    onMouseDown(coord,event){
        this.context.strokeStyle = $(".strokeColor").attr("class").match(/[h][e][x][0-9a-z]+/)[0].replace("hex","#");    
        this.context.lineJoin = "round";
        this.context.lineCap = "round"; //lineCap = "butt" or "round"
        //Changes stroke size
        this.context.lineWidth = $('.sizeImage').css("height").replace('px','');
        this.context.beginPath();
        this.context.moveTo(coord[0],coord[1]);
        this.draw(coord[0],coord[1]);
    }
    onDragging(coord,event){
        this.draw(coord[0],coord[1]);
    }
    onMouseMove(){
    }
    onMouseUp(){
        this.context.closePath();
        this.context.stroke();    
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
}