import React, { useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { addTask,deleteTask, fetchTask} from './Store.jsx';

const Todo = () => {
    const [task,setTask]=useState("")

   const currTask= useSelector((state)=>state.task);
    const dispatch=useDispatch()

    const handleSubmit=(e)=>{
        e.preventDefault();
         dispatch(addTask(task));
        return setTask("")
    }
    const handleDelete=(index)=>{
       return dispatch(deleteTask(index));

    }
    const handleFetchTasks=()=>{
        dispatch(fetchTask(task))
    }


  return (
    <div className='container'>
        <div className='todo-app'>
            <h1>
                <i className='fa-regular fa-pen-to-square'></i>To-do List:

            </h1>
            <div className='row'>
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" id='input-box' placeholder='Add a new task' 
                    onChange={(e)=>setTask(e.target.value)}/>
                    <button type='submit' >Add Task</button>
                </form>

            </div>
            <button onClick={handleFetchTasks}>Fetch Tasks</button>
            <ul id='list-container'>
                {
                    currTask.map((curr,index)=>{
                        return(
                            <li className='actions' key={index} >
                                {index}: {curr}
                                <button onClick={()=>handleDelete(index)}>Delete</button>
                            </li>
                        )
                    })
                }
            </ul>

        </div>

    </div>

)
}

export default Todo