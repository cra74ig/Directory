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
                    
                    $imgPath = result.data[index]['image'];
                    // $imgPath="Images/blank-profile-picture-973460_640.png";
                    $contact = " <div class='card contact' id='"+ result.data[index]['id']+"' onclick='selectedContact("+result.data[index]['id']+")'><img class='card-img-top' src='"+$imgPath+"' alt='Card image cap'/><div class='card-body'> <h5 class='card-title'>"+result.data[index]['firstName']+ " " +result.data[index]['lastName'] + "<button type='button' class='btn adminControls' onclick= editContact("+result.data[index]['id']+",'"+encodeURIComponent(result.data[index]['jobTitle'])+"','"+result.data[index]['email']+"','"+encodeURIComponent(result.data[index]['departmentID'])+"','"+result.data[index]['firstName']+ "','" +result.data[index]['lastName'] +"')><i class='fas fa-edit admin'></i></button></h5><p class='card-text'>"+result.data[index]['jobTitle']+"</p><p class='card-text'><a href=mailto:"+result.data[index]['email']+"><i class='far fa-envelope'></i> "+result.data[index]['email']+"</a></p><p>"+result.data[index]['department']+", "+result.data[index]['location']+"</p></div></div>";
                   
                    
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
                locations = (document.getElementById("LocationFilter").innerHTML).replace('<option value="All" selected="">All Locations</option>','')
                $option = '<option value="All" selected>All Departments</option>';
                $("#DepartmentFilter").empty().append($option); 
                //makes sure no duplicates appear in lists or drop downs
                $('#addContactDepartment').empty();
                $('#editContactDepartment').empty();
                $('#editDepartmentList').empty();
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
                
                //make a form row
                $('#editDepartmentList').append('<div class="form-row"><div class="col-auto"><input type="text" class="form-control" value="'+result.data[index]["name"]+'" id="editDepartment'+result.data[index]["id"]+'"></input></div><div class="col-auto"><select class= "custom-select custom-select-m mb-3" id="editDepartmentLocation'+result.data[index]["id"]+'">'+locations+'</select></div><div class="col-auto"><button class="btn btn-primary" type="button" onClick=editDepartment('+result.data[index]["id"]+')>Update</button></div><div class="col-auto"><button type="button" class="btn " onClick=deleteDepartment('+result.data[index]["id"]+')><i class="fas fa-trash-alt "></i></button></div></div>');
                //sets location for drop down to be the current location for department
                $("#editDepartmentLocation"+result.data[index]["id"]).val(result.data[index]["locationID"]);
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
                $("#successfulDepartmentDeletion").modal("toggle");
                getLocations();
            }else if(result.status.name == "Department Found"){
                $x = result.len;
                $("#reasonsLocationsDelFail").empty();
                for (let index = 0; index < $x; index++) { 
                    
                    
                    $("#reasonsLocationsDelFail").append("<li>"+result.data[index]["name"]+"</li>");
                    $("#failedLocationDeletion").modal("toggle");
                }
                
                
                
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
                $("#successfulDepartmentDeletion").modal("toggle");
                GetAllDepartments();
            }else if(result.status.name == "Contact Found"){
                $x = result.len;
                
                $("#reasonsDepartmentDelFail").empty();
                for (let index = 0; index < $x; index++) { 
                    
                    
                    
                    $("#reasonsDepartmentDelFail").append("<li>"+result.data[index]["FirstName"]+" "+result.data[index]["LastName"]+"</li>");
                    $("#failedDepartmentDeletion").modal("toggle");
                }
                
                
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
                $("#successfulContactDeletion").modal("toggle");
                GetAllContacts();
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
  
    }
}
function editContact(id, jobTitle, email, department, firstName, lastName){
    //sets modal for selected contact
    $("#editContactConfirm").attr('name',id);
    $("#editFirstName").val(firstName);
    $("#editSurname").val(lastName);
    $("#editEmail").val(email);
    $("#editJobTitle").val(decodeURIComponent(jobTitle));
    $("#editContactDepartment").val(department);
    $("#editContact").modal('toggle');
    
}
function getLocations() {
    $.ajax({
        url: "PHP/GetLocations.PHP",
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            

            if (result.status.name == "ok") {
                $x = result.len;
                $option = '<option value="All" selected>All Locations</option>';
                $('#LocationFilter').empty().append($option); 
                $('#addDepartmentLocation').empty();
                $('#editLocationList').empty();
                for (let index = 0; index < $x; index++) {                    
                    $('#LocationFilter').append($('<option>', {
                    value: result.data[index]["id"],
                    text: result.data[index]["name"]
                }));
                $('#addDepartmentLocation').append($('<option>', {
                    value: result.data[index]["id"],
                    text: result.data[index]["name"]
                }));
                

                $('#editLocationList').append('<div class="form-row"><div class="col-auto"><input class="form-control" type="text" value="'+result.data[index]["name"]+'" id="editLocation'+result.data[index]["id"]+'"></input></div><div class="col-auto"><button class="btn btn-primary" type="button" onClick=editLocation('+result.data[index]["id"]+')>Update</button></div><div class="col-auto"><button class="btn" type="button" onClick=deleteLocation('+result.data[index]["id"]+')><i class="fas fa-trash-alt "></i></button></div></div></br>');
                
                }
                

                GetAllContacts();
                GetAllDepartments();
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}
//edits per SQL PHP file
$("#editContactConfirm").click(function(e){
    
    $firstName = $("#editFirstName").val();
    $department = $("#editContactDepartment").val();
    $surname = $("#editSurname").val();
    $email = $("#editEmail").val();
    $jobTitle = $("#editJobTitle").val();
    $id = $("#editContactConfirm").attr('name');
    // uploadFileEdit($id);
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

            if (result.status.name == "ok") {
                $newName = $id + ".jpg";
    
  
                var fd = new FormData();
                var files = $('#editUploadImage')[0].files;
            
                // Check file selected or not
                if(files.length > 0 ){
                    fd.append('file',files[0]);
                    $path = files[0]["name"];
                    $.ajax({
                        url: "PHP/fileUpload.PHP",
                        type: 'POST',
                        data: fd,
                        contentType: false,
                        processData: false,
                        success: function(response){
                            $path = response;
                            if(response != "0"){
                                $.ajax({
                                    url: "PHP/fileRename.PHP",
                                    type: 'POST',
                                    dataType: 'json',
                                    data: {
                                        path: $path,
                                        newName: $newName
                                    },
                                    success: function(result) {
                            
                                        if (result.status.name == "ok") {
                                            $("#successfulContactEdit").modal("toggle");
                                            $("#editContact").modal('toggle');
                                            
                                        }
                                        
                                    },
                                    error: function(jqXHR, textStatus, errorThrown) {
                                        console.log(errorThrown);
                                    }
                                });
                            }else{
                                $("#successfulContactEditNoImage").modal("toggle");
                                $("#editContact").modal('toggle');
                                
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown){
                            console.log(errorThrown);
                        }
                    });
                
                }else{
                    $("#successfulContactEdit").modal("toggle");
                    $("#editContact").modal('toggle');
                }
                    
                    
            }
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
            $("#failedContactEdit").modal("toggle");
            $("#editContact").modal('toggle');
        }
    });
    
})
function editDepartment(id){
    departmentName = $("#editDepartment"+id).val();
    locationID = $("#editDepartmentLocation"+id).val();
    $.ajax({
        url: "PHP/editDepartment.PHP",
        type: 'POST',
        dataType: 'json',
        data: {
            departmentName: departmentName,
            id: id,
            location: locationID
        },
        success: function(result) {

            if (result.status.name == "ok") {
                $("#successfulDepartmentEdit").modal("toggle");
                
                
                
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

}
function editLocation(id){
    locationName = $("#editLocation"+id).val();
    
    $.ajax({
        url: "PHP/editLocation.PHP",
        type: 'POST',
        dataType: 'json',
        data: {
            locationName: locationName,
            id: id
        },
        success: function(result) {

            if (result.status.name == "ok") {
                $("#successfulLocationEdit").modal("toggle");
                
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

}
$(document).ready(function(){
    
    
    getLocations();
    
   
});
$("#refresh").click(function(){
    GetAllContacts();
    getLocations();
    GetAllDepartments();
    
});

$("#addContactButton").click(function () {
    $("#addContact").modal('toggle');
})
$("#location").click(function () {
    getLocations();
    $("#editLocation").modal('toggle');
    
})
$("#department").click(function () {
    getLocations();
    $("#editDepartment").modal('toggle');
    
})
//adds per SQL PHP file
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
                $("#successfulLocationAdd").modal("toggle");
                getLocations();
                
            }
            else{
                $("#emptyInputsL").text(result.status.description);
                $("#FailedLocationAdd").modal("toggle");
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
                GetAllDepartments();
                
            }
            else{
                $("#emptyInputsD").text(result.status.description);
                $("#FailedDepartmentAdd").modal("toggle");
                
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
            
            
            if (result.status.name === "ok") {
                
                $id = result.data["id"];
                var fd = new FormData();
                var files = $('#addUploadImage')[0].files;
                $newName = $id + ".jpg";
                // Check file selected or not
                if(files.length > 0 ){
                fd.append('file',files[0]);
                $path = files[0]["name"];
                $.ajax({
                    url: "PHP/fileUpload.PHP",
                    type: 'POST',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function(response){
                        $path = response;
                        
                            if(response != "0"){
                                $.ajax({
                                    url: "PHP/fileRename.PHP",
                                    type: 'POST',
                                    dataType: 'json',
                                    data: {
                                        path: $path,
                                        newName: $newName
                                    },
                                    success: function(result) {
                            
                                        if (result.status.name == "ok") {
                                            $("#addContact").modal('toggle');
                                            $("#successfulContactAdd").modal("toggle");
                                            GetAllContacts();
                                        }
                                    },
                                    error: function(jqXHR, textStatus, errorThrown) {
                                        console.log(errorThrown);
                                    }
                                });
                            }else{
                                $("#addContact").modal('toggle');
                                $("#successfulContactAddNoImg").modal('toggle');
                                GetAllContacts();
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown){
                            console.log(errorThrown);
                            $("#addContact").modal('toggle');
                            $("#successfulContactAddNoImg").modal('toggle');
                            GetAllContacts();
                        }
                    });
                }else{
                    $("#addContact").modal('toggle');
                    $("#successfulContactAdd").modal("toggle");
                    GetAllContacts();
                }
            }else{
                
                $("#emptyInputsC").text(result.status.description);
                $("#FailedContactAdd").modal("toggle");
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
            $("#addContact").modal('toggle');
            $("#FailedContactAdd").modal("toggle");
        }
    });
    
})


$("#LocationFilter").change(function(){
    $location = $(this).val();
    //removes filters and retreives all contacts/ departments
    if($location === "All"){
        GetAllDepartments();
        GetAllContacts();
    }else{
        //applies filters
        updateDepartmentFilter($location);
        filterContactsByLocation($location);
    }
})

$("#DepartmentFilter").change(function(){
    $department = $(this).val();
    //removes all filters. 
    if($department === "All"){
        //makes sure if a location filter is applied it is still applied after the department filter is removed
        $location = $("#LocationFilter").val();
        if($location === "All"){
            GetAllContacts();
        }else{
            //applies location filters            
            filterContactsByLocation($location);
        }
    }
    //filters contacts for the department
    else{
        filterContactsByDepartment($department);
    }
})

$("#searchbar").keyup(function(){
    $search = $(this).val();
    $('.contact').each(function(){
        //not case sensitive. If what user types appears anywhere in the text of the contact details it will be shown. If not it will be hidden.
        if(($(this)[0]['innerText'].toUpperCase()).includes($search.toUpperCase())){
            $(this).removeClass("inActive");
        }else{
            $(this).addClass("inActive");
        }
    });
    
})
