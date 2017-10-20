<?php
class Todo{
/*
-- connect to database
-- add items to databse
-- get items from database
-- update status
-- update visibility
*/

  private $user='root';
  private $host='localhost';
  private $password='sri';
  private $db='todo_db';  
  private $con;
// connect to database
function __construct(){
    $this->con = new mysqli($this->host,$this->user,$this->password,$this->db);  
    if(!$this->con->connect_error){
       // echo "connection established";
    }
    else{
        exit('Failed to connect');
    }
}

private function sanitize_input($data){
    $data = trim($data);
    $data=$this->con->escape_string($data);
    return $data;
}

//add items to todo table in todo_db database

public function addNewTodo($data){
  $data = $this->sanitize_input($data);
  $sql = "INSERT INTO todo (task,visibility,status) VALUES ('$data',1,1)";
  $res = $this->con->query($sql);
  if(!$res){
      die($this->con->error);
  }
  else{
    echo "task added successfully" ;
  }
}

public function updateTodoStatus($id)
{
    $query = "SELECT status FROM todo WHERE id = $id";
    $result = $this->con->query($query) or die($this->con->error); 
    $taskStatus='';
    while($row = $result->fetch_object())
      {
      $taskStatus = $row->status;
      }
      $taskStatus = $taskStatus == 1?2:1;
      $q = "UPDATE todo SET status = '$taskStatus' WHERE id=$id";                            
      $res  = $this->con->query($q) or die($this ->con->error);
     // return $res;
     return "status".$taskStatus."id-".$id;
}

//get items from database
public function getTodos($filter){
    /*
    switch($filter)
    {
        case "all":
        $sql = "SELECT * FROM todo  ORDER BY id DESC";
        break;
        case "active":
        $sql = "SELECT * FROM todo WHERE status=0 ORDER BY id DESC";
        break;
        case "completed":
        $sql = "SELECT * FROM todo WHERE status=1 ORDER BY id DESC";
        break;
    }*/
    if($filter == 'all'){
        $sql = "SELECT * FROM todo  WHERE visibility=1 ORDER BY id DESC";
    }
    if($filter == 'active'){
        $sql = "SELECT * FROM todo WHERE status=1 AND visibility=1 ORDER BY id DESC";   
    }
    if($filter == 'completed'){
        $sql = "SELECT * FROM todo WHERE status=2 AND visibility=1 ORDER BY id DESC";
    }
$res = $this->con->query($sql);
$tasksArr=array();
if($res){
    while ($row = $res->fetch_assoc()) {
    $tasksArr[]=$row;
    }
    return json_encode($tasksArr);
} 
 
}

 

//update todo task visibility
public function updateTodoVisibility($id){
    $query = "SELECT visibility FROM todo WHERE id = $id";
    $result = $this->con->query($query) or die($this->con->error); 
    $taskStatus='';
    while($row = $result->fetch_object())
      {
        $taskVisibility = $row->visibility;
      }
      $taskVisibility = $taskVisibility == 1?2:1;
      $visb = "UPDATE todo SET visibility = '$taskVisibility' WHERE id=$id";                            
      $visbRes  = $this->con->query($visb) or die($this ->con->error);
     // return $res;
     return "task deleted". $id;
}
}


$obj = new Todo();
 
if(isset($_POST["action"]) && $_POST["action"] == 'addNewTask'){
    //echo "Task Added successfully";
    
    $obj->addNewTodo($_POST['taskTitle']);
}

if(isset($_POST["action"]) && $_POST["action"] == 'allTasks'){
    $allTAsks = $obj->getTodos('all');
    echo $allTAsks;
}

if(isset($_POST["action"]) && $_POST["action"] == 'activeTasks'){
    $allTAsks = $obj->getTodos('active');
    echo $allTAsks;
     

}

if(isset($_POST["action"]) && $_POST["action"] == 'completedTasks'){
    $allTAsks = $obj->getTodos('completed');
    echo $allTAsks;
}

if(isset($_POST["action"]) && $_POST["action"] == 'updateStatus'){
    //echo "Task Added successfully";
    $id=trim($_POST['id']);
    if(filter_var($id, FILTER_VALIDATE_INT)){
       $resp = $obj->updateTodoStatus($id);
       print_r($resp);
    }
    else{
        echo "incorrect task id";
    }
    
}
if(isset($_POST["action"]) && $_POST["action"] == 'updateVisibility'){
    //echo "Task Added successfully";
    $id=trim($_POST['id']);
    if(filter_var($id, FILTER_VALIDATE_INT)){
       $resp = $obj->updateTodoVisibility($id);
       print_r($resp);
    }
    else{
        echo "incorrect task id";
    }
    
}

