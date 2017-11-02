function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}

class DrawingTrail extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;
        this.lastPoint = {};
        this.currentPoint = {};
        // Change border width of circle imprint 'lineWidth' below in px
        this.context.lineWidth = this.context.lineWidth = 1;
        // Change border colour of circle imprint 'strokeStyle' below
        this.context.strokeStyle = 'blue'; //original '#333'
        // Change fill colour of circle imprint 'fillStyle' below
        this.context.fillStyle = 'red';
    }
    
    onMouseDown(coord,event){
        this.lastPoint = { x: coord[0], y: coord[1] };
        
    }
    onDragging(coord,event){
        this.currentPoint = { x: coord[0], y: coord[1] };
        var dist = distanceBetween(this.lastPoint, this.currentPoint);
        var angle = angleBetween(this.lastPoint, this.currentPoint);
        for (var i = 0; i < dist; i+=5) {
            var x = this.lastPoint.x + (Math.sin(angle) * i) - 25; // offset -25 to position against cursor
            var y = this.lastPoint.y + (Math.cos(angle) * i) - 25; // offset -25 to position against cursor
            this.context.beginPath();
            this.context.arc(x+10, y+10, 20, false, Math.PI * 2, false);
            this.context.closePath();
            this.context.fill();
            this.context.stroke();
            }
          
        this.lastPoint = this.currentPoint;
        
    }

    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}

}


