<?php
  include("config.php");

  $link = new mysqli($host_name, $user_name, $password, $database);

  if ($link->connect_error) {
    
    $output['status']['code'] = "400";
    $output['status']['name'] = "Failed Connection";
    $output['status']['description'] = 'Failed to connect to MySQL: '. $link->connect_error ;	
    $output['data'] = [];
    
  } else {
    
    $query = 'SELECT id, name, locationID  FROM `department` WHERE `locationID` = '. $_REQUEST['location'] .' ORDER BY name';
    $result=$link->query($query);
    if($result){
        // echo '<p>success</p>';
        $data = [];
        $x = 0;
        while ($row = mysqli_fetch_assoc($result)) {
      
          array_push($data, $row);
          $x += 1;
        }
        if($x>0){
          $output['status']['name'] = "Department Found";
          $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
          $output['data'] = $data;
          $output['len'] = $x;

          header('Content-Type: application/json; charset=UTF-8');
          
          mysqli_close($link);
        }else{
          $query = 'DELETE FROM `location` WHERE `location`.`id` = '. $_REQUEST['location'];
          $result=$link->query($query);
          if($result){
            $output['status']['name'] = "ok";
            $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
          }else{
            $output['status']['code'] = "400";
            $output['status']['name'] = "executed Delete";
            $output['status']['description'] = $result;	
            $output['data'] = [];
          }
        }

         

    }else{
      
      $output['status']['code'] = "400";
		  $output['status']['name'] = "executed check";
		  $output['status']['description'] = $result;	
		  $output['data'] = [];

		mysqli_close($link);
    }
  }
  echo json_encode($output); 
?>