import React, { useEffect, useState } from "react";
import {loginStyles as styles}  from "../styles/tailwindClasses";
import {Mail , Lock ,ShieldCheck} from 'lucide-react'

import { FaArrowRight} from 'react-icons/fa';
import axios from "axios"
import OTPForm from "./OTPForm";
function Login() {
    const [formData , setFormData] = useState({
        email:"",
        password:"",
        
    });
    // console.log(formData)
    const [authStep , setAuthStep] = useState('login')
    const [error , setError] = useState('')
    const [isLoading , setIsLoading] = useState(false)
    const [loadingProgress , setLoadingProgress] = useState(0)
    const [dots , setDots] = useState("")
    
    const handleChange =(e)=>{
        const {name , value} = e.target;
         setFormData((prevData) => ({
         ...prevData,   // keep existing values
         [name]: value  // update only the changed field
  }));
        setError('');
        
    }

    useEffect(()=>{
      if(!isLoading)
      {
        setDots("")
        return;
      }

      const dotInterval = setInterval(()=>{
          setDots((prev) => prev.length <= 6 ? prev +" .":"")
      },200)
      return () => clearInterval(dotInterval)
    },[isLoading])
        useEffect(() => {
              if (authStep === 'otp') {
              alert('Login successful! OTP sent to your email.');
          }
          }, [authStep]);
          
    const onSubmit =async(e)=>{
        e.preventDefault();
        if(!formData.email || !formData.password)
        {
            setError('Please fill all fields')
            return
        }
        setIsLoading(true)
        setLoadingProgress(0)
        const progressInterval = setInterval(()=>{
            setLoadingProgress((prev)=>{
                if(prev >= 90)
                {
                  clearInterval(progressInterval)
                  return 90;
                }
                return prev + 10
            })
        },300)
        try{
          const res = await axios.post("http://localhost:5000/api/users/login",
            formData
          )
          setTimeout(() => {
            clearInterval(progressInterval)
            setLoadingProgress(100)
              setTimeout(()=>{
                  setIsLoading(false)
                  setLoadingProgress(0)
                  setAuthStep('otp')
                  
              },300)
          },400);
          
      
        } 
        catch(err){
           console.log(err.response.data.message)
           setTimeout(()=>{
               clearInterval(progressInterval)
               setLoadingProgress(100)

               setTimeout(() => {
                 setIsLoading(false)
                 setLoadingProgress(0)
                 setAuthStep('login')
                 alert(err.response.data.message)
               },300);
           },600)
          
        
    }
          
           
         
        
       
    }
  return (
  <>
  <div className="h-screen bg-linear-to-br from-slate-900 via-slate-800 to-blue-900 flex flex-col items-center justify-center">
    <ShieldCheck className="w-15 h-15 text-blue-600"/>
    <h1 className="text-white font-medium mb-10 text-3xl">DigiVault Access Portal</h1>
    { authStep === "login"?(<div className="flex flex-col items-center justify-center">
        <div className={`w-130 relative bg-slate-800/90 rounded-md p-10 shadow-2xl border border-slate-400 overflow-hidden`}>
        {isLoading && (
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-700">
              <div
                className="h-full bg-cyan-500 transition-all duration-200"
                style={{ width: `${loadingProgress}%` }}
              />
              </div>
        )}
        <h2 className="text-[25px] font-medium mb-3 text-white">Welcome Back</h2>
        <p className="text-gray-400 mb-3">Sign in to access your documentation portal</p>
        <hr className="border-gray-400 my-4"/>
        <div className="mt-3">
          <label for="usr" className={styles.labelBase}>
            Email Id
          </label>
          <div className="relative">
          <Mail className="absolute left-3 top-7 text-slate-400" />
          <input id="usr" name='email'placeholder="Enter email id"className={styles.inputField} onChange={handleChange} value={formData.email}></input>
          </div>
          <label for="pwd" className={styles.labelBase}>
            Password
          </label>
          <div className="relative ">
          <Lock className="absolute left-3 top-7 text-slate-400" />
          <input id="pwd" name='password' placeholder="Enter password" className={styles.inputField} onChange={handleChange} value={formData.password}></input>
          </div>
          {error && (
            <div className="w-full h-14 bg-red-500/10 border border-red-500/50 rounded-md p-4 mt-6">
              <p className="text-red-400">{error}</p>
            </div>
          )}
          <button disabled={isLoading} className={`w-full h-14 flex items-center justify-center gap-2 text-white mb-3 rounded-md p-2 mt-12 text-[17px] shadow-2xl mx-auto ${isLoading ? "bg-gray-600 cursor-not-allowed":" bg-indigo-800  hover:bg-amber-500 hover:text-slate-800"}`} onClick={onSubmit}>
            <span className="font-semibold">Continue to Verification</span>
            <FaArrowRight/>
          </button>
          {isLoading && (
            <div className="mt-4 flex mx-auto">
              <p className="text-slate-200 text-[18px] font-semibold block mx-auto">Authenticating{dots}</p>
            </div>
          )}
          </div>
      </div>
      </div>
    ):(<OTPForm formData={formData} onAuthChange={setAuthStep}/>)}
    </div>
    </>

  );
}

export default Login;
