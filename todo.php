<?php
class Todo
{
    private $mysql; // to store database conneciton handle

 // connect to database
    function __construct()
    {
    $this->mysql = new mysqli('localhost','root','','to_do_list') or die('Unable to connect to Db');
    }

 //Add new todo to database
    function addNewTodo($data)
    {   
        if(!empty($data[0]) && !empty($data[1]))
        {
        $query = "INSERT INTO todo(task,date_added)  VALUES ('$data[0]','$data[1]')";
        $result = $this->mysql->query($query) or die($this->mysql->error);
        return $result;
        }
    }

 //update existing todo task name in database 
    function updateTodoName($data)
    {
        $query = "UPDATE todo SET task='$data[task_name]' WHERE id=$data[task_id]";
        $result =$this->mysql->query($query) or die($this->mysql->error);
        return $result;
    }

//delete exisiting todo task visibility hide/show
    function updateTodoVisibility($id)
    {
         $query = "SELECT visibility FROM todo WHERE id = $id";
        $result = $this->mysql->query($query) or die($this->mysql->error); 
        $visibility='';
        while($row = $result->fetch_object())
          {
          $visibility = $row->visibility;
          }
          $visibility = $visibility == 1?2:1;
          $q = "UPDATE todo SET visibility = $visibility AND status=2 WHERE id=$id";                            
          $res  = $this->mysql->query($q) or die($this ->mysql->error);
          return $res;
    }
//update exisiting todo task status finished/unfinished
    function updateTodoStatus($id)
    {
        $query = "SELECT status FROM todo WHERE id = $id";
        $result = $this->mysql->query($query) or die($this->mysql->error); 
        $taskStatus;
        while($row = $result->fetch_object())
          {
          $taskStatus = $row->status;
          }
          $taskStatus = $taskStatus == 1?2:1;
          $q = "UPDATE todo SET status = $taskStatus WHERE id=$id";                            
          $res  = $this->mysql->query($q) or die($this ->mysql->error);
          return $res;
    }

//get tasks from DB based on query
 
    function getAllTasks($query)
    {                                                                  
                        $results = $this->mysql->query($query) or die($this->mysql->error); 
                        if($results->num_rows)
                        {
                          $tasks_count = $results -> num_rows;   
                          $tasks_count==1 ?$tasks_count.="<span> Task to do </span>" :$tasks_count.= "<span> Tasks to do</span>";
                         $rows =[];                          
                          while($row = $results->fetch_object())
                            {                                
                                $task_id     = $row -> id;
                                $task_title  = $row->task;
                                $task_status = $row->status;
								$task_added_on=$row->date_added;
                                $task_visibility=$row->visibility;
                                $rows[$task_id] = ["id"=>$task_id,"task_name"=>$task_title,"task_status"=>$task_status,"date_added"=>$task_added_on,"visibility"=>$task_visibility];
                            }    
                            return json_encode($rows);
                         }
                         //else
                         //{
                          //return "No tasks to do! (:-|)"; 
                         //}
    }      
} // End of class

$task_obj = new Todo(); // new object to Todo class
 
// call insert_task() which Add new todo tasks to database
if(isset($_POST['query']) && $_POST['query'] == 'insert')
{
    $task = $_POST['task'];
    $date = $_POST['date'];
    $data=[$task,$date];
    $res=$task_obj->addNewTodo($data);
    if($res){
        echo "Todo added sucessfully "; 
    }
}

//get all active tasks 
if(isset($_POST['query']) && $_POST['query'] == 'active')
{
    //$date = $_POST['date'];
     $query ="SELECT * FROM todo WHERE status = 1 ORDER BY id DESC" ;
   $res = $task_obj ->getAllTasks($query);
    if($res)
    {
       //print_r($res);
        echo $res;        
    }
}
 
//get all finished (done) tasks 
if(isset($_POST['query']) && $_POST['query'] == 'done')
{
    //$date = $_POST['date'];
     $query ="SELECT * FROM todo WHERE status = 2 AND  visibility = 1 ORDER BY id DESC" ;
   $res = $task_obj ->getAllTasks($query);
    if($res)
    {        
        echo $res;        
    }
}

//get all deleted (not visible) tasks 
if(isset($_POST['query']) && $_POST['query'] == 'deleted')
{
    //$date = $_POST['date'];
     $query ="SELECT * FROM todo WHERE visibility = 2 ORDER BY id DESC" ;
   $res = $task_obj ->getAllTasks($query);
    if($res)
    {        
        echo $res;        
    }
}

//get tasks of today  
if(isset($_POST['query']) && $_POST['query'] == 'today')
{
    $date = $_POST['date'];
     $query ="SELECT * FROM todo WHERE date_added = '$date' ORDER BY id DESC" ;
    $res = $task_obj ->getAllTasks($query);
    if($res)
    {
        echo $res;   
    }
}

//get all tasks of tomorrow
if(isset($_POST['query']) && $_POST['query'] == 'tomorrow')
{
    $date = $_POST['date'];
     $query ="SELECT * FROM todo WHERE date_added = '$date' ORDER BY id DESC" ;
    $res = $task_obj ->getAllTasks($query);
    if($res)
    {
        echo $res;   
    }
}

//get all tasks of yesterday
if(isset($_POST['query']) && $_POST['query'] == 'yesterday')
{
    $date = $_POST['date'];
     $query ="SELECT * FROM todo WHERE date_added = '$date' ORDER BY id DESC" ;
    $res = $task_obj ->getAllTasks($query);
    if($res)
    {
        echo $res;   
    }
}

// edit task
if(isset($_POST['query']) && $_POST['query'] =='edit')
{
    $task_name = $_POST['data_obj']['task_name'];
    $task_id = $_POST['data_obj']['id'];
    $data = ['task_id'=>$task_id,'task_name'=>$task_name];
    $res = $task_obj -> updateTodoName($data);
    if($res)
    {
        //print_r($res);
echo "Task Name Updated Successfully!";
    }/*
    else{
        echo "Oops something wrong Failed to update ";
    }*/   
}

// delete task
if(isset($_POST['query']) && $_POST['query'] =='delete')
{
    $id = $_POST['id'];
    $res = $task_obj -> updateTodoVisibility($id);
    if($res)
    {
echo "Task deleted Successfully! $id";
    }/*
    else{
        echo "Oops something wrong ";
    }*/
}
//status update
if(isset($_POST['query']) && $_POST['query'] =='status')
{
    $id = $_POST['id'];
    $res = $task_obj -> updateTodoStatus($id);
    if($res)
    {
    echo "Task status updated Successfully! $res";
    }/*
    else{
        echo "Oops something wrong ";
    }*/   
} 
?>