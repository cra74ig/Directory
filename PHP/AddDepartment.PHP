<?php
$nErr=0;
$lErr=0;
if(empty($_REQUEST['name'])){
  $nErr="name is required, ";
  $output['status']['code'] = "500";
  $output['status']['name'] = "Fail";
  $output['status']['description'] = $fNameErr;
}
if(empty($_REQUEST['location'])){
  $lErr="Location is required";
  $output['status']['code'] = "500";
  $output['status']['name'] = "Fail";
  $output['status']['description'] = $output['status']['description'] . $lNameErr;
}
if($nErr === 0 && $lErr === 0){
  include("config.php");
  $link = new mysqli($host_name, $user_name, $password, $database);

  if ($link->connect_error) {
    
    $output['status']['code'] = "400";
    $output['status']['name'] = "Failed Connection";
    $output['status']['description'] = 'Failed to connect to MySQL: '. $link->connect_error ;	
    
  } else {
    
    $query = 'INSERT INTO department (name, locationID) VALUES("' . $_REQUEST['name'] . '","' . $_REQUEST['location'] . '")';
    $result=$link->query($query);
    if($result){
        $output['status']['code'] = "200";
        $output['status']['name'] = "ok";
        $output['status']['description'] = "success";
        $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
        

        header('Content-Type: application/json; charset=UTF-8');
        
        mysqli_close($link);

         

    }else{
      
      $output['status']['code'] = "400";
		  $output['status']['name'] = "executed";
		  $output['status']['description'] = "Failed Query";	
		  $output['data'] = [];

		mysqli_close($link);
    }
  }
}
  echo json_encode($output); 
?>