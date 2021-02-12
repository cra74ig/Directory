<?php
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
		  $output['status']['description'] = "Failed Query";	
		  $output['data'] = [];

		mysqli_close($query);
    }
  }
  echo json_encode($output); 
?>