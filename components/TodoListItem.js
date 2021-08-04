
import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import { useAuth } from "../context/auth"

export default function TodoListItem(task) {
  const [editing, setediting] = useState(false)
  const {token} = useAuth()
  const [temp, settemp] = useState('')
  const editTask = (id) => {
    
    setediting(!editing)
  }

  const deleteTask = (id) => {
    console.log(id)
    axios.delete(`https://todo-app-csoc.herokuapp.com/todo/${id}/`,{
      headers: {
        Authorization: 'Token ' + token,
      },
    })
    .then(() => {toast('successfully deleted'),task.getTasks()})
    .catch(err => console.log(err))
  
    
  }

  const updateTask = (id) => {
    
    if(temp == ''){
      return toast('Please enter a valid edit')
    }
    axios.put(`https://todo-app-csoc.herokuapp.com/todo/${id}/`,{title:temp}, {
      headers: {
        Authorization: 'Token ' + token,
      },
    }
    )
    .then(() => {toast('editted successfully'),task.getTasks(),settemp(''),setediting(!editing)})
    .catch(err => {console.log(err),toast('Error please refresh and try again')})
  }
  var tasks = task.task
  return (
    <div key = {tasks.id}>
      <li className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'> 
      
      <div id={`done-button-${tasks.id}`}  key = {`done-button-${tasks.id}`}  className= {editing? 'dont hide':'hideme'}>
      <input
          id={`input-button-${tasks.id}`} key = {`input-button-${tasks.id}`}
          type='text'
          value={temp}
          className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input'
          placeholder='Edit The Task'
          onChange = {(e) => settemp(e.target.value)}
        />
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={() => updateTask(tasks.id)}
          >
            Done
          </button>
        </div>
        <div id={`task-${tasks.id}`} key={`task-${tasks.id}`}  className= {editing? 'hideme': 'todo-task  text-gray-600'}>
          {tasks.title}
        </div>
        <span id={`task-actions-${tasks.id}`} key={`task-actions-${tasks.id}`} className=''>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={() => editTask(tasks.id)}
            className='bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2'
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png'
              width='18px'
              height='20px'
              alt='Edit'
            />
          </button>
          <button
            type='button'
            className='bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2'
            onClick={() => deleteTask(tasks.id)} 
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg'
              width='18px'
              height='22px'
              alt='Delete'
            />
          </button>
        </span>
      </li>
    </div>
  )
}
