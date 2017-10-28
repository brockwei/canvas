$(function(){

    //Loads Colors without using global variables
    for(var i=0;i<$('.colorButton').length;i++){
        //console.log($('.colorButton')[i].className.split(' ')[1]) -- This targets each colorButton element
        //$('.colorButton')[i].className.split(' ')[1].replace("hex","#") -- This changes the hex class to a hexcode
        //The following line of code changes the background color of the button to the corresponding hex code of it's hex class
        $('.'+$('.colorButton')[i].className.split(' ')[1]).css("background",$('.colorButton')[i].className.split(' ')[1].replace("hex","#"));
    }
    $('body').on("click",".showActiveColor", function(){
        $('.showActiveColor').removeClass("activeColor");
        $(this).addClass("activeColor");
    });
    //This line sets the active Color. 
    $('body').on("click",".colorButton", function(){
        //$('.colorButton').removeClass("activeColor");
        //$(this).addClass("activeColor"); $(this).attr("class").split(" ")[1].replace("hex","#")
        //console.log($(this).attr("class").split(" ")[1]);
        $('.showActiveColor.activeColor').css("background",$(this).attr("class").split(" ")[1].replace("hex","#"));
        $('.showActiveColor.activeColor').attr("class", function(i,c){
            return c.replace(/[h][e][x][0-9a-f]*/g,"");
        })
        $('.showActiveColor.activeColor').addClass($(this).attr("class").split(" ")[1]);
    });

})