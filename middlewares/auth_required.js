
import { useRouter } from 'next/router';
import { useEffect} from 'react';
 import { useAuth } from '../context/auth';
 
 export default function authReq(){
    const {token} = useAuth();
    if(!token){
    return true
    }
 } 
 
