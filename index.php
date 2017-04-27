<!DOCTYPE html>
<html lang="en">

<head>
    <title>To do list </title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/default.css">
    <scritpt src="js/default.js"></scritpt>
   

</head>

<body>
    <?php

    ?>
        <div class="container-fluid">
            <div class="jumbotron">
                <h1>To Do List </h1>
            </div>
            <div class="container">

                <!-- Nav tabs -->
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#tasks" aria-controls="tasks" role="tab" data-toggle="tab">Home</a></li>
                    <li role="presentation"><a href="#projects" aria-controls="projects" role="tab" data-toggle="tab">Add Task</a></li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="home">
                        <?php
                        require 'db.php';
                        $db = new Db();
                        $query = "SELECT * FROM todo ORDER BY id ASC";
                        $results = $db->mysql->query($query) or die($db->mysql->error); 
                        if($results->num_rows)
                        {
                            while($row = $results->fetch_object())
                            {
                                $title = $row->title;
                                $description = $row->description;
                                $id = $row -> id; 
$data = <<<panel
<div class="panel panel-info">
  <div class="panel-heading capital-case">
    $title
      <div class="pull-right">
        <input type="hidden" id="id" name="id" value=$id>
         <a href="edit.php?id=$id">Edit</a> | 
        <a href="delete.php?id=$id">Delete</a>
       
    </div>
  </div>
  <div class="panel-body">
    $description 
  </div>
</div>
panel;
                        echo $data;             
  

                                     
                            }
                        }
                        else{
                            echo "<p>There are Zero task ! Add one now";
                        }
                    ?>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="addtask">

                        <form class="" action="" method="POST">
                            <div class="form-group ">
                                <label for="title ">Title</label>
                                <input type="text " class="form-control" name="title" id="title ">
                            </div>
                            <div class="form-group ">
                                <label for="description ">Description</label>
                                <textarea rows=4 cols=4 class="form-control " id="description "></textarea>
                            </div>
                            <input type="submit" name="addnew " value="Add New Task">
                        </form>
                    </div>

                </div>


            </div>
        </div>
</body>

</html>