<?php
$fNameErr=0;
$lNameErr=0;
$jTErr=0;
$dErr=0;
$eErr=0;
if(empty($_REQUEST['firstName'])){
  $fNameErr="First name is required, ";
  $output['status']['code'] = "500";
  $output['status']['name'] = "Fail";
  $output['status']['description'] = $fNameErr;
}
if(empty($_REQUEST['surname'])){
  $lNameErr="Last name is required, ";
  $output['status']['code'] = "500";
  $output['status']['name'] = "Fail";
  $output['status']['description'] = $output['status']['description'] . $lNameErr;
}
if(empty($_REQUEST['jobTitle'])){
  $jTErr="Job Title is required, ";
  $output['status']['code'] = "500";
  $output['status']['name'] = "Fail";
  $output['status']['description'] = $output['status']['description'] . $jTErr;
}
if(empty($_REQUEST['department'])){
  $dErr="Department is required, ";
  $output['status']['code'] = "500";
  $output['status']['name'] = "Fail";
  $output['status']['description'] = $output['status']['description'] . $dErr;
}
if(empty($_REQUEST['email'])){
  $eErr="Department is required";
  $output['status']['code'] = "500";
  $output['status']['name'] = "Fail";
  $output['status']['description'] = $output['status']['description'] . $eErr;
}
if($fNameErr === 0 && $lNameErr === 0 && $jTErr === 0 && $dErr === 0 && $eErr === 0){
  include("config.php");
  $link = new mysqli($host_name, $user_name, $password, $database);

  if ($link->connect_error) {
    
    $output['status']['code'] = "400";
    $output['status']['name'] = "Failed Connection";
    $output['status']['description'] = 'Failed to connect to MySQL: '. $link->connect_error ;	
    
  } else {
    
    $query = 'INSERT INTO personnel (firstName, lastName, jobTitle, email, departmentID) VALUES("' . $_REQUEST['firstName'] . '","' . $_REQUEST['surname'] . '","' . $_REQUEST['jobTitle'] . '","' . $_REQUEST['email'] . '","' . $_REQUEST['department'] . '")';
    
    if($link->query($query)){
        $last_id = $link->insert_id;
        $output['status']['code'] = "200";
        $output['status']['name'] = "ok";
        $output['status']['description'] = "success";
        $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
        $output['data']['id'] = $last_id;

        header('Content-Type: application/json; charset=UTF-8');
        
        mysqli_close($link);

         

    }else{
      
      $output['status']['code'] = "400";
		  $output['status']['name'] = "executed";
		  $output['status']['description'] = "Failed To Create Contact";	
		  $output['data'] = [];

		mysqli_close($query);
    }
  }
}
  echo json_encode($output); 
?>