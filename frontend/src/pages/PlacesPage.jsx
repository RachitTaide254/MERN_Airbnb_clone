import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AiOutlinePlus, AiOutlineWifi } from "react-icons/ai";
import { MdPets } from "react-icons/md";
import { LuParkingCircle } from "react-icons/lu";
import { MdRadio } from "react-icons/md";
import {ImagetoBase64} from "../utility/ImagetoBase64"
import axios from "axios";
import { AllPlaces } from "./AllPlaces";

export const PlacesPage = () => {
  const { action } = useParams();
  //console.log(action,'action')
  const{id} = useParams()
  console.log(id,'vb')
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [extraInfo, setExtraInfo] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [perks, setPerks] = useState([]);
  const [redirect, setRedirect] = useState(false)


  const uploadImage =async(e)=>{
    //console.log(e)
    const data = await ImagetoBase64(e.target.files[0]);
    //console.log(data)
    setAddedPhotos((prev) => {
      return [
        ...prev,
         data,
      ];
    });
  }
  
  //console.log(addedPhotos)

  const handlePerks = async(e)=>{
    const {checked,name} = e.target;
    //console.log(name,checked)
    if(checked){
      setPerks((prev)=>{
        return[...prev,name]
      })
    }else{
      setPerks((prev)=>{
        return[...prev.filter(s=>s !== name)]
      })
    }
  }

  const addNewPlace = async(e)=>{
    e.preventDefault();
    const {data} = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/places`,{
      title,address,addedPhotos,description,perks,
      extraInfo,checkIn,checkOut,maxGuests
    })
    // console.log(data)
    if(data.alert){
      setTimeout(() => {
        setRedirect(true)
      }, 1000);
    }else{
      alert('Add place again')
    }
  }
 
      if(redirect){
      return <Navigate to={'/account'} />
      }

  return (
    <div>
      {action !== "new" ? (
        <div className="text-center">
        
          <Link
            className="bg-pink-500 inline-flex mt-2 gap-2 text-white rounded-full py-2 px-6"
            to={"/account/places/new"}
          >
            {/* {" "} */}
            <AiOutlinePlus className="mt-1 text-lg" /> Add new place
          </Link>

          <AllPlaces/>
        </div>
      ) : (
        <div className="flex justify-center">
          <form className="form w-3/5 px-10 py-3 mt-4 mb-40 flex flex-col" onSubmit={addNewPlace}>
            <label className="text-xl mt-4">Titles</label>
            <input
              type="text"
              value={title}
              className=" rounded-full border p-2 mt-2 px-3 outline-pink-500"
              placeholder="Title, for example: My beautiful home"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <label className="text-xl mt-4">Address</label>
            <input
              type="text"
              value={address}
              className=" rounded-full border p-2 px-3 mt-2 outline-pink-500"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <label className="text-xl mt-4">photos</label>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
             {addedPhotos?.length > 0 && addedPhotos?.map((link,i)=>(
              <div key={i}><img className="border mt-2 h-28 bg-transparent rounded-2xl  text-4xl outline-pink-500" src={link} key={i}></img>
              </div>
             ))}
             <label   className="border mt-2 bg-transparent rounded-3xl p-8 text-4xl outline-pink-500">
              <div className="flex justify-center cursor-pointer">+</div>
              <input type="file" accept="image/*" onChange={uploadImage} className="hidden"></input> 
              </label>
            </div>
            <label className="text-xl mt-4">Description</label>
            <input
              type="text"
              value={description}
              className=" rounded-full border p-2 px-3 mt-2 outline-pink-500"
              placeholder="Description about the place"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="text-xl mt-4">Perks</label>
            <p>Select perks of your place </p>
            <div className="grid mt-3 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <label className="flex gap-1">
                <input
                  type="checkbox"
                  name='wifi'
                  onChange={handlePerks}
                ></input>
                <div className="flex items-center">
                  <AiOutlineWifi className="flex items-center" />
                </div>{" "}
                WiFi
              </label>
              <label className="flex gap-1">
                <input
                  type="checkbox"
                  name='pets'
                  onChange={handlePerks}
                ></input>
                <div className="flex items-center">
                  <MdPets className="flex items-center" />
                </div>{" "}
                Pets
              </label>
              <label className="flex gap-1">
                <input
                  type="checkbox"
                  name='parking'
                  onChange={handlePerks}
                ></input>
                <div className="flex items-center">
                  <LuParkingCircle className="flex items-center" />
                </div>{" "}
                Parking
              </label>
              <label className="flex gap-1">
                <input
                  type="checkbox"
                  name='tv'
                  onChange={handlePerks}
                ></input>
                <div className="flex items-center">
                  <MdRadio className="flex items-center" />
                </div>{" "}
                TV
              </label>
            </div>
            <label className="text-xl mt-4">Extra info</label>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              className=" rounded-2xl border p-2 px-3 mt-2 outline-pink-500"
              placeholder="Extra info about the place"
            />
            <div className="grid mt-2 gap-2 sm:grid-cols-3">
              <div className="">
                <h3 className="mt-2 -mb-1">Check-in time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="rounded-full border p-2 px-3 mt-2 outline-pink-500"
                  placeholder="14:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check-out time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="rounded-full border p-2 px-3 mt-2 outline-pink-500"
                  placeholder="14:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max Guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  className="rounded-full border p-2 px-3 mt-2 outline-pink-500"
                  placeholder="4"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button className="rounded-full w-3/5 text-xl  border p-2 px-3 mt-6 bg-pink-500">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
