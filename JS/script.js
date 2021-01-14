$("#add").hover(function(){
    $(this).css("background-color", "green");
    $("#addDropDown").css("visibility","visible")
    }, function(){
        setTimeout( () => {
    $(this).css("background-color", "#333");
    $("#addDropDown").css("visibility","hidden")
        },3000)
  });