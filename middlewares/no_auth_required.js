/***
 * @todo Redirect the user to main page if token is present.
 */

import router from 'next/router'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useAuth } from '../context/auth'

export default function no_auth() {
    const {token} = useAuth()
    
    if(token){
        toast('already logged in')
        return(
            <ToastContainer position="top-right"/>
        )
    }
}
