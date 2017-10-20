//todo object (root)
var todo ={
    filters:{
        all:'allTasks',
        active:'activeTasks',
        completed:'completedTasks'
    },
    activeFilter:[],

    //tasks object -> methods -> addNewTasks, getTasks, viewTasks
    tasks:{
        addNewTask : function(e){
            if(e.keyCode===13 || e.charCode === 13 || e.key ==="Enter"){                   
                var taskItem = $('#addTodo').val().trim();
                if(taskItem!==''){
                    var data={
                        taskTitle:taskItem,
                        action:'addNewTask'
                    }
                    
                    $.ajax({
                        url:'todo.php',
                        method:'POST',
                        data:data,
                        success:function(res){                 
                            $(".items").text('');
                            $('#addTodo').val('');
                            todo.tasks.getTasks(todo.activeFilter);                         
                        }
                    })
                   
                }else{
                     alert('Please Enter task title');
                }      
                
            }    
        },
        getTasks:function(filter){
            $.ajax({
                    url:'todo.php',
                    method:'POST',
                    data:{
                        action:filter                    
                         },
                    success:function(res){   
                            $(".items").text('');   //clear tasks    
                                                             
                            todo.tasks.viewTasks(JSON.parse(res));
                                                                    
                    }
            })
            
        },
        viewTasks:function(data){
             $("#todo-count").text('Tasks Count :' + data.length);
            for(key in data){
                if(data[key].status == 2){
                    $(".items").append("<li id="+data[key].id+"><input type='checkbox' checked><span class='strike'>"+data[key].task+"</span> <a class='task-delete' href='#'>x</a></li>");
                }else{
                    $(".items").append("<li id="+data[key].id+"><input type='checkbox' ><span> <span class='inner'>"+data[key].task+"</span></span><a class='task-delete' href='#'>x</a></li>");
                }
                
              
            }
        }
    }, //end of tasks obj
    
    //update object->methods-> taskStatus(), taskVisibility()
    update:{ 
        taskStatus:function(key){
            $.ajax({
                type: "POST",
                url: "todo.php",
                data: {
                  action: "updateStatus",
                  id: key
                },
                cache: false,
                success: function(response) {
                  console.log("status changed sucessfully");
                }
              });
        },
        taskVisibility:function(key){
            $.ajax({
                type: "POST",
                url: "todo.php",
                data: {
                  action: "updateVisibility",
                  id: key
                },
                cache: false,
                success: function(response) {
                    console.log("visibility changed sucessfully");
                }
              });
        }
    }
    } // end of todo object
    
    //display all tasks on loading
    if(todo.activeFilter !== todo.filters.all){
      todo.tasks.getTasks(todo.filters.all);
      todo.activeFilter=todo.filters.all;
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
    
    //Update todo status on checking checkbox with 0/1 ( 0:Active | 1:Completed)
    $(".items").on('click','input:checkbox',function(e){
        var id =$(this).parent().attr('id'); 
        $(this).next().toggleClass('strike');
        todo.update.taskStatus(id);
        todo.tasks.getTasks(todo.activeFilter);        
      
    })
    
    //Update task visibility to hide it from display
    $(".items").on('click','.task-delete',function(e){
        var id =$(this).parent().attr('id');
        e.preventDefault();     
       todo.update.taskVisibility(id);
        todo.tasks.getTasks(todo.activeFilter);
        })
    
    
    //video clip toggle 
    function toggleVid(event){
        event.preventDefault();
    $('#vid').toggle();
    if($('#toggle-label').text()=='show'){
        $('#toggle-label').text('hide');
    }else{
        $('#toggle-label').text('show');
    }
    
    }
    var vid = document.getElementById("vid");
    vid.playbackRate = 0.4; 
       