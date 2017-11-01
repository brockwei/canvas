function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class DrawingRandom extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;
        this.points = [];
        // Change style at end of line 'lineCap' below - 'butt' - default if unspecified, 'round', 'square'
        this.context.lineCap = 'round';
        // Change join style 'lineJoin' below - 'bevel', 'round', 'miter'
        this.context.lineJoin = 'round';
        // Change fill colour 'fillStyle' below
        this.context.fillStyle = 'red';
        
    }
    
    onMouseDown(coord,event){
    this.points.push({ 
        x: coord[0], 
        y: coord[1],
        radius: getRandomInt(10, 30),
        opacity: Math.random()*0.15 // manually added the 0.15 multiplier to reduce opacity
    });
};
      
//    }
    onDragging(coord,event){
        this.points.push({ 
            x: coord[0], 
            y: coord[1],
            radius: getRandomInt(5, 20),
            opacity: Math.random()*0.1
        });
          
          for (var i = 0; i < this.points.length; i++) {
            this.context.beginPath();
            this.context.globalAlpha = this.points[i].opacity;
            this.context.arc(
                this.points[i].x, this.points[i].y, this.points[i].radius, 
                false, Math.PI * 2, false);
                this.context.fill();
        }
        console.log(coord[0],coord[1]);
    };

    onMouseMove(){}
    onMouseUp(){
        this.points.length = 0;
    }

    onMouseLeave(){}
    onMouseEnter(){}
}