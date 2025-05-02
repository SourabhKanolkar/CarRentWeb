import React from 'react'
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");
   const navigate = useNavigate();

   const handelLogin= async(e)=>{
    e.preventDefault()
      try{
        await signInWithEmailAndPassword(auth,email,password);
        navigate("/home")
         
      }catch(err){
        alert("Invalid Email/Password");
        console.log(err.message);
      }
   }
  return (
    <>
     
     <section id='login-page'>
      <div className="container">
        <h2 className='text-center'> LOGIN</h2>
        <div className="row">
            <div className="col-md-12">
            <form onSubmit={handelLogin}>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
 
  <button type="submit" className="btn btn-primary">Login</button>
  <Link to={"/Register"}>SignUp</Link>
</form>
            </div>
        </div>
      </div>

     </section>
    
    </>
  )
}

