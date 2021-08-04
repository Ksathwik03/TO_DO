import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import Auth_required from '../middlewares/auth_required'
import { useRouter } from 'next/router'
import authReq from '../middlewares/auth_required'


export default function Home() {

  const router = useRouter()
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setloading] = useState(false) 
  
  

  function getTasks() {
    if(!token){
      setTasks([])
      return
    }
    setloading(true)
    axios.get('https://todo-app-csoc.herokuapp.com/todo', {
      headers: {
        Authorization: 'Token ' + token,
      },
    })
    .then(res => {setTasks(res.data),console.log(res),setloading(false)})
  }
  
  useEffect(() => {
    if(!token){
      router.push('/login')
    }
    getTasks()
  }, [])

 

  return (
    <div>
      <center>
        <AddTask getTasks = {getTasks}/>
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          {tasks.map(task => 
          <div key = {task.id}>
           <TodoListItem task={task}
           getTasks = {getTasks}
           id = {task.id}/>
           </div>)}
        </ul>
      </center>
    </div>
  )
}
