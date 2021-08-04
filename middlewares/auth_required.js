
 import { useEffect} from 'react';
 import { useAuth } from '../context/auth';
 import { useRouter } from 'next/router';
 
 export default function authReq(){
     const {token} = useAuth();
     const router = useRouter()
         if(!token){
            router.push('/login')
         }
 } 
 
