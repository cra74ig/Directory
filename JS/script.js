$("#add").click(function(){
    $("#addDropDown").prop("selectedIndex", 0);
    if ($("#editDropDown").hasClass("active")){
        $("#editDropDown").removeClass("active");
        $("#edit").css("background-color", "#333");
        
    }
    if ($("#deleteDropDown").hasClass("active")){
        $("#deleteDropDown").removeClass("active");
        $("#delete").css("background-color", "#333");
        
    }
    if ($("#addDropDown").hasClass("active")){
        
        $("#addDropDown").removeClass("active");
        $(this).css("background-color", "#333");
        
    }else{
        $("#addDropDown").addClass("active");
        $(this).css("background-color", "green");
    }
});
$("#edit").click(function(){
    $("#editDropDown").prop("selectedIndex", 0);
    if ($("#addDropDown").hasClass("active")){
        $("#addDropDown").removeClass("active");
        $("#add").css("background-color", "#333");
    }
    if ($("#deleteDropDown").hasClass("active")){
        $("#deleteDropDown").removeClass("active");
        $("#delete").css("background-color", "#333");     
    }
    if ($("#editDropDown").hasClass("active")){
        $("#editDropDown").removeClass("active");
        $(this).css("background-color", "#333");  
    }else{
        $("#editDropDown").addClass("active");
        $(this).css("background-color", "green");
    }
});
$("#delete").click(function(){
    $("#deleteDropDown").prop("selectedIndex", 0);
    if ($("#addDropDown").hasClass("active")){
        $("#addDropDown").removeClass("active");
        $("#add").css("background-color", "#333");
    }
    if ($("#editDropDown").hasClass("active")){
        $("#editDropDown").removeClass("active");
        $("#edit").css("background-color", "#333");
    }
    if ($("#deleteDropDown").hasClass("active")){
        $("#deleteDropDown").removeClass("active");
        $(this).css("background-color", "#333");
    }else{
        $("#deleteDropDown").addClass("active");
        $(this).css("background-color", "green");
    }
});
$("#editDropDown").change(function(){
    // console.log($(this).val());
    // $("#exampleModal").modal('toggle');
})
$("#addDropDown").change(function(){
    console.log($(this).val());
    $($(this).val()).modal('toggle');
})