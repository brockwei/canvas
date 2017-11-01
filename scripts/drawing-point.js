class DrawingPoint extends PaintFunction{
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
        this.context.beginPath();
        this.context.moveTo(this.points[0].x, this.points[0].y);
        for (var i = 1; i < this.points.length; i++) {
            this.context.lineTo(this.points[i].x, this.points[i].y);
        }
        this.context.stroke();
    }

    onMouseMove(){}
    onMouseUp(){
        this.points.length = 0;
    }
    onMouseLeave(){}
    onMouseEnter(){}
}