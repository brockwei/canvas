function midPointBtw(p1, p2) {
    return {
      x: p1.x + (p2.x - p1.x) / 2,
      y: p1.y + (p2.y - p1.y) / 2
    };
}

class DrawingBezier extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;
        this.points = [];
        // Change line width 'lineWidth' below in px
        this.context.lineWidth = 5;
        // Change line colour 'strokeStyle' below
        this.context.strokeStyle = 'blue';
        // Change style at end of line 'lineCap' below - 'butt' - default if unspecified, 'round', 'square'
        this.context.lineCap = 'round';
        // Change join style 'lineJoin' below - 'bevel', 'round', 'miter'
        this.context.lineJoin = 'round';
        
    }
    
    onMouseDown(coord,event){
        this.points.push({ x: coord[0], y: coord[1] });
        
    }
    onDragging(coord,event){
        this.points.push({ x: coord[0], y: coord[1] });
        var p1 = this.points[0];
        var p2 = this.points[1];
          
        this.context.beginPath();
        this.context.moveTo(p1.x, p1.y);
        // console.log(this.points); // in the original code but commented out
        
        for (var i = 1, len = this.points.length; i < len; i++) {
            // we pick the point between pi+1 & pi+2 as the
            // end point and p1 as our control point
            var midPoint = midPointBtw(p1, p2);
            this.context.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
            p1 = this.points[i];
            p2 = this.points[i+1];
        }
          // Draw last line as a straight line while
          // we wait for the next point to be able to calculate
          // the bezier control point
        this.context.lineTo(p1.x, p1.y);
        this.context.stroke();
    };

    onMouseMove(){}
    onMouseUp(){
        this.points.length = 0;
    }

    onMouseLeave(){}
    onMouseEnter(){}
}