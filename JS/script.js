function GetAllContacts(){
    $.ajax({
        url: "PHP/GetAllContacts.PHP",
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            

            if (result.status.name == "ok") {
                $("#contacts").empty()
                $x = result.len;
                for (let index = 0; index < $x; index++) {
                    console.log(result.data[index]);
                    $contact = " <div class='card border-dark mb-3 contact'><div class='card-header'>"+result.data[index]['firstName']+ " " +result.data[index]['lastName'] + "</div><div class='card-body text-dark'><h5 class='card-title'>"+result.data[index]['jobTitle']+"</h5><p class='card-text'><a href=mailto:"+result.data[index]['email']+"><i class='far fa-envelope'></i></a> "+result.data[index]['email']+"<br>"+result.data[index]['department']+", "+result.data[index]['location']+"</p></div></div>";
                   
                    
                     $('#contacts').append($($contact));
                    
                }

                
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}
function GetAllDepartments(){
    $.ajax({
        url: "PHP/GetDepartments.PHP",
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            

            if (result.status.name == "ok") {
                $option = '<option value="All" selected>All Departments</option>';
                $("#DepartmentFilter").empty().append($option); 
                $x = result.len;
                for (let index = 0; index < $x; index++) {
                    $('#DepartmentFilter').append($('<option>', {
                    value: result.data[index]["id"],
                    text: result.data[index]["name"]
                }));
                $('#addContactDepartment').append($('<option>', {
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
}
function updateDepartmentFilter($location){
    
    $.ajax({
        url: "PHP/GetDepartmentsPerFilter.PHP",
        type: 'GET',
        dataType: 'json',
        data: {
            location: $location
        },
        success: function(result) {
            console.log(result);

            if (result.status.name == "ok") {
                $option = '<option value="All" selected>All Departments</option>';
                $("#DepartmentFilter").empty().append($option); 
                $x = result.len;
                for (let index = 0; index < $x; index++) {
                    
                    $('#DepartmentFilter').append($('<option>', {
                    value: result.data[index]["id"],
                    text: result.data[index]["name"]
                }));
                $('#addContactDepartment').append($('<option>', {
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
}
function filterContactsByLocation($location){
    $.ajax({
        url: "PHP/GetContactsPerLFilter.PHP",
        type: 'GET',
        dataType: 'json',
        data:{
            location: $location
        },
        success: function(result) {
            console.log(result);

            if (result.status.name == "ok") {
                $("#contacts").empty()
                $x = result.len;
                for (let index = 0; index < $x; index++) {
                    console.log(result.data[index]);
                    $contact = " <div class='card border-dark mb-3 contact'><div class='card-header'>"+result.data[index]['firstName']+ " " +result.data[index]['lastName'] + "</div><div class='card-body text-dark'><h5 class='card-title'>"+result.data[index]['jobTitle']+"</h5><p class='card-text'><a href=mailto:"+result.data[index]['email']+"><i class='far fa-envelope'></i></a> "+result.data[index]['email']+"<br>"+result.data[index]['department']+", "+result.data[index]['location']+"</p></div></div>";
                   
                    
                     $('#contacts').append($($contact));
                    
                }

                
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}
$(document).ready(function(){
    GetAllContacts();
    GetAllDepartments();
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
$("#addDepartmentConfirm").click(function(){
    $name = $("#addDepartmentName").val();
    $location = $("#addDepartmentLocation").val();
    $.ajax({
        url: "PHP/AddDepartment.PHP",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $name,
            location: $location
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
$("#addContactConfirm").click(function(){
    $firstName = $("#addFirstName").val();
    $department = $("#addContactDepartment").val();
    $surname = $("#addSurname").val();
    $email = $("#addEmail").val();
    $jobTitle = $("#addJobTitle").val();
    $.ajax({
        url: "PHP/AddContact.PHP",
        type: 'POST',
        dataType: 'json',
        data: {
            firstName: $firstName,
            department: $department,
            surname: $surname,
            email: $email,
            jobTitle: $jobTitle
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
$("#LocationFilter").change(function(){
    $location = $(this).val();
    if($location === "All"){
        GetAllDepartments();
        GetAllContacts();
    }else{
        updateDepartmentFilter($location);
        filterContactsByLocation($location);
    }
})

$("#DepartmentFilter").change(function(){
    $department = $(this).val();
    
    if($department === "All"){
        GetAllContacts();
    }else{
        filterContactsByDepartment($department);
    }
})


