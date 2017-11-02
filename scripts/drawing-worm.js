class DrawingWorm extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;
        this.lastPoint = {};
        this.currentPoint = {};
        // Change border width of circle imprint 'lineWidth' below in px
        this.context.lineWidth = 1;
        this.context.strokeStyle = canvasSettings.colorStroke; //canvas-configuration.js
        this.context.fillStyle = canvasSettings.colorFill; //canvas-configuration.js
    }
    onMouseDown(coord,event){
        this.context.strokeStyle = canvasSettings.colorStroke; //canvas-configuration.js
        this.context.fillStyle = canvasSettings.colorFill; //canvas-configuration.js
        this.lastPoint = { x: coord[0], y: coord[1] };
    }
    onDragging(coord,event){
        this.currentPoint = { x: coord[0], y: coord[1] };
        var dist = this.distanceBetween(this.lastPoint, this.currentPoint);
        var angle = this.angleBetween(this.lastPoint, this.currentPoint);
        for (var i = 0; i < dist; i+=5) {
            var x = this.lastPoint.x + (Math.sin(angle) * i) - 25; // offset -25 to position against cursor
            var y = this.lastPoint.y + (Math.cos(angle) * i) - 25; // offset -25 to position against cursor
            this.context.beginPath();
            this.context.arc(x+10, y+10, canvasSettings.brushSize, false, Math.PI * 2, false);
            this.context.closePath();
            this.context.fill();
            this.context.stroke();
            }
        this.lastPoint = this.currentPoint;
    }
    onMouseMove(){}
    onMouseUp(){
        this.onFinish();
    }
    onMouseLeave(){}
    onMouseEnter(){}
    distanceBetween(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
    angleBetween(point1, point2) {
        return Math.atan2( point2.x - point1.x, point2.y - point1.y);
    }
    onFinish(){
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount] = new Image();
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount].src = canvasReal.toDataURL();
        canvasSettings.undoObject.actionCount++;
    }
}


