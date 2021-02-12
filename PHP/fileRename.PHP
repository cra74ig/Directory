<?php
   $response = 0;
   //echo $_REQUEST["newName"];
   $path = "../Images/".$_REQUEST["path"];
   $newName = "../Images/".$_REQUEST["newName"];
   if(rename ($path, $newName)){
      $output['status']['name'] = "ok";
   }else{
      $output['status']['name'] = "fail";
      $response = $path . " " .  $newName;
      $output['status']['description'] = $response;
   }
   

  
   	
	
   header('Content-Type: application/json; charset=UTF-8');
   echo json_encode($output); 
   exit;

?>

