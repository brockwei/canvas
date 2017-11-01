
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
    }
    onMouseDown(coord){
        dragging = true;
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.drawImage(this.image,coord[0],coord[1]);
    }
    onDragging(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.drawImage(this.image,coord[0],coord[1]);
    }
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.drawImage(this.image,coord[0],coord[1]);
        currentFunction = new DrawingFreehand(coord,event);
    }
}
