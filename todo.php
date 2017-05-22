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

 //update existing todo task in database 
    function update_task($id)
    {

    }

//delete exisiting todo task from database
    function delete_task($id)
    {
        $query ="DELETE FROM todo WHERE id=$id";
        $result = $this->mysql->query($query) or die($this ->mysql->error);
        return $result;
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
                                $task_title = $row->task;
                                $id = $row -> id; 
                                $rows[$id] = $task_title;
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
?>