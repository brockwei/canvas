var canvasSettings = {
    //Default Settings
    colorStroke: $("#colorStroke").val(),
    colorFill: $("#colorFill").val(),
    brushSize: $('#brushSize').val(),
    //Setting Functions
    changeStroke: function(jscolor){canvasSettings.colorStroke = "#"+jscolor;},
    changeFill: function(jscolor){canvasSettings.colorFill = "#"+jscolor;},
    //Tool Functions
    pencilButton: DrawingFreehand,
    lineButton: DrawingLine,
    rectangleButton: DrawingRectangle,
    circleButton: DrawingCircle,
    eraserButton: DrawingEraser,
        //clearButton: DrawingClear,
    quadraticCurveButton: DrawingQuadraticCurve,
    polygonButton: DrawingPolygon,
    findColorButton: FindColor,
    textButton: DrawingText,
    //Admin Functions 
    downloadCanvas : function(){},
    clearCanvas: function(){},
    //Bug Fix functions
    clearText: function(){},
    //Undo Function Object
    undoObject: {
        actionCount: 0,
        states: [],
        savePoint: 0
    }
}

//Change brush size
$("#brushSize")[0].oninput = function() {
    canvasSettings.brushSize = this.value;
    //Change visual
    $('.sizeImage').css("width",this.value);
    $('.sizeImage').css("height",this.value);
}

//Change Tool
$('body').on("click",".toolButton", function(){
    //Bug fix
    canvasSettings.clearText();
    // Undo eraser and clear all effect
    contextReal.globalCompositeOperation="source-over";
    //Assign function on click
    var toolButton = $(this).attr("class").split(' ')[1];
    currentFunction = new canvasSettings[toolButton](contextReal,contextDraft);
    /*Highlight button*/
    $('.toolButton').removeClass("active");
    $(this).addClass("active");
    //User experience for Mobile:
    $('.toolsDropdownButton').html($('.active').html());
});
//Clear text
canvasSettings.clearText = function(){
    $('#textInput').css({"display":"none","transform":"translateY(0) translateX(0)"});
    $('#textInput').val('');
}
//Mobile Version
$('body').on('click','.toolsDropdownButton',function(){
    $('.adminDropdown').addClass('mobileHidden');
    $('.sizeSlider').addClass('mobileHidden');
    $('.toolsDropdown').toggleClass('mobileHidden');
})
$('body').on('click','.adminDropdownButton',function(){
    $('.sizeSlider').addClass('mobileHidden');
    $('.toolsDropdown').addClass('mobileHidden');
    $('.adminDropdown').toggleClass('mobileHidden');
})
$('body').on('click','.menuOpen',function(){
    $('#menu').removeClass('mobileHidden');
    $('.menuOpen').addClass('mobileHidden');
})
$('body').on('click','.menuClose',function(){
    $('#menu').addClass('mobileHidden');
    $('.menuOpen').removeClass('mobileHidden');
})

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('body').on('click','.showSize',function(){
        $('.adminDropdown').addClass('mobileHidden');
        $('.toolsDropdown').addClass('mobileHidden');
        $('.sizeSlider').toggleClass('mobileHidden');
    })
}