
function uploadImage(){
    $('#import').trigger('click');
    $('#import').change(function(){
        var uploadImg = new Image();
        uploadImg.onload = function(){
            contextDraft.drawImage(uploadImg,50,50);
            currentFunction = new OpenFile(contextReal,contextDraft,uploadImg);
        }
        uploadImg.src = URL.createObjectURL(this.files[0]);
    });
};


class OpenFile extends PaintFunction{
    constructor(ctxReal,ctxDraft,img){
        super();
        this.contextReal = ctxReal;
        this.contextDraft = ctxDraft;
        this.actionCount = 0;
        this.image = img;
        this.imageHalfWidth = img.width/2;
        this.imageHalfHeight = img.height/2;
    }
    onMouseDown(coord){
        console.log('Image width '+this.imageHalfWidth);
        console.log('Image height '+this.imageHalfHeight);
        console.log('Original mouse (x,y) '+coord[0]+' , '+coord[1]);
        dragging = true;
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.drawImage(this.image,coord[0]-this.imageHalfWidth,coord[1]-this.imageHalfHeight);
    }
    onDragging(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.drawImage(this.image,coord[0]-this.imageHalfWidth,coord[1]-this.imageHalfHeight);
    }
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.drawImage(this.image,coord[0]-this.imageHalfWidth,coord[1]-this.imageHalfHeight);
        this.onFinish();
        currentFunction = new DrawingFreehand(contextReal,contextDraft);
    }
    onFinish(){
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount] = new Image();
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount].src = canvasReal.toDataURL();
        canvasSettings.undoObject.actionCount++;
    }
}
