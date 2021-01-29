contactsToDelete = [];
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
                    
                    $imgPath="Images/blank-profile-picture-973460_640.png";
                    $contact = " <div class='card contact' id='"+ result.data[index]['id']+"' onclick='selectedContact("+result.data[index]['id']+")'><img class='card-img-top' src='"+$imgPath+"' alt='Card image cap'><div class='card-body'> <h5 class='card-title'>"+result.data[index]['firstName']+ " " +result.data[index]['lastName'] + "<button type='button' class='btn adminControls' onclick= editContact("+result.data[index]['id']+",'"+encodeURIComponent(result.data[index]['jobTitle'])+"','"+result.data[index]['email']+"','"+encodeURIComponent(result.data[index]['departmentID'])+"','"+result.data[index]['firstName']+ "','" +result.data[index]['lastName'] +"')><i class='fas fa-edit admin'></i></button></h5><p class='card-text'>"+result.data[index]['jobTitle']+"</p><p class='card-text'><a href=mailto:"+result.data[index]['email']+"><i class='far fa-envelope'></i> "+result.data[index]['email']+"</a></p><p>"+result.data[index]['department']+", "+result.data[index]['location']+"</p></div></div>";
                   
                    
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
                $('#editContactDepartment').append($('<option>', {
                    value: result.data[index]["id"],
                    text: result.data[index]["name"]
                }));
                $('#delDepartmentList').append('<li><label for='+result.data[index]["id"]+'>'+result.data[index]["name"]+'</label><input type=image class="btn" src="Images/icons8-trash-24.png" alt="delete" onclick= "deleteDepartment('+result.data[index]["id"]+'); return false">'+'</input></li>');
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
            

            if (result.status.name == "ok") {
                $("#contacts").empty()
                $x = result.len;
                for (let index = 0; index < $x; index++) {
                    $contact = " <div class='card contact' id='"+ result.data[index]['id']+"' onclick='selectedContact("+result.data[index]['id']+")'><img class='card-img-top' src='"+$imgPath+"' alt='Card image cap'><div class='card-body'> <h5 class='card-title'>"+result.data[index]['firstName']+ " " +result.data[index]['lastName'] + "<button type='button' class='btn adminControls' onclick= editContact("+result.data[index]['id']+",'"+encodeURIComponent(result.data[index]['jobTitle'])+"','"+result.data[index]['email']+"','"+encodeURIComponent(result.data[index]['department'])+"','"+result.data[index]['firstName']+ "','" +result.data[index]['lastName'] +"')><i class='fas fa-edit admin'></i></button></h5><p class='card-text'>"+result.data[index]['jobTitle']+"</p><p class='card-text'><a href=mailto:"+result.data[index]['email']+"><i class='far fa-envelope'></i> "+result.data[index]['email']+"</a></p><p>"+result.data[index]['department']+", "+result.data[index]['location']+"</p></div></div>";
                   
                    
                     $('#contacts').append($($contact));
                    
                }

                
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}
function filterContactsByDepartment($department){
    $.ajax({
        url: "PHP/GetContactsPerDFilter.PHP",
        type: 'GET',
        dataType: 'json',
        data:{
            department: $department
        },
        success: function(result) {
            

            if (result.status.name == "ok") {
                $("#contacts").empty()
                $x = result.len;
                for (let index = 0; index < $x; index++) {
                    $contact = " <div class='card contact' id='"+ result.data[index]['id']+"' onclick='selectedContact("+result.data[index]['id']+")'><img class='card-img-top' src='"+$imgPath+"' alt='Card image cap'><div class='card-body'> <h5 class='card-title'>"+result.data[index]['firstName']+ " " +result.data[index]['lastName'] + "<button type='button' class='btn adminControls' onclick= editContact("+result.data[index]['id']+",'"+encodeURIComponent(result.data[index]['jobTitle'])+"','"+result.data[index]['email']+"','"+encodeURIComponent(result.data[index]['department'])+"','"+result.data[index]['firstName']+ "','" +result.data[index]['lastName'] +"')><i class='fas fa-edit admin'></i></button></h5><p class='card-text'>"+result.data[index]['jobTitle']+"</p><p class='card-text'><a href=mailto:"+result.data[index]['email']+"><i class='far fa-envelope'></i> "+result.data[index]['email']+"</a></p><p>"+result.data[index]['department']+", "+result.data[index]['location']+"</p></div></div>";
                   
                    
                     $('#contacts').append($($contact));
                    
                }

                
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}
function deleteLocation($location){
    $.ajax({
        url: "PHP/DelLocation.PHP",
        type: 'POST',
        dataType: 'json',
        data:{
            location: $location
        },
        success: function(result) {
            

            if (result.status.name == "ok") {
                alert("Location deleted");
                location.reload()
            }else if(result.status.name == "Department Found"){
                $x = result.len;
                $text = "Cannot Delete Departments still attached: ";
                for (let index = 0; index < $x; index++) { 
                    $text = $text + "\n" + result.data[index]["name"];
                }
                alert($text);
                
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
    
    
    
}
function deleteDepartment($department){
    
    $.ajax({
        url: "PHP/DelDepartment.PHP",
        type: 'POST',
        dataType: 'json',
        data:{
            department: $department
        },
        success: function(result) {
            

            if (result.status.name == "ok") {
                alert("Department deleted");
                location.reload()
            }else if(result.status.name == "Contact Found"){
                $x = result.len;
                $text = "Cannot Delete Contacts still attached: ";
                for (let index = 0; index < $x; index++) { 
                    $text = $text + "\n" + result.data[index]["FirstName"] + ", " + result.data[index]["LastName"];
                }
                alert($text);
                
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
    
    
    
}
function deleteContact(){
    $contacts = window.contactsToDelete.toString();
    $.ajax({
        url: "PHP/DelContact.PHP",
        type: 'POST',
        dataType: 'json',
        data:{
            contacts: $contacts
        },
        success: function(result) {
            

            if (result.status.name == "ok") {
                alert("Contacts deleted");
                location.reload()
            }           
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
    
    
    
}
function cancelMultiContact(){
    for (let index = 0; index < window.contactsToDelete.length; index++) {
        $("#"+window.contactsToDelete[index]).removeClass("border-danger");
        
    }
    
    window.contactsToDelete = [];
    $("#deleteMultiContacts").removeClass("active");
    $("#deleteMultiContacts").addClass("inActive");
    console.log(window.contactsToDelete);
}
function selectedContact(id){
    if($("#deleteMultiContacts").hasClass("inActive")){
        $("#deleteMultiContacts").removeClass("inActive");
        $("#deleteMultiContacts").addClass("active");
    }
     
    if($("#"+id).hasClass("border-danger")){
       $("#"+id).removeClass("border-danger");
       for (let index = 0; index < window.contactsToDelete.length; index++) {
           if( window.contactsToDelete[index] === id){
               window.contactsToDelete.splice(index,1);
               
           };
       }
       if(window.contactsToDelete.length === 0){
        $("#deleteMultiContacts").removeClass("active");
        $("#deleteMultiContacts").addClass("inActive");
       }
    }else{
       $("#"+id).addClass("border-danger");
    
       window.contactsToDelete.push(id);
       
       console.log(window.contactsToDelete.toString());
  
    }
}
function editContact(id, jobTitle, email, department, firstName, lastName){
    console.log(id, jobTitle, email, department, firstName, lastName);
    $("#editContactConfirm").attr('name',id);
    $("#editFirstName").val(firstName);
    $("#editSurname").val(lastName);
    $("#editEmail").val(email);
    $("#editJobTitle").val(decodeURIComponent(jobTitle));
    $("#editContactDepartment").val(department);
    $("#editContact").modal('toggle');
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
                $('#editDepartmentLocation').append($('<option>', {
                    value: result.data[index]["id"],
                    text: result.data[index]["name"]
                }));
                $('#delLocationList').append('<li><label for='+result.data[index]["id"]+'>'+result.data[index]["name"]+'</label><input type=image class="btn" src="Images/icons8-trash-24.png" alt="delete" onclick= "deleteLocation('+result.data[index]["id"]+'); return false">'+'</input></li>');
                    
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
    }
    if ($("#deleteDropDown").hasClass("active")){
        $("#deleteDropDown").removeClass("active");
    }
    if ($("#addDropDown").hasClass("active")){
        $("#addDropDown").removeClass("active");
    }else{
        $("#addDropDown").addClass("active");
    }
});
$("#edit").click(function(){
    $("#editDropDown").prop("selectedIndex", 0);
    if ($("#addDropDown").hasClass("active")){
        $("#addDropDown").removeClass("active");
    }
    if ($("#deleteDropDown").hasClass("active")){
        $("#deleteDropDown").removeClass("active");
        
    }
    if ($("#editDropDown").hasClass("active")){
        $("#editDropDown").removeClass("active");
        
    }else{
        $("#editDropDown").addClass("active");
        
    }
});
$("#delete").click(function(){
    $("#deleteDropDown").prop("selectedIndex", 0);
    if ($("#addDropDown").hasClass("active")){
        $("#addDropDown").removeClass("active");
        
    }
    if ($("#editDropDown").hasClass("active")){
        $("#editDropDown").removeClass("active");
        
    }
    if ($("#deleteDropDown").hasClass("active")){
        $("#deleteDropDown").removeClass("active");
        
    }else{
        $("#deleteDropDown").addClass("active");
        
    }
});
$("#editDropDown").change(function(){
    $($(this).val()).modal('toggle');
})
$("#addDropDown").change(function(){
    $($(this).val()).modal('toggle');
})
$("#deleteDropDown").change(function(){
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
                alert("Department Added");
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
                alert("Contact Added");
                location.reload();
                
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
})
$("#editContactConfirm").click(function(){
    $firstName = $("#editFirstName").val();
    $department = $("#editContactDepartment").val();
    $surname = $("#editSurname").val();
    $email = $("#editEmail").val();
    $jobTitle = $("#editJobTitle").val();
    $id = $("#editContactConfirm").attr('name');
    $.ajax({
        url: "PHP/editContact.PHP",
        type: 'POST',
        dataType: 'json',
        data: {
            firstName: $firstName,
            department: $department,
            lastName: $surname,
            email: $email,
            jobTitle: $jobTitle,
            id: $id
        },
        success: function(result) {
            console.log(result)

            if (result.status.name == "ok") {
                alert("Contact edited");
                // location.reload();
                
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
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

$("#searchbar").keyup(function(){
    $search = $(this).val();
    $('.contact').each(function(){
        
        if(($(this)[0]['innerText'].toUpperCase()).includes($search.toUpperCase())){
            $(this).removeClass("inActive");
            
            
        }else{
            $(this).addClass("inActive");
        }
    });
    
})
