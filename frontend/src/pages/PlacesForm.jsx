import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AiOutlinePlus, AiOutlineWifi, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdPets } from "react-icons/md";
import { LuParkingCircle } from "react-icons/lu";
import { MdRadio,MdDelete } from "react-icons/md";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import axios from "axios";

export const PlacesForm = () => {
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
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(100);



  const{id} = useParams()
  //console.log(id,'id')

  if(id){
  useEffect(()=>{
    (async () => {
      let fedata = await axios.get(
        `${import.meta.env.VITE_SERVER_DOMAIN}/Places/${id}`,
      );
      //console.log(fedata.data.data.photos, "asd");
      var fetchData = fedata.data.data;
      //setPlaces(fedata.data.data);
      setTitle(fetchData.title)
      setAddress(fetchData.address)
      setAddedPhotos(fetchData.photos)
      setDescription(fetchData.description)
      setExtraInfo(fetchData.extraInfo)
      setCheckIn(fetchData.checkIn)
      setCheckOut(fetchData.checkOut)
      setMaxGuests(fetchData.maxGuests)
      setPerks(fetchData.perks)
      setPrice(fetchData.price)
    })();
  },[id])
}

  const uploadImage = async (e) => {
    //console.log(e)
    const data = await ImagetoBase64(e.target.files[0]);
    //console.log(data)
    setAddedPhotos((prev) => {
      return [...prev, data];
    });
  };

  const handlePerks = async (e) => {
    const { checked, name } = e.target;
    //console.log(name,checked)
    if (checked) {
      setPerks((prev) => {
        return [...prev, name];
      });
    } else {
      setPerks((prev) => {
        return [...prev.filter((s) => s !== name)];
      });
    }
  };

  const removePhoto = async (e,link)=> {
  
  e.preventDefault();
  var newPhotoArr = addedPhotos.filter(p=>p !== link)
  //console.log(newPhotoArr,'wer')
  setAddedPhotos(newPhotoArr)
  }

  const mainPhoto = async (e,link) =>{
  
  e.preventDefault();
  var newarr = addedPhotos.filter(p=>p !== link)
  setAddedPhotos([link,...newarr])
  
  }
  const addNewPlace = async (e) => {
    e.preventDefault();

    if(id){
      var { data } = await axios.put(
        `${import.meta.env.VITE_SERVER_DOMAIN}/places/${id}`,
        {
          title,
          address,
          addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price
        }
      );
    }else{
      var { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/places`,
        {
          title,
          address,
          addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price
        }
      );
    }
    
    // console.log(data)
    if (data.alert) {
      setTimeout(() => {
        setRedirect(true);
      }, 1000);
    } else {
      alert("Add place again");
    }
  };

  if(redirect){
    return <Navigate to={'/account/places'} />
    }

  return (
    <div className="flex justify-center">
      <form
        className="form w-3/5 px-10 py-3 mt-4 mb-40 flex flex-col"
        onSubmit={addNewPlace}
      >
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
        {/* <div className="flex gap-2">
      <input
        type="text"
        //value={addedPhotos}
        className=" w-3/4 rounded-full border p-2 px-3  mt-2 outline-pink-500"
        placeholder="Add photo using link"
        
      ></input>
      <button onClick={(e) => setAddedPhotos(e.target.value)} className="rounded-2xl  p-2 mt-2 bg-slate-300">
        Add Photo
      </button>
    </div> */}
        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {addedPhotos?.length > 0 &&
            addedPhotos?.map((link, i) => (
              <div className="h-32 flex relative" key={i}>
                <img
                  className="border mt-2 h-28 bg-transparent rounded-2xl  text-4xl outline-pink-500"
                  src={link}
                  key={i}
                ></img>
                <button onClick={e=>removePhoto(e,link)} className="absolute cursor-pointer bottom-4 bg-white bg-opacity-50 rounded-3xl right-2">
                  <MdDelete/>
                </button>
                { link === addedPhotos[0]?
                  <button  className="absolute  top-4 bg-white bg-opacity-50 rounded-3xl right-2">
                  <AiFillStar/>
                </button>:
                <button onClick={e=>mainPhoto(e,link)}  className="absolute cursor-pointer top-4 bg-white bg-opacity-50 rounded-3xl right-2">
                <AiOutlineStar/>
              </button>
                }
              </div>
            ))}
          <label className="border mt-2 bg-transparent rounded-3xl p-8 text-4xl outline-pink-500">
            <div className="flex justify-center cursor-pointer">+</div>
            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="hidden"
            ></input>
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
            <input type="checkbox" checked={perks.includes('wifi')} name="wifi" onChange={handlePerks}></input>
            <div className="flex items-center">
              <AiOutlineWifi className="flex items-center" />
            </div>{" "}
            WiFi
          </label>
          <label className="flex gap-1">
            <input type="checkbox" checked={perks.includes('pets')} name="pets" onChange={handlePerks}></input>
            <div className="flex items-center">
              <MdPets className="flex items-center" />
            </div>{" "}
            Pets
          </label>
          <label className="flex gap-1">
            <input
              type="checkbox"
              checked={perks.includes('parking')}
              name="parking"
              onChange={handlePerks}
            ></input>
            <div className="flex items-center">
              <LuParkingCircle className="flex items-center" />
            </div>{" "}
            Parking
          </label>
          <label className="flex gap-1">
            <input type="checkbox" checked={perks.includes('tv')} name="tv" onChange={handlePerks}></input>
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
        <div className="grid mt-2 gap-4 sm:grid-cols-4">
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
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-full border p-2 px-3 mt-2 outline-pink-500"
              placeholder="100"
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
  );
};
