$(document).ready(function(){
    $.ajax({
        url: "PHP/GetDepartments.PHP",
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            

            if (result.status.name == "ok") {
                $x = result.len;
                for (let index = 0; index < $x; index++) {
                    $('#DepartmentFilter').append($('<option>', {
                    value: result.data[index]["id"],
                    text: result.data[index]["name"]
                }));
                    
                }

                
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
    $.ajax({
        url: "PHP/GetLocations.PHP",
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            

            if (result.status.name == "ok") {
                $x = result.len;
                for (let index = 0; index < $x; index++) {                    
                    $('#LocationFilter').append($('<option>', {
                    value: result.data[index]["id"],
                    text: result.data[index]["name"]
                }));
                for (let index = 0; index < $x; index++) {                    
                    $('#addDepartmentLocation').append($('<option>', {
                    value: result.data[index]["id"],
                    text: result.data[index]["name"]
                }));
                
                    
                }

                
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
    $.ajax({
        url: "PHP/GetAllContacts.PHP",
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            

            if (result.status.name == "ok") {
                $x = result.len;
                for (let index = 0; index < $x; index++) {
                    // console.log(result.data[index]);
                
                //     $('#LocationFilter').append($('<option>', {
                //     value: result.data[index]["id"],
                //     text: result.data[index]["name"]
                // }));
                    
                }

                
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
})
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
$("#addLocationConfirm").click(function(){
    $name = $("#addLocationName").val()

    $.ajax({
        url: "PHP/AddLocation.PHP",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $name
        },
        success: function(result) {
            

            if (result.status.name == "ok") {
                alert("Location Added");
                location.reload();
                
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
})