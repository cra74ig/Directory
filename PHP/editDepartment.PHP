<?php
  include("config.php");

  $link = new mysqli($host_name, $user_name, $password, $database);

  if ($link->connect_error) {
    
    $output['status']['code'] = "400";
    $output['status']['name'] = "Failed Connection";
    $output['status']['description'] = 'Failed to connect to MySQL: '. $link->connect_error ;	
    $output['data'] = [];
    
  } else {
    
    
          $query = 'UPDATE `department` SET `name` = "'.$_REQUEST["departmentName"].'", `locationID` = "'.$_REQUEST["location"].'" WHERE `department`.`id` = '.$_REQUEST["id"].';';
          $result=$link->query($query);
          if($result){
            $output['status']['name'] = "ok";
            $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
            $output['query'] = $query;
            mysqli_close($link);
          }else{
            $output['status']['code'] = "400";
            $output['status']['name'] = "executed edit".$query;
            $output['status']['description'] = $result;	
            $output['data'] = [];
            
            mysqli_close($link);
          }
        }
  echo json_encode($output); 
?>