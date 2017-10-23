//todo object (root)
var todo ={
    date:{
        month:['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'],
        getDateString:function(date){
            let dateStr = this.month[date.getMonth()] +" " +date.getDate() +" "+ date.getFullYear('YY');
            return dateStr;
        }
    },
    filters:{
        all:'allTasks',
        active:'activeTasks',
        completed:'completedTasks'
    },
    actions:{
        addNew:'addNewTask',
        editTask:'editTitle',
        getTasks:'getTasks',
        status:'updateStatus',
        visibility:'updateVisibility',
    },
    activeFilter:[],
    tasks:{
        taskAction:function(data){
            $.ajax({
                url:'todo.php',
                method:'POST',
                data:data,
                success:function(res){                 
                    $('#addTodo').val('');
                    todo.tasks.getTasks(todo.activeFilter);   
                    console.log(res);                      
                }
            })
        },
        getTasks:function(filter){
            $.ajax({
                    url:'todo.php',
                    method:'POST',
                    data:{
                        action:filter                    
                         },
                    success:function(res){                                                                                            
                            todo.tasks.viewTasks(JSON.parse(res));                                                                    
                    }
            })
        },
        viewTasks:function(data){
            $(".items").text('') //clear all tasks before loaing
             $("#todo-count").text('Tasks Count :' + data.length);
            for(key in data){
                var date_added = new Date(data[key].date_added);
                var date_complete = new Date(data[key].date_added);
                if(data[key].status == 2){
                    $(".items").append("<li id="+data[key].id+"><span class='task-title strike'><input type='checkbox' checked> "+data[key].task+" </span> <span class='start'>Start: "+ todo.date.getDateString(date_added)+ " </span><span class='end'>Done: "+todo.date.getDateString(date_complete)+ "</span><a class='task-delete' href='#'> x</a></li>");
                }else{
                    $(".items").append("<li id="+data[key].id+"><span class='task-title'><input type='checkbox' >  "+data[key].task+" </span> <span class='start'>Start:- "+ todo.date.getDateString(date_added)+" </span><span class='end'></span> <a class='task-delete' href='#'> x</a></li>");
                }  
            }
        }
    }, //end of tasks obj
} // end of todo object
    
    //display all tasks on loading
    if(todo.activeFilter !== todo.filters.all){
      todo.tasks.getTasks(todo.filters.all);
      todo.activeFilter=todo.filters.all;
    }
    //add new task 
    function addNewTask(e){
        if(e.keyCode===13 || e.charCode === 13 || e.key ==="Enter"){                   
            var taskItem = $('#addTodo').val().trim();
            if(taskItem!==''){
                var data={
                    taskTitle:taskItem,
                    action:todo.actions.addNew
                }
            }
            todo.tasks.taskAction(data);            
        }
    }
    //display all tasks on applying filter - all
    $("#all").on('click',function(e){
        if(todo.activeFilter !== todo.filters.all){
            e.preventDefault();             
            todo.tasks.getTasks(todo.filters.all);
            todo.activeFilter=todo.filters.all;
        }
    })
    //display active tasks on applying filter - active
    $("#active").on('click',function(e){
        if(todo.activeFilter !== todo.filters.active){
            e.preventDefault();             
            todo.tasks.getTasks(todo.filters.active);
            todo.activeFilter=todo.filters.active;
        }
    })
    //display all tasks on applying filter - completed
    $("#pending").on('click',function(e){
        if(todo.activeFilter !== todo.filters.completed){
            e.preventDefault();
            todo.tasks.getTasks(todo.filters.completed);           
            todo.activeFilter=todo.filters.completed;
        }
    })
    //Update todo status on checking checkbox 
    $(".items").on('click','input:checkbox',function(e){
        var id =$(this).parent().parent().attr('id'); 
        
        $(this).next().toggleClass('strike');
        data={
            id:id,
            action:todo.actions.status
        }
        todo.tasks.taskAction(data);     
    })
    //Update task visibility to hide it from display on clicking X
    $(".items").on('click','.task-delete',function(e){
        var id =$(this).closest('li').attr('id');
         console.log($(this).closest('li').attr('id'));
        e.preventDefault();  
        data={
            id:id,
            action:todo.actions.visibility
        }
        todo.tasks.taskAction(data); 
        })
     
