import React from 'react'
import {createStore,applyMiddleware} from "redux"
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';


const ADD_TASK='task/add'
const DELETE_TASK='task/delete'
const FETCH_TASK='task/fetch'
export const addTask=(data)=>{
    return   {type:ADD_TASK,payload:data}
  
  }
 export const deleteTask=(id)=>{
    return   {type:DELETE_TASK,payload:id}
  
  }
  export const fetchTask=()=>{
    //redux thunk
      return async(dispatch)=>{

        try {
            const res=await fetch(
                // "https://dummyjson.com/todos"
                "https://jsonplaceholder.typicode.com/todos?_limit=3"
            );
            const task=await res.json();
            if (Array.isArray(task)) { // Check if task is an array
                dispatch({ type: FETCH_TASK, payload: task.map((curr) => curr.title) });
              } else {
                console.error('Expected an array, but got:', task);
              }
                } catch (error) {
            console.log(error);
            
        }
      }  }
const initialState={
         task:[],
 }
const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                task: [...state.task,action.payload]
            }

        case DELETE_TASK:
            const updateTask = state.task.filter((_, index) => index !== action.payload)
            return {
                ...state,
                task: updateTask
            }

        case FETCH_TASK:
            return {
                ...state,
                task:[...state.task,...action.payload]
            }

        default:
            return state
    }
}

export const store=createStore(taskReducer,composeWithDevTools(applyMiddleware(thunk)))
console.log('initial state',store.getState());

// store.dispatch({type:ADD_TASK,payload:"Buy ak-1"})
// console.log('after first update state',store.getState());
// store.dispatch({type:ADD_TASK,payload:"Buy ak-2"})
// console.log('after second update state',store.getState());
// store.dispatch({type:ADD_TASK,payload:"Buy ak-3"})
// console.log('after third update state',store.getState());

// store.dispatch({type:DELETE_TASK,payload:1})
// console.log('after delete update state',store.getState());


store.dispatch(addTask("Buy ak-1"))
console.log('after first update state',store.getState());
store.dispatch(addTask("Buy ak-2"))
console.log('after second update state',store.getState());

store.dispatch(deleteTask(1))
console.log('after delete update state',store.getState());



export default taskReducer