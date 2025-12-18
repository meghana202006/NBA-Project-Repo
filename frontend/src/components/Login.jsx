import React, { useState } from "react";
import {loginStyles as styles}  from "../styles/tailwindClasses";
import {FiMail} from "react-icons/fi"
import {FaLock} from "react-icons/fa"
import { FaShieldAlt } from 'react-icons/fa';
function Login() {
    const [formData , setFormData] = useState({
        email:"",
        password:"",
        
    });
    const handleChange =(e)=>{
        const {name , value} = e.target;
         setFormData((prevData) => ({
         ...prevData,   // keep existing values
         [name]: value  // update only the changed field
  }));
    }
    const onSubmit =(e)=>{
        e.preventDefault();
        const userData = formData;
        setFormData({email:"",password:""})
        console.log(formData)
    }
  return (
    <div className="h-screen bg-linear-to-br from-slate-900 via-slate-800 to-blue-900 flex flex-col items-center justify-center">
      <h1 className="text-white font-medium mb-10 text-3xl">DigiVault Access Portal</h1>
      <div className="w-125 bg-slate-800 rounded-md p-10 shadow-2xl border border-slate-400">
        <h2 className="text-[25px] font-medium mb-3 text-white">Welcome Back</h2>
        <p className="text-gray-400 mb-3">Sign in to access your documentation portal</p>
        <hr className="border-gray-400 my-4"/>
        <div className="mt-3">
          <label for="usr" className={styles.labelBase}>
            Email Id
          </label>
          <div className="relative">
          <FiMail className="absolute left-3 top-7 text-gray-400" />
          <input id="usr" name='email'placeholder="Enter email id"className={styles.inputField} onChange={handleChange} value={formData.email}></input>
          </div>
          <label for="pwd" className={styles.labelBase}>
            Password
          </label>
          <div className="relative ">
          <FaLock className="absolute left-3 top-7 text-gray-400" />
          <input id="pwd" name='password' placeholder="Enter password" className={styles.inputField} onChange={handleChange} value={formData.password}></input>
          </div>
          <button className="w-32 h-12 bg-indigo-800 text-white rounded-2xl mt-12 text-[17px] hover:bg-amber-500 shadow-2xl block mx-auto " onClick={onSubmit}>Sign in</button>
          </div>
      </div>
    </div>
  );
}

export default Login;
