import React, { useState, useEffect } from "react";

const api= "https://assets.breatheco.de/apis/fake/todos/user/Keialex1702"


const ToDo = () => {

  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({label: "",done: false });
  const [isShown, setIsShown] =useState(-1);
  
 
  const getTask = async () =>{
    try {
      const response= await fetch(api, {
        headers: {"Content-Type" : "application/json"}
      })
      const data= await response.json()
      setTaskList(data)
    } catch (error) {
      console.log("error", error)
    }
  }

  const addTask = async (data)=>{
    try {
      console.log(data)
      const response= await fetch(api,{
        headers: {"Content-Type" : "application/json"},
        method: "PUT",
        body: JSON.stringify(data)
      })
      getTask()
    } catch (error) {
      
    }
  }

  const deleteTask = async (indexid) =>{
    const newListTask= taskList.filter((tarea , index)=> (index != indexid))
    console.log(newListTask)
    try {
      const response = await fetch(api,{
        headers: {"Content-Type" : "application/json"},
        method: "PUT",
        body: JSON.stringify(newListTask)
      })
      getTask()
    } catch (error) {
      
    }
  }

  const createUser = async() =>{
    try {
      const response = await fetch(api,{
        headers: {"Content-Type" : "application/json"},
        method: "POST",
        body: JSON.stringify([])
      })
      getTask()
    } catch (error) {
      
    }
  }

  const deleteAllTask = async () =>{
    try {
      const response = await fetch(api,{
        headers: {"Content-Type" : "application/json"},
        method: "DELETE"
      })
      createUser()
    } catch (error) {
      
    }
  }

  const handlertask = (event) => {
    setTask({...task, [event.target.name] : event.target.value});
  };

  const handlerKeyPress = (event) => {
    // event.preventDefault();

    if (event.key == "Enter" && task.label != "") {
    
        addTask([...taskList, task]);
        setTask({label: "", done: false});
      
    }
  };
  const handlerButtomDelete = (indexid) => setTaskList(taskList.filter((tarea , index)=> (index != indexid)))

  useEffect(()=>{
    getTask()

  }, [])
            
  return (
    <div className="container">
    <div className="row vh-100 colores">
      <div className="title d-flex justify-content-center pt-2">
        <h1>Lista de tareas</h1>
      </div>
      <div className="col-3"></div>
      <div className="col-6">
        <div className="Card" id="card">
          <div className="form-floating mb-3">
            <input
              onChange={handlertask}
              value={task.label}
              name="label"
              onKeyDown={handlerKeyPress}
              type="text"
              className="form-control  "
              id="floatingInput"
              placeholder="Tarea por hacer"
            />
            
            <label htmlFor="floatingInput">No hay tareas, añadir tareas.</label>
            <div className="task"></div>
            {taskList.map((tarea, i) => {
              return (
              <span className="d-flex justify-content-between py-2 px-3 g-tareas text-black my-1
              rounded-1 border border border-info" key={`s-${i}`}
              onMouseEnter={() => {setIsShown(i)}} onMouseLeave={() => {setIsShown(-1)}} >
                <h2 key={i}>{tarea.label}</h2> 
               
                { isShown == i &&
                <i className="fas fa-minus-circle mt-3 ms-4 position-relative me-3 " 
                key={`p-${i}`} onClick={() => {deleteTask(i)}}></i>}
              </span>);
              
            })}
          </div>
          <button className="d-flex justify-content-between py-2 px-3 g-tareas my-1
              rounded-1 border border border-info"
              onClick={() => {deleteAllTask()}} >
            Delete all
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ToDo;
