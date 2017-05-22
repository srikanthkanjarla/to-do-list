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
   <!-- user styles -->
    <link rel="stylesheet" href="css/default.css">
    
</head>

<body>
    <?php //print_r($_POST); ?>
        <div class="container-fluid">
            <div class="jumbotron">
                <h1>To Do List </h1>
            </div>
            <div class="container">

                <!-- Nav tabs -->
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#tasks" aria-controls="tasks" role="tab" data-toggle="tab">Tasks</a></li>
                    <li role="presentation"><a href="#projects" aria-controls="projects" role="tab" data-toggle="tab">Projects</a></li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="tasks">
                        <div class="panel panel-info">
                            <div class="panel-heading capital-case">
                                <span id="task_count"></span>
                             </div>
                             <div class="panel-body capital-case">
                                <div class="text-primary todo_tasks"> </div> 
                                <div class="container-fluid add">
                                 <input type="text" class="form-control capital-bold" placeholder="Add Todo" id="task" name="task">
                                </div>                  
                              </div>
                              </div>
                    </div>     
                  </div>
                </div>
        </div>
        
        
         <script src="js/default.js"></script>
</body>

</html>