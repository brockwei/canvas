
function uploadImage(){
    $('#import').trigger('click');
    $('#import').change(function(){
        var uploadImg = new Image();
        uploadImg.onload = function(){
            contextDraft.drawImage(uploadImg,200,100);
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
        this.actionCount = 0;
    }
    onMouseMove(coord){
        if (this.actionCount === 0){
            console.log('Image width '+this.image.width);
            console.log('Image height '+this.image.height);
            this.contextDraft.lineWidth = 5;
            this.contextDraft.setLineDash([5,5]);
            this.contextDraft.strokeStyle = "rgb(0,192,255)";
            this.contextDraft.strokeRect(200,100,this.imageHalfWidth*2,this.imageHalfHeight*2);
        }
    }
    onMouseDown(coord){
        this.actionCount = 1;
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
        $('#import').val('');
        this.onFinish();
        $(".active").trigger("click");
    }
    onFinish(){
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount] = new Image();
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount].src = canvasReal.toDataURL();
        canvasSettings.undoObject.actionCount++;
    }
}
