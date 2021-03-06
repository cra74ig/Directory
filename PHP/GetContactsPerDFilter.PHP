<?php
  include("config.php");
  $link = new mysqli($host_name, $user_name, $password, $database);

  if ($link->connect_error) {
    
    $output['status']['code'] = "400";
    $output['status']['name'] = "Failed Connection";
    $output['status']['description'] = 'Failed to connect to MySQL: '. $link->connect_error ;	
    $output['data'] = [];
    
  } else {
    
    $query = 'SELECT p.departmentID, p.id, p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID) WHERE p.departmentID = '. $_REQUEST['department'].' ORDER BY  p.firstName, p.lastName, d.name, l.name';
    $result=$link->query($query);
    if($result){
        // echo '<p>success</p>';
        $data = [];
        $x = 0;
        while ($row = mysqli_fetch_assoc($result)) {
          $filename = '../Images/'.$row['id'].'.jpeg';
          
          if (file_exists($filename)) {
            // echo $filename;
            $row['image'] = $filename;
          } else {
            $row['image'] ='Images/blank-profile-picture-973460_640.png';
          }
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