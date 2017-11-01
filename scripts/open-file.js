$('.open').on('click',function(){
    $('#openFile').trigger('click');
    //$('#openFile').css({"display":"block"});
    $('#openFile').change(function(){
        var image = new Image();
        image.onload = function(){
            contextReal.drawImage(image,50,50);
        }
        image.src = URL.createObjectURL(this.files[0]);
    });
});