 $(function() {
     var todo = {
             getAllTasks: function() {
                 $.ajax({
                     type: "POST",
                     url: "http://srikanth/php_work/to_do_list/todo.php",
                     data: {
                         query: "getTasks"
                     },
                     cache: false,
                     success: function(result) {
                         todo.displayAllTasks(result);
                     }
                 });
             },
             displayAllTasks: function(tasks) {
                 var all_tasks = JSON.parse(tasks);
                 var tasks_count = (Object.keys(all_tasks).length);
                 $('#task_count').text("Total Tasks :" + tasks_count);

                 for (var task_key in all_tasks) {
                     var task_name = (all_tasks[task_key].task_name);
                     var task_status = (all_tasks[task_key].task_status);
                     //console.log(task_status);
                     var tasks_out;
                     if (task_status == 2) {
                         tasks_out = "<p id='task" + task_key + "'><input type='checkbox' checked id='status" + task_key + "'> <label class='strike' id='label" + task_key + "' for='task" + task_key + "' title='Finished Task'>" + task_name + "</label></input>"
                     } else {
                         tasks_out = "<p id='task" + task_key + "'><input type='checkbox' id='status" + task_key + "'> <label id='label" + task_key + "' for='task" + task_key + "' title='Finish'>" + task_name + "</label></input>"
                     }

                     tasks_out += " <span  class='pull-right change'>";
                     tasks_out += "<a href='#' class='edit' id='edit" + task_key + "' title='Edit'><span class='glyphicon glyphicon-pencil'></span></a> &nbsp;&nbsp;";
                     tasks_out += "<a href='#' class='delete'id='delete" + task_key + "' title='Delete'><span class='glyphicon glyphicon-remove'></span></a>";
                     tasks_out += "</span></p>";

                     $('.todo_tasks').append(tasks_out);
                 }
             },
             addNewTask: function(task) {
                 //var task = $('.add input').val();
                 $.ajax({
                     type: "POST",
                     url: "http://srikanth/php_work/to_do_list/todo.php",
                     data: {
                         query: "insert",
                         todo: task
                     },
                     cache: false,
                     success: function(result) {
                         $(".add input").val('');
                         $(".todo_tasks").html('');
                         todo.getAllTasks();
                     }
                 });
             },

             editTaskName: function(edit_task) {

                 //var task = $("#edit-task" + id).val();
                 //var edit_task = $("#edit-task" + id).val();
                 console.log(edit_task);
                 $.ajax({
                     type: "POST",
                     url: "http://srikanth/php_work/to_do_list/todo.php",
                     data: {
                         query: "edit",
                         data_obj: edit_task
                     },
                     cache: false,
                     success: function(response) {
                         console.log(response);
                         $(".todo_tasks").html('');
                         todo.getAllTasks();
                     }
                 });

             },

             deleteTask: function(id) {
                 var key = id.replace(/^\D+/g, '');
                 alert('Are you sure - delete Task :' + key);
                 $.ajax({
                     type: "POST",
                     url: "http://srikanth/php_work/to_do_list/todo.php",
                     data: {
                         query: "delete",
                         id: key
                     },
                     cache: false,
                     success: function(response) {
                         console.log(response);
                         $(".todo_tasks").html('');
                         todo.getAllTasks();
                     }
                 });
             },
             updateTaskStatus: function(key) {
                 $.ajax({
                     type: "POST",
                     url: "http://srikanth/php_work/to_do_list/todo.php",
                     data: {
                         query: "status",
                         id: key
                     },
                     cache: false,
                     success: function(response) {
                         console.log(response);
                         $(".todo_tasks").html('');
                         todo.getAllTasks();
                     }
                 });
             }
         } //end of todo object


     // calling functions 

     // 1. Get tasks on initial page load

     todo.getAllTasks();

     // 2. Add New Task on pressing Enter key
     $(".add").find('input').keypress(function(e) {
         if (e.which == 10 || e.which == 13) {
             var task = $('.add input').val();
             todo.addNewTask(task);
         }
     });



     //edit taks name
     $('.todo_tasks').on('click', '.edit', function() {
         var id = $(this).attr('id');
         var key = id.replace(/^\D+/g, '');
         var label = $('#label' + key).text();
         var ele = $('#task' + key).html();
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
                 todo.editTaskName(edit_task);
             }
         });


     })

     //delete task 
     $('.todo_tasks').on('click', '.delete', function() {
         var id = $(this).attr('id');
         todo.deleteTask(id);
     });

     //Update task status
     $(".todo_tasks").on('click', 'input:checkbox', function() {
         //alert('hey! you checked a checkbox');
         var id = $(this).attr('id');
         var key = id.replace(/^\D+/g, '');
         todo.updateTaskStatus(key);
     });
 });