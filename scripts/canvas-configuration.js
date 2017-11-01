var canvasSettings = {
    //Default Settings
    colorStroke: $("#colorStroke").val(),
    colorFill: $("#colorFill").val(),
    brushSize: $('#brushSize').val(),
    //Text Options
    textFont: $('#textFont').val(),
    textSize: $('#textSize').val(),
    //Setting Functions
    changeStroke: function(jscolor){canvasSettings.colorStroke = "#"+jscolor;},
    changeFill: function(jscolor){canvasSettings.colorFill = "#"+jscolor;},
    changeText: function(){canvasSettings.textFont=$('#textFont').val();$('#textFont').css('font-family',$('#textFont').val());$('.showTextSize').css('font-family',$('#textFont').val());},
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
        savePoint: 0,
        undoAction: function(){
                        if(canvasSettings.undoObject.actionCount>1){
                            canvasSettings.undoObject.actionCount--;
                            canvasSettings.undoObject.savePoint = canvasSettings.undoObject.actionCount;
                            contextReal.drawImage(canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount-1],0,0);
                        }
                    },
        redoAction: function(){
                        if(canvasSettings.undoObject.actionCount == canvasSettings.undoObject.savePoint && canvasSettings.undoObject.actionCount<canvasSettings.undoObject.states.length){
                            canvasSettings.undoObject.actionCount++;
                            canvasSettings.undoObject.savePoint++;
                            contextReal.drawImage(canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount-1],0,0);
                        }
                        else if(canvasSettings.undoObject.actionCount != canvasSettings.undoObject.savePoint){
                            canvasSettings.undoObject.states.splice(canvasSettings.undoObject.actionCount);
                            canvasSettings.undoObject.savePoint = canvasSettings.undoObject.actionCount;
                        }
                    }
    },
    //hotkey usability:
    keyPress: function(e) {
        var evtobj = window.event? event : e;
        if (evtobj.keyCode == 90 && evtobj.ctrlKey) {canvasSettings.undoObject.undoAction();} //ctrl+z
        if (evtobj.keyCode == 89 && evtobj.ctrlKey) {canvasSettings.undoObject.redoAction();} //ctrl+y
        if (evtobj.keyCode == 49 && evtobj.altKey) {$(".pencilButton").trigger("click");} //ctrl+1
        if (evtobj.keyCode == 50 && evtobj.altKey) {$(".eraserButton").trigger("click");} //ctrl+2
        if (evtobj.keyCode == 51 && evtobj.altKey) {$(".textButton").trigger("click");} //ctrl+3
        if (evtobj.keyCode == 52 && evtobj.altKey) {$(".findColorButton").trigger("click");} //ctrl+4
        if (evtobj.keyCode == 53 && evtobj.altKey) {$(".lineButton").trigger("click");} //ctrl+5
        if (evtobj.keyCode == 54 && evtobj.altKey) {$(".circleButton").trigger("click");} //ctrl+6
        if (evtobj.keyCode == 55 && evtobj.altKey) {$(".rectangleButton").trigger("click");} //ctrl+7
        if (evtobj.keyCode == 56 && evtobj.altKey) {$(".quadraticCurveButton").trigger("click");} //ctrl+8
        if (evtobj.keyCode == 57 && evtobj.altKey) {$(".polygonButton").trigger("click");} //ctrl+9
    }
}

document.onkeydown = canvasSettings.keyPress;

//Change text size
$("#textSize")[0].oninput = function() {
    canvasSettings.textSize = this.value;
    //Change visual
    $('.showTextSize').css("font-size",this.value+"px");
    $(".showTextSize").html(this.value);
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
    //Shows textbox options if text tool is active
    if(/textButton/.test($('.active')[0].className)){
        $('#textOptions').fadeIn().css("display","flex");
    }
    else {
        $('#textOptions').fadeOut().css("display","none");
    }
    //User experience for Mobile:
    $('.toolsDropdownButton').html($('.active').html());
});
$(window).resize(function(){
    $('#textOptions').css("display","none");
})
//Clear text
canvasSettings.clearText = function(){
    $('#textInput').css({"display":"none","transform":"translateY(0) translateX(0)"});
    $('#textInput').val('');
}
//Mobile Version
$('body').on('click','.toolsDropdownButton',function(){
    $('.adminDropdown').addClass('mobileHidden');
    //$('.sizeSlider').addClass('mobileHidden');
    $('.toolsDropdown').toggleClass('mobileHidden');
})
$('body').on('click','.adminDropdownButton',function(){
    //$('.sizeSlider').addClass('mobileHidden');
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

/*
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('body').on('click','.showSize',function(){
        $('.adminDropdown').addClass('mobileHidden');
        $('.toolsDropdown').addClass('mobileHidden');
        $('.sizeSlider').toggleClass('mobileHidden');
    })
}*/

//Features disabled on iOS
if( /webOS|iPhone|iPad|iPod/i.test(navigator.userAgent) === false ) {
    $('body').on('click','.showSize',function(){
        $('.adminDropdown').addClass('mobileHidden');
        $('.toolsDropdown').addClass('mobileHidden');
        if(/mobileHidden/.test($('.sizeSlider').attr("class"))==true){
            $('.sizeSlider').removeClass('mobileHidden');
        }
        else if(/mobileHidden/.test($('.sizeSlider').attr("class"))==false){
            $('.sizeSlider').addClass('mobileHidden');
        }
    });
    $('body').on('click','.toolsDropdownButton',function(){
        $('.sizeSlider').addClass('mobileHidden');
    })
    $('body').on('click','.adminDropdownButton',function(){
        $('.sizeSlider').addClass('mobileHidden');
    })
}
$(window).resize(function(){
    if( /webOS|iPhone|iPad|iPod/i.test(navigator.userAgent) === false ) {
        $('body').on('click','.showSize',function(){
            $('.adminDropdown').addClass('mobileHidden');
            $('.toolsDropdown').addClass('mobileHidden');
            $('.sizeSlider').removeClass('mobileHidden');
        });
        $('body').on('click','.toolsDropdownButton',function(){
            $('.sizeSlider').addClass('mobileHidden');
        })
        $('body').on('click','.adminDropdownButton',function(){
            $('.sizeSlider').addClass('mobileHidden');
        })
    }
});