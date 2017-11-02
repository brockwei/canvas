class DrawingPolygon extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.actionCount = 0;
        this.pointsArr = [];
    }

    onMouseDown(coord,event){
        this.contextReal.strokeStyle = canvasSettings.colorStroke; //canvas-configuration.js
        this.contextDraft.strokeStyle = canvasSettings.colorStroke; //canvas-configuration.js
        this.contextReal.lineCap = "round"; //line cap shape
        this.contextDraft.lineCap = "round"; //line cap shape
        this.contextReal.lineWidth = canvasSettings.brushSize; //canvas-configuration.js
        this.contextDraft.lineWidth = canvasSettings.brushSize; //canvas-configuration.js
        this.contextReal.fillStyle = canvasSettings.colorFill; //canvas-configuration.js

        //action for the First click
        if (this.actionCount === 0){
            this.firstOrigX = coord[0];
            this.firstOrigY = coord[1];
            this.contextReal.beginPath();
            this.contextReal.moveTo(this.firstOrigX,this.firstOrigY);
                this.pointsArr.push({"x":this.firstOrigX,"y":this.firstOrigY});
                //console.log('pointsArr at 0-MouseDown '+JSON.stringify(this.pointsArr));
        }
        dragging = true;
    }

    onMouseUp(coord,event){
        if (this.actionCount === 0){
            this.newX = coord[0];
            this.newY = coord[1];
            this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
            this.toDrawReal(this.newX,this.newY,coord[0],coord[1]);
                this.pointsArr.push({"x":coord[0],"y":coord[1]});
                //console.log('pointsArr at 0-MouseUp '+JSON.stringify(this.pointsArr));
            this.actionCount = 1;
        } else if (this.actionCount === 1){
            if (Math.pow((this.firstOrigX - coord[0]),2)<400 && Math.pow((this.firstOrigY - coord[1]),2)<400){
                dragging = false;
                this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                this.contextReal.lineTo(this.firstOrigX,this.firstOrigY);
                this.pointsArr.push({"x":this.firstOrigX,"y":this.firstOrigY});
                //console.log('pointsArr at 1-MouseUp '+JSON.stringify(this.pointsArr));
                this.contextReal.stroke();
                this.polygonFillTest();
                //console.log('Points array '+JSON.stringify(this.pointsArr));
                this.pointsArr = [];
                this.onFinish();//Stores undo state
                this.actionCount = 0;
            } else {
                this.newX = coord[0];
                this.newY = coord[1];
                dragging = true;
                this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                this.toDrawReal(this.newX,this.newY,coord[0],coord[1]);
                    this.pointsArr.push({"x":coord[0],"y":coord[1]});
                    //console.log('pointsArr at 0-MouseUp '+JSON.stringify(this.pointsArr));
            }
        }
        //console.log('mouse up '+ coord[0],coord[1]);
    }
    onDragging(coord,event){
        if (this.actionCount === 0){
            this.toDrawDraft(this.firstOrigX,this.firstOrigY,coord[0],coord[1]);
        } else if (this.actionCount === 1){
            this.toDrawDraft(this.newX,this.newY,coord[0],coord[1]);
        }
    }
    polygonFillTest(){
        this.contextReal.beginPath();
        this.contextReal.moveTo(this.pointsArr[0].x,this.pointsArr[0].y);
        //console.log('Fill move to '+ this.pointsArr[0].x+' , '+this.pointsArr[0].y)
        for (var i = 1; i < this.pointsArr.length; i++){
            this.contextReal.lineTo(this.pointsArr[i].x,this.pointsArr[i].y);
            //console.log('Fill line to '+this.pointsArr[i].x+' , '+this.pointsArr[i].y)
        }
        this.contextReal.fill();
        this.contextReal.stroke();
    }
    toDrawDraft(fromX,fromY,toX,toY){
        this.contextDraft.closePath();
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.beginPath(); 
        this.contextDraft.moveTo(fromX,fromY);
        this.contextDraft.lineTo(toX,toY);
        this.contextDraft.stroke();
    }

    toDrawReal(fromX,fromY,toX,toY){
        this.contextReal.lineTo(fromX,fromY);
            //this.pointsArr.push(fromX,fromY);
        this.contextReal.stroke();
        this.contextReal.closePath();
        this.contextReal.beginPath();
        this.contextReal.moveTo(toX,toY);
            //this.pointsArr.push(toX,toY);
    }
    onFinish(){
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount] = new Image();
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount].src = canvasReal.toDataURL();
        canvasSettings.undoObject.actionCount++;
    }
}