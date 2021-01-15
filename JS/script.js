$("#add").click(function(){
    if ($("#editDropDown").hasClass("active")){
        $("#editDropDown").removeClass("active");
        $("#edit").css("background-color", "#333");
        $("#editDropDown").prop("selectedIndex", 0);
    }
    if ($("#deleteDropDown").hasClass("active")){
        $("#deleteDropDown").removeClass("active");
        $("#delete").css("background-color", "#333");
        $("#addDropDown").prop("selectedIndex", 0);
    }
    if ($("#addDropDown").hasClass("active")){
        $(this).prop("selectedIndex", 0);
        $("#addDropDown").removeClass("active");
        $(this).css("background-color", "#333");
        
    }else{
        $("#addDropDown").addClass("active");
        $(this).css("background-color", "green");
    }
});
$("#edit").click(function(){
    if ($("#addDropDown").hasClass("active")){
        $("#addDropDown").removeClass("active");
        $("#add").css("background-color", "#333");
        $("#addDropDown").prop("selectedIndex", 0);
    }
    if ($("#deleteDropDown").hasClass("active")){
        $("#deleteDropDown").removeClass("active");
        $("#delete").css("background-color", "#333");
        $("#deleteDropDown").prop("selectedIndex", 0);
    }
    if ($("#editDropDown").hasClass("active")){
        $("#editDropDown").removeClass("active");
        $(this).css("background-color", "#333");
        $(this).prop("selectedIndex", 0);
    }else{
        $("#editDropDown").addClass("active");
        $(this).css("background-color", "green");
    }
});
$("#delete").click(function(){
    if ($("#addDropDown").hasClass("active")){
        $("#addDropDown").removeClass("active");
        $("#add").css("background-color", "#333");
        $("#addDropDown").prop("selectedIndex", 0);
    }
    if ($("#editDropDown").hasClass("active")){
        $("#editDropDown").removeClass("active");
        $("#edit").css("background-color", "#333");
        $("#editDropDown").prop("selectedIndex", 0);
    }
    if ($("#deleteDropDown").hasClass("active")){
        $("#deleteDropDown").removeClass("active");
        $(this).css("background-color", "#333");
        $(this).prop("selectedIndex", 0);
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