<?php
   $response = 0;
   echo $_REQUEST["newName"];
   if(rename ($_REQUEST["path"], $_REQUEST["newName"])){
    $response = 1;
   }
   $response = $_REQUEST["path"] .  $_REQUEST["newName"];
    echo $response;
   exit;

?>

