import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export const AllPlaces = () => {

    const [places,setPlaces] = useState([])

    let token = localStorage.getItem("data");

    useEffect(()=>{
        (async () => {
            let fedata = await axios.get(
              `${import.meta.env.VITE_SERVER_DOMAIN}/allPlaces`,
               
            );
           // console.log(fedata.data.data, "asd");
            setPlaces(fedata.data.data);
            //setReady(true);
          })();
    },[])
   
  return (
    <div className='flex flex-col '>
        {places.length>0 && places.map((p,i)=>
        (
            // <div className='mt-4 flex justify-center  w-4/5 '>
            // <h1>{p._id}</h1>
            // <div className='flex  cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl'>
            //     {/* {p.photos[0]} */}
            //     <div className='w-32 h-32'>
            //     <img className='' src={p.photos[0]}/>
            //     </div>
            //     </div>

            //     <div className="grow-0 shrink">
            //     <h2 className="text-xl">{p.title}</h2>
            //     <p className="text-sm mt-2">{p.description}</p>
            //   </div>    
            // </div>
            <div className="container m-4 px-20 py-5  " key={i}>
        <div className="box-border bg-slate-300 flex-grow h-full w-full p-4 border-4">
          <img
            className="float-left h-24 w-68 rounded-lg p-1 "
            src={p.photos[0]}
          ></img>
          <Link to={`/account/places/${p._id}`}>
            <p className="font-bold text-2xl">{p.title}</p>
          </Link>
          <div className="text-sm flex gap-4">
            <div className=" text-fuchsia-700 ">{p.description}</div>
          </div>
        </div>
      </div>
        
        )
        )}
    </div>
  )
}
