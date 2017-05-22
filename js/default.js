 $(function() {
     var todo = {
             getTasks: function() {
                 $.ajax({
                     type: "POST",
                     url: "http://srikanth/php_work/to_do_list/todo.php",
                     data: {
                         query: "getTasks"
                     },
                     cache: false,
                     success: function(result) {
                         todo.displayTasks(result);
                     }
                 });
             },
             displayTasks: function(tasks) {
                 var all_tasks = JSON.parse(tasks);
                 var tasks_count = (Object.keys(all_tasks).length);
                 $('#task_count').text("Total Tasks :" + tasks_count);
                 for (var task_key in all_tasks) {
                     var tasks_out;
                     tasks_out = "<p id='task" + task_key + "'><input type='checkbox' id='status" + task_key + "'> <label id='label" + task_key + "' for='task" + task_key + "' title='Finished'>" + all_tasks[task_key] + "</label></input>"
                     tasks_out += " <span  class='pull-right change'>";
                     tasks_out += "<a href='#' class='edit' id='edit" + task_key + "' title='Edit'><span class='glyphicon glyphicon-pencil'></span></a> &nbsp;&nbsp;";
                     tasks_out += "<a href='#' class='delete'id='delete" + task_key + "' title='Delete'><span class='glyphicon glyphicon-remove'></span></a>";
                     tasks_out += "</span></p>";
                     $('.todo_tasks').append(tasks_out);
                 }
             },
             addTask: function() {
                 var task = $('.add input').val();
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
                         todo.getTasks();
                     }
                 });
             },

             editTask: function(id) {
                 //console.log(id);
                 // alert(id);
                 $(".todo_tasks").html('');
                 todo.getTasks();
                 var key = id.replace(/^\D+/g, '');
                 var label = $('#label' + key).text();
                 //console.log(label);

                 $('#task' + key).html(' <input type="text" class="form-control" id="task" name="task" value=" ' + label + '">');

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
                         todo.getTasks();
                     }
                 });
             }
         } //end of todo object


     // calling functions 

     // 1. Get tasks on initial page load

     todo.getTasks();

     // 2. Add New Task on pressing Enter key
     $(".add").find('input').keypress(function(e) {
         if (e.which == 10 || e.which == 13) {
             todo.addTask();
         }
     });



     //edit taks name
     $('.todo_tasks').on('click', '.edit', function() {
         var id = $(this).attr('id');
         todo.editTask(id);
     })

     //delete task 
     $('.todo_tasks').on('click', '.delete', function() {
         var id = $(this).attr('id');
         todo.deleteTask(id);
     });
 });