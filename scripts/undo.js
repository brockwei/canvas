
// Version 3 - undoObject stored as key of canvasSettings object, in canvas-configuration.js

$('.undo').on('click', function(){
    canvasSettings.undoObject.undoAction();
});

$('.redo').on("click", function(){
    canvasSettings.undoObject.redoAction();
});