import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  var data = {
    email:email,
    password:password
  }

  const {setUser} = useContext(UserContext);

  const handlelogin = async (e)=>{
    e.preventDefault();
    
    const fetchData = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/login`,
      data
    );
    console.log(fetchData.data.data,'oko')
    //alert(fetchData.data.message)
    setUser(fetchData.data.data)
    localStorage.setItem('data',fetchData.data.data.token);
    localStorage.setItem('id',fetchData.data.data.email);
    if(fetchData.data.data){
      setRedirect(true)
    }else{
      alert('email id is not correct')
    }

  } 
  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <div className="flex flex-grow justify-center">
      <div className="box-border justify-center h-86 w-2/6 px-4 mt-4 rounded-lg ">
        <div className="text-center text-5xl mt-2">Login</div>
        <form className="form  py-3 mt-4 flex flex-col" onSubmit={handlelogin}>
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type={"email"}
            name="email"
            className="mb-2 mt-2 w-full bg-slate-200 px-2 py-1 rounded-full focus-within:outline-blue-300"
            id="email"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <label htmlFor="password" className="">
            Password
          </label>
          {/* <div className="flex -px-2 bg-slate-200 py-1 mb-2 mt-1"> */}
            <input
              type={"password"}
              name="password"
              className=" w-full mb-2 mt-2  bg-slate-200 px-2 py-1 rounded-full  focus-within:outline-blue-300"
              id="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          {/* </div> */}

          <button
            type="submit"
            className="max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            submit
          </button>
          <div className="text-gray-700 mt-3">Don't have an account ? <Link to={'/register'} className=" underline">  Register</Link></div>
        </form>
      </div>
    </div>
  );
};
