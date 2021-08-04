import axios from "axios";
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../context/auth";
import Home from "../pages";

export default function AddTask(props) {
  const [task, settask] = useState('')
  const {token} = useAuth()

  const addTask = () => {
    
    if(task == ''){
      return toast('Please enter a valid task')
    }
    axios.post('https://todo-app-csoc.herokuapp.com/todo/create/',{title:task}, {  
      headers: {
        Authorization: "Token " + token,
      },
    })
    .then(() => {settask('') , toast('successfully added the task'),props.getTasks()})
    .catch(err => {console.log(err),toast('some error occured please refresh and try again')})
  }
  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        value={task}
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        onChange = {((e) => settask(e.target.value))}
      />
      <button
        type='button'
        className='todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'
        onClick={addTask}
      >
        Add Task
      </button>
      <ToastContainer></ToastContainer>
    </div>
  )
}
