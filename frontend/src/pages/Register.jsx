import React, { useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

export const Register = () => {
    const [firstname, setFirstname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  console.log(firstname,email,password)
  var data = {
    firstname:firstname,
    email:email,
    password:password
  }
  const handleregister = async (e)=>{
    e.preventDefault()
    
    const fetchData = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/register`,
      data
    );
    console.log(fetchData,'oko')
    alert(fetchData.data.message)
  } 
  return (
    <div className="flex flex-grow justify-center">
      <div className="box-border justify-center h-86 w-2/6 px-4 mt-4 border-4 rounded-lg bg-red-300">
        <div className="text-center text-4xl mt-2">Register</div>
        <form className="form py-3 mt-4 flex flex-col" onSubmit={handleregister}>
          
        <label htmlFor="firstName" className="">
        firstName
          </label>
          <input
            type={"firstName"}
            name="firstName"
            className="mb-2 mt-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            id="firstName"
            onChange={(e)=>setFirstname(e.target.value)}

          />

          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type={"email"}
            name="email"
            className="mb-2 mt-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            id="email"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <label htmlFor="password" className="mt-2">
            Password
          </label>
          <div className="flex -px-2 bg-slate-200 py-1 mb-2 mt-1 rounded">
            <input
              type={"password"}
              name="password"
              className=" w-full  bg-slate-200 border-none outline-none focus-within:outline-blue-300"
              id="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            submit
          </button>
          <div className="text-gray-700">Already have an account ? <Link to={'/login'} className=" underline">  Login</Link></div>
        </form>
      </div>
    </div>
  )
}
