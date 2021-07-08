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

const onSubmitHandler = (event) =>{
    const name = document.getElementById("name").value;
    const deadline = document.getElementById("deadline").value;
    const formEditor = document.getElementById("editForm");
    if(formEditor.attachEvent){
        form.attachEvent("submit",event.preventDefault())
    }
    
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