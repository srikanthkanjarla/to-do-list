 var todo = {
         //date Object to get today, tomorrow, yesterday dates
         dateObj: {
             today: function() {
                 var date = new Date();
                 return this.format(date);
             },
             tomorrow: function() {
                 var date = new Date();
                 date.setDate(date.getDate() + 1);
                 return this.format(date);
             },
             yesterday: function() {
                 var date = new Date();
                 date.setDate(date.getDate() - 1);
                 return this.format(date);
             },
             //date format YYYY-MM-DD
             format: function(date) {
                 var day = (date.getDate()) < 10 ? "0" + (date.getDate()) : (date.getDate());
                 var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
                 var year = date.getFullYear();
                 return (year + "-" + month + "-" + day);
             }
         }, // END of date Object

         //setTaskList Object (container for set methods)to add new tasks and to set properties of tasks
         setTaskList: {
             addNewTask: function(taskObj) {
                 $.ajax({
                     type: "POST",
                     url: "http://srikanth/php-work/to-do-list/todo.php",
                     data: {
                         query: "insert",
                         task: taskObj.task,
                         date: taskObj.date
                     },
                     cache: false,
                     success: function(result) {
                         alert("Todo added Successfully");

                         // console.log(result);

                     }
                 });
             },
             editTaskName: function(edit_task) {
                 $.ajax({
                     type: "POST",
                     url: "http://srikanth/php-work/to-do-list/todo.php",
                     data: {
                         query: "edit",
                         data_obj: edit_task
                     },
                     cache: false,
                     success: function(response) {
                         console.log(response);
                         $(".todo-tasks").html('');
                         todo.getAllTasks();
                         alert("Todo name updated successfully");
                     }
                 });

             },
             // hide active task from listing by setting visibility = false
             setTaskHidden: function(id) {
                 var key = id.replace(/^\D+/g, '');
                 alert('Are you sure - delete Task :' + key);
                 $.ajax({
                     type: "POST",
                     url: "http://srikanth/php-work/to-do-list/todo.php",
                     data: {
                         query: "delete",
                         id: key
                     },
                     cache: false,
                     success: function(response) {
                         console.log(response);
                         todo.getAllTasks();
                     }
                 });
             },
             //set hidden task as active by setting visibility = true
             setTaskAsActive: function() {

             },
             //mark task as complete 
             setTaskAsComplete: function(key) {
                 $.ajax({
                     type: "POST",
                     url: "todo.php",
                     data: {
                         query: "status",
                         id: key
                     },
                     cache: false,
                     success: function(response) {
                         console.log(response);
                     }
                 });
             }
         }, //END of setTaskList Object

         // getTaskList Object to fetch tasks to display 
         getTaskList: {

             displayTasks: function(taskObj, viewClass) {
                 var tasks = JSON.parse(taskObj);
                 var currentDate = false;
                 for (key in tasks) {
                     var taskItem = "";
                     var taskHeading = "";
                     if (tasks.hasOwnProperty(key)) {
                         var taskId = (tasks[key].id);
                         var taskName = (tasks[key].task_name);
                         var taskStatus = (tasks[key].task_status);
                         var taskDate = (tasks[key].date_added);
                         var taskVisibility = (tasks[key].visibility);
                     }

                     if (taskStatus == 2 && taskVisibility == 2) {
                         taskItem += "<li class='text-warning'><label id='label" + taskId + "' for='" + taskId + "'>" + taskName + "</label>";

                     } else if (taskStatus == 2 && taskVisibility == 1) {
                         taskItem += "<li class='text-success'><label class='strike' id='label" + taskId + "' for='" + taskId + "'> <input type='checkbox' checked='checked' id='" + taskId + "'> </input>" + taskName + "</label>";
                     } else {
                         taskItem += "<li class='text-primary'><label id='label" + taskId + "' for='" + taskId + "'> <input type='checkbox' id='" + taskId + "'> </input>" + taskName + "</label>";
                     }
                     if (taskStatus == 1 || taskVisibility == 1) {
                         taskItem += " <span class='pull-right change'>";
                         taskItem += "<a href='#' class='edit' id='edit" + taskId + "' title='Edit'><span class='glyphicon glyphicon-pencil'></span></a> &nbsp;&nbsp;";
                         taskItem += "<a href='#' class='delete'id='delete" + taskId + "' title='Delete'><span class='glyphicon glyphicon-trash text-danger'></span></a>";
                         taskItem += "</span></li>";
                     }
                     if (taskStatus == 2 && taskVisibility == 2) {
                         taskItem += " <span class='pull-right change'>";
                         taskItem += "<a href='#' class='delete'id='delete" + taskId + "' title='restore'><span class='text-danger'> Restore</span></a></span></li>";
                     }


                     if (viewClass === 'today-tasks') {
                         $('.today-tasks').append(taskItem);
                     }
                     if (viewClass === 'yesterday-tasks') {
                         $('.yesterday-tasks').append(taskItem);
                     }
                     if (viewClass === 'tomorrow-tasks') {
                         $('.tomorrow-tasks').append(taskItem);
                     }

                     if (taskDate !== currentDate) {
                         taskHeading += "<h5 class='group-head'>" + taskDate + "</h5>";
                         currentDate = taskDate;
                     }

                     if (viewClass === 'active-tasks') {
                         $('.active-tasks').append(taskHeading + taskItem);
                     }
                     if (viewClass === 'done-tasks') {
                         $('.done-tasks').append(taskHeading + taskItem);
                     }
                     if (viewClass === 'deleted-tasks') {
                         $('.deleted-tasks').append(taskHeading + taskItem);
                     }

                 }
             },

             getTasks: function(query, date, viewClass) {
                 $.ajax({
                     type: "POST",
                     url: "http://srikanth/php-work/to-do-list/todo.php",
                     data: {
                         query: query,
                         date: date,
                     },
                     cache: false,
                     success: function(response) {
                         todo.getTaskList.displayTasks(response, viewClass);
                         console.log(typeof(response));
                     }
                 });
             },
         }, //END of getTaskList Object         
     } //END of todo object

 // calling methods  
 $(function() {

     //jqueryUI date picker 
     $("#date").datepicker({ dateFormat: 'yy-mm-dd' });

     // getTaskList methods
     todo.getTaskList.getTasks('today', todo.dateObj.today(), 'today-tasks');
     todo.getTaskList.getTasks('yesterday', todo.dateObj.yesterday(), 'yesterday-tasks');
     todo.getTaskList.getTasks('tomorrow', todo.dateObj.tomorrow(), 'tomorrow-tasks');
     todo.getTaskList.getTasks('active', todo.dateObj.tomorrow(), 'active-tasks');
     todo.getTaskList.getTasks('done', todo.dateObj.tomorrow(), 'done-tasks');
     todo.getTaskList.getTasks('deleted', todo.dateObj.tomorrow(), 'deleted-tasks');
     //todo.setTaskList.addNewTask()
     $("#add-task").on('submit', function(e) {
         e.preventDefault();
         e.defaultPrevented;
         var data = {
             task: $('#task').val(),
             date: $("#date").val()
         }
         todo.setTaskList.addNewTask(data);
         $("#add_task").reset();
         return false;
     });

     //delete task 
     $('.todo-tasks').on('click', '.delete', function(e) {
         var id = $(this).attr('id');
         // todo.deleteTask(id);
         e.preventDefault();
     });

     //Update task status
     $(".todo-tasks").on('click', 'input:checkbox', function(e) {
         var key = $(this).attr('id');
         $("#label" + key).toggleClass('strike');
         //$(this).parent().toggleClass('strike');  
         // todo.markAsComplete(key);
     });

     //edit taks name
     $('.todo_tasks').on('click', '.edit', function(e) {
         var id = $(this).attr('id');
         var key = id.replace(/^\D+/g, '');
         var label = $('#label' + key).text();
         var ele = $('#task' + key).html();
         e.preventDefault();
         //$('#task' + key).html(ele);
         $('#task' + key).html(' <input type="text" class="form-control capital-bold" id="edit-task' + key + '" name="task" value="">');
         $('#edit-task' + key).focus().val(label);
         $("#edit-task" + key).keypress(function(e) {
             if (e.which == 10 || e.which == 13) {
                 var task_name = $("#edit-task" + key).val();
                 var edit_task = {
                         task_name: task_name,
                         id: key
                     }
                     //console.log(edit_task);
                     //todo.editTaskName(edit_task);
             }
         });
     })
 });