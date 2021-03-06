<?php
  include("config.php");

  $link = new mysqli($host_name, $user_name, $password, $database);

  if ($link->connect_error) {
    
    $output['status']['code'] = "400";
    $output['status']['name'] = "Failed Connection";
    $output['status']['description'] = 'Failed to connect to MySQL: '. $link->connect_error ;	
    $output['data'] = [];
    
  } else {
    
    $query = 'SELECT id, name FROM location ORDER BY name';
    $result=$link->query($query);
    if($result){
        // echo '<p>success</p>';
        $data = [];
        $x = 0;
        while ($row = mysqli_fetch_assoc($result)) {
      
          array_push($data, $row);
          $x += 1;
        }
        $output['status']['code'] = "200";
        $output['status']['name'] = "ok";
        $output['status']['description'] = "success";
        $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
        $output['data'] = $data;
        $output['len'] = $x;

        header('Content-Type: application/json; charset=UTF-8');
        
        mysqli_close($link);

         

    }else{
      
      $output['status']['code'] = "400";
		  $output['status']['name'] = "executed";
		  $output['status']['description'] = $result;	
		  $output['data'] = [];

		mysqli_close($link);
    }
  }
  echo json_encode($output); 
?>