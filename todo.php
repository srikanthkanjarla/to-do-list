<?php
class Todo
{
    public $mysql; // to store database conneciton handle

 // connect to database
    function __construct()
    {
    $this->mysql = new mysqli('localhost','root','','to_do_list') or die('Unable to connect to Db');
    }

 //Add new todo to database
    function insert_task($task)
    {
        $status = 1;  //by default every task is unfinished (status: 1 = unfinished  2 = finished)
        $query = "INSERT INTO todo(task,status)  VALUES ('$task','$status')";
        $result = $this->mysql->query($query) or die($this->mysql->error);
        return $result;
    }

 //update existing todo task name in database 
    function update_task($data)
    {
        
        $query = "UPDATE todo SET task='$data[task_name]' WHERE id=$data[task_id]";
        $result =$this->mysql->query($query) or die($this->mysql->error);
        return $result;
    }

//delete exisiting todo task from database
    function delete_task($id)
    {
        $query ="DELETE FROM todo WHERE id=$id";
        $result = $this->mysql->query($query) or die($this ->mysql->error);
        return $result;
    }
//update exisiting todo task status in database
    function update_task_status($id)
    {
        $query = "SELECT status FROM todo WHERE id = $id";
        $result = $this->mysql->query($query) or die($db->mysql->error); 
        $task_status;
        while($row = $result->fetch_object())
                            {
                                $task_status = $row->status;
                            }
        if($task_status == 1)
        {
         $q = "UPDATE todo SET status = 2 WHERE id=$id";
        }
        elseif($task_status==2)
        {
             $q = "UPDATE todo SET status = 1 WHERE id=$id";
        }
        //$query ="DELETE FROM todo WHERE id=$id";
        $res  = $this->mysql->query($q) or die($this ->mysql->error);
        return $res;
    }

// read all todo tasks from database
    function get_tasks()
    {
                        //$db = new Db();
                        $query = "SELECT * FROM todo ORDER BY id ASC";
                        $results = $this->mysql->query($query) or die($db->mysql->error); 
                        if($results->num_rows)
                        {
                          $tasks_count = $results -> num_rows;   
                          $tasks_count==1 ?$tasks_count.="<span> Task to do </span>" :$tasks_count.= "<span> Tasks to do</span>";
                          $rows = array();
                          while($row = $results->fetch_object())
                            {
                                $task_id     = $row -> id;
                                $task_title  = $row->task;
                                $task_status = $row->status; 
                                $rows[$task_id] = ["task_name"=>$task_title,"task_status"=>$task_status];
                            }
                            return json_encode($rows);
                         }
                         else
                         {
                           return "No tasks to do"; 
                         }
    }
} // End of class

$task_obj = new Todo(); // new object to Todo class
 
// call insert_task() which Add new todo tasks to database
if(isset($_POST['query']) && $_POST['query'] == 'insert')
{
    $todo = $_POST['todo'];
    $res=$task_obj->insert_task($todo);
    if($res){
        echo "Todo added sucessfully";
    }
}

//call get_tasks() which get all tasks from database
if(isset($_POST['query']) && $_POST['query'] == 'getTasks')
{
    $res = $task_obj ->get_tasks();
    if($res)
    {
        //print_r($res);
        echo $res;
    }
}
// edit task
if(isset($_POST['query']) && $_POST['query'] =='edit')
{
    $task_name = $_POST['data_obj']['task_name'];
    $task_id = $_POST['data_obj']['id'];
    $data = ['task_id'=>$task_id,'task_name'=>$task_name];
    $res = $task_obj -> update_task($data);
    if($res)
    {
        print_r($res);
echo "Task Name Updated Successfully!";
    }
    else{
        echo "Oops something wrong Failed to update ";
    }
     
   
    
}

// delete task
if(isset($_POST['query']) && $_POST['query'] =='delete')
{
    $id = $_POST['id'];
    $res = $task_obj -> delete_task($id);
    if($res)
    {
echo "Task deleted Successfully! $id";
    }
    else{
        echo "Oops something wrong ";
    }
    
}
//status update
if(isset($_POST['query']) && $_POST['query'] =='status')
{
    $id = $_POST['id'];
    $res = $task_obj -> update_task_status($id);
    if($res)
    {
    echo "Task status updated Successfully! $res";
    }
    else{
        echo "Oops something wrong ";
    }
    
    
}
?>