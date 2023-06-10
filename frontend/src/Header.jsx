import React from 'react'
import { MdDoubleArrow } from "react-icons/md";
import { BiSearchAlt,BiUser } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';

export const Header = () => {
  const {user} = useContext(UserContext)
  //console.log(user,'aaas')
  

  return (
    <div><header className="flex  justify-between pr-2">
    <Link to={'/'}>
    <div className="flex items-center p-2 gap-2">
     <MdDoubleArrow className="w-8 h-8" />
      <span className="font-bold">airbnb</span>
    </div>
    </Link>
    <div className="flex border  border-gray-400 rounded-full shadow-lg gap-4 p-4">
    <div>Anywher</div>
    <div className="border-l border-gray-300"></div>
    <div>Anyweek</div>
    <div className="border-l border-gray-300"></div>
    <div className=" text-gray-400">Add guests</div>
    <button className=" bg-pink-400 text-white rounded-full p-2">
      <BiSearchAlt />
    </button>
    </div>
    {user?.email?<Link to={'/account'}>
    <div className="flex border border-gray-400 rounded-full shadow-lg gap-2 p-2">
      {/* <GiHamburgerMenu/>  */}
      <div className="rounded-full">
      {/* <BiUser/> */}
      </div>
      <div className=''>{user.email.split(' ')[0]}</div>
    </div>
    </Link>:<Link to={'/login'}>
    <div className="flex  border border-gray-400 rounded-full shadow-lg gap-2 mb-4 px-4 py-4">
      <GiHamburgerMenu/> 
      <div className="rounded-full">
      <BiUser/>
      </div>
    </div>
    </Link>}
    {/* <Link to={'/login'}>
    <div className="flex  border border-gray-400 rounded-full shadow-lg gap-2 mb-4 px-4 py-4">
      <GiHamburgerMenu/> 
      <div className="rounded-full">
      <BiUser/>
      </div>
    </div>
    </Link> */}
  </header></div>
  )
}
