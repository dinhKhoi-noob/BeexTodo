const uri = "http://localhost:5000/api/"


const changeStatus = async(id) => {
    const getTodoResponse = await fetch(uri+id);
    const res = await getTodoResponse.json();
    const {name,status,deadline} = res.todo;
    const newContent = {
        name,
        status:!status,
        deadline
    }
    if(res.success){
        const response = await fetch(uri+id,{
            method:"PATCH",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newContent)
        })
        response.json()
        .then((res)=>{
            if(res.success)
            {
                alert("Updated")
                window.location.reload();
            }
            else
                alert("Not found this task")
        })
        .catch((err)=>{
            alert("Something was wrong")
            console.error(err);
        })
    }
}
const toggleTaskEditor = async(id) =>{
    try {
        const response = await fetch(uri+id);
        response.json().then((res)=>{
            if(res.success){
                document.getElementById("name").value = res.todo.name;
                document.getElementById("deadline").value = res.todo.deadline;
                status = res.todo.status;
                const formEditor = document.getElementById("editForm");
                formEditor.addEventListener("submit",async(event)=>{
                    event.preventDefault();
                    const name = document.getElementById("name").value;
                    const deadline = document.getElementById("deadline").value;
                    const newTaskContent = {
                        name,
                        deadline,
                        status
                    }
                    const snapshot = await fetch(uri+id,{
                        method:"PATCH",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newTaskContent)
                    })
                    snapshot.json()
                    .then(res=>{
                        if(res.success)
                        {
                            document.getElementById("sbmEditor").setAttribute("data-dismiss","modal");
                            alert("Updated");
                            window.location.reload();
                        }
                    })
                    .catch(error=>{
                        alert("Something was wrong");
                        document.getElementById("sbmEditor").setAttribute("data-dismiss","modal");
                        window.location.reload();
                    })
                })
            }
        });   
    } 
    catch (error) 
    {
        console.error(error);
    }
}

const deleteTask = async id => {
    const response = await fetch(uri+id,{
        method:"DELETE",
    })
    response.json()
    .then(res=>{
        if(res.success)
        {
            alert("Deleted");
            window.location.reload();
        }
    })
    .catch(err=>{
        alert("Something was wrong");
        window.location.reload();
    })
}


const addNewTask = async() => {
    const formToggled = document.getElementById("add-new-form");
    formToggled.addEventListener("submit",async(event)=>{
        event.preventDefault();
        const name = document.getElementById("new-name").value;
        const deadline = document.getElementById("new-deadline").value;
        const newPost = {
            name,
            deadline,
            status:false
        }
        const response = await fetch(uri,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newPost)
        })
        response.json()
        .then(res=>{
            if(res.success)
            {
                alert("Added new task");
                document.getElementById("new-name").value = "";
                document.getElementById("new-deadline").value = "";
                document.getElementById("sbm-add-new").setAttribute("data-dismiss","modal");
                window.location.reload();
            }
        })
        .catch(err=>{
            alert("Something was wrong");
            document.getElementById("new-name").value = "";
            document.getElementById("new-deadline").value = "";
            document.getElementById("sbm-add-new").setAttribute("data-dismiss","modal");
            window.location.reload();
        })
    })
}

const changeContent=async(id,name,status,deadline)=>{
    const response = await fetch(uri+id,{
        method:"PATCH",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name,status,deadline
        })
    })
    response.json()
    .then(res=>{
        if(res.success)
            alert("Updated");
        else
            alert("Not found this task");
    })
    .catch(err=>{
        console.error(err);
        alert("Something was wrong")
    })
}