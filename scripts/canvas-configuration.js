var canvasSettings = {
    //Tool Settings
    colorStroke: $("#colorStroke").val(), //Default stroke color
    colorFill: $("#colorFill").val(), //Default fill color
    brushSize: $('#brushSize').val(), //Default brush size
    //Functions
    pencilButton: DrawingFreehand,
    lineButton: DrawingLine,
    rectangleButton: DrawingRectangle,
    circleButton: DrawingCircle,
    eraserButton: DrawingEraser,
    clearButton: DrawingClear,
    quadraticCurveButton: DrawingQuadraticCurve,
    polygonButton: DrawingPolygon,
    findColorButton: FindColor,
    textButton: DrawingText,
    //Undo Function Object
    undoObject: {
        actionCount: 0,
        states: [],
        savePoint: 0
    }
}

//Change color settings
$("#colorStroke").on("change", function(){
    canvasSettings.colorStroke = this.value;
})
$("#colorFill").on("change", function(){
    canvasSettings.colorFill = this.value;
})

//Change brush size
$("#brushSize")[0].oninput = function() {
    canvasSettings.brushSize = this.value;
    //Change visual
    $('.sizeImage').css("width",this.value);
    $('.sizeImage').css("height",this.value);
}

//Change Tool
$('body').on("click",".toolButton", function(){
    // Undo eraser and clear all effect
    contextReal.globalCompositeOperation="source-over";
    //Assign function on click
    var toolButton = $(this).attr("class").split(' ')[1];
    currentFunction = new canvasSettings[toolButton](contextReal,contextDraft);
    /*Highlight button*/
    $('.toolButton').removeClass("active");
    $(this).addClass("active");
});


//Keep canvas on resize
$(window).resize(function(){
    if($(window).width()>300){
    var tempCanvas = document.createElement('canvas');
    var tempContext = tempCanvas.getContext('2d');
    tempCanvas.width = canvasReal.width;
    tempCanvas.height = canvasReal.height;
    tempContext.drawImage(canvasReal,0,0);
    canvasReal.width = parseInt($("#canvasContainer").css("width").replace("px",""));
    canvasDraft.width = parseInt($("#canvasContainer").css("width").replace("px",""))+400;
    contextReal.fillStyle = "white";
    contextReal.fillRect(0, 0, canvasReal.width, canvasReal.height);
    contextReal.drawImage(tempCanvas,0,0);
    }
});

//Initialize canvas with white background
contextReal.fillStyle = "white";
contextReal.fillRect(0, 0, canvasReal.width, canvasReal.height);

//Initialize blank canvas as undoObject's first state
canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount] = new Image();
canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount].src = canvasReal.toDataURL();
canvasSettings.undoObject.actionCount++;