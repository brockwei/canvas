
// Version 3 - undoObject stored as key of canvasSettings object, in canvas-configuration.js

$('.undo').on('click',function(){
    if(canvasSettings.undoObject.actionCount>1){
        canvasSettings.undoObject.actionCount--;
        canvasSettings.undoObject.savePoint = canvasSettings.undoObject.actionCount;
        contextReal.drawImage(canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount-1],0,0);
    }
});

$('.redo').on("click",function(){
    if(canvasSettings.undoObject.actionCount == canvasSettings.undoObject.savePoint && canvasSettings.undoObject.actionCount<canvasSettings.undoObject.states.length){
        canvasSettings.undoObject.actionCount++;
        canvasSettings.undoObject.savePoint++;
        contextReal.drawImage(canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount-1],0,0);
    }
    else if(canvasSettings.undoObject.actionCount != canvasSettings.undoObject.savePoint){
        canvasSettings.undoObject.states.splice(canvasSettings.undoObject.actionCount);
        canvasSettings.undoObject.savePoint = canvasSettings.undoObject.actionCount;
    }
})