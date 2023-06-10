import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import { PlacesPage } from "./PlacesPage";
import { AiOutlineUser } from "react-icons/ai";
import { TbBrandBooking } from "react-icons/tb";
import { BsFillHouseDoorFill } from "react-icons/bs";


export const AccountPage = () => {
  const [redirect, setRedirect] = useState(false)
  let { subpage } = useParams();
  const { user, ready, setUser } = useContext(UserContext);

 // console.log(ready,'ready')
  //console.log(user,'user')

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  if (!ready) {
    return <h1>Loading....</h1>;
  }

  //console.log(subpage);
  if(subpage === undefined){
    subpage = 'profile'
  }

  function linkClasses(type = null) {
    let classes = "py-2 inline-flex gap-1 px-6 rounded-full";
    if (type === subpage) {
      classes += " bg-pink-500 text-white ";
    }else{
      classes += " bg-slate-200"
    }
    return classes;
  }
  
  function logout(){
   localStorage.setItem('data',' ');
   localStorage.setItem('id',' ');
   setRedirect(true)
   setUser(' ')
  }

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <div>
      AccountPage of {user?.email}
      <nav className="w-full flex justify-center mt-8 mb-8 gap-4">
        <Link
          className={linkClasses('profile')}
          to={"/account"}
        >
          <AiOutlineUser className="mt-1 text-lg"/>
          My Profile
        </Link>
        <Link
          className={linkClasses('bookings')}
          to={"/account/bookings"}
        >
          <TbBrandBooking className="mt-1 text-lg"/>
          My Bookings
        </Link>
        <Link
          className={linkClasses('places')}
          to={"/account/places"}
        >
          <BsFillHouseDoorFill className="mt-1 text-lg"/>
          My Accomodations
        </Link>
      </nav>
      {subpage === 'profile' && 
      (<div className="flex flex-col text-center max-w-lg mx-auto"> Logged in as {user?.email} 
      <div className="flex justify-center mt-4"onClick={logout}>
        <button className=" bg-pink-500 rounded-full w-40  p-2" > Logout</button></div> 
      </div> )}
      {
        subpage === 'places' && 
        (<PlacesPage />)
      }
    </div>
  );
};
