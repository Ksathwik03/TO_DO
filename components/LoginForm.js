import axios from "axios"
import router from "next/router";
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../context/auth";
import no_auth from "../middlewares/no_auth_required";


export default function RegisterForm() {
  const { setToken } = useAuth()
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const login = () => {
    axios.post('https://todo-app-csoc.herokuapp.com/auth/login/',{username: username, password:password})
    .then(res =>  { setToken(res.data.token)
      toast('Succesfully logged in')})
    .catch(err => {toast('Wrong username or password'),console.log(err)})
    
  }

  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Login</h1>
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputUsername'
            id='inputUsername'
            placeholder='Username'
            onChange = {(e) => setusername(e.target.value)}
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
            onChange = {(e) => setpassword(e.target.value)}
          />

          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1'
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
      <ToastContainer />

    </div>
  )
}
