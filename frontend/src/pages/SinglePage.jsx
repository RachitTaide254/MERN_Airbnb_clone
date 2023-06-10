import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const SinglePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState("");
  const [showAllPhotos,setShowAllPhotos] = useState(false)

  useEffect(() => {
    (async () => {
      let fedata = await axios.get(
        `${import.meta.env.VITE_SERVER_DOMAIN}/Places/${id}`
      );
      //console.log(fedata.data.data, "asd");
      var fetchData = fedata.data.data;
      setPlace(fedata.data.data);
    })();
  }, []);

  //console.log(place)

  if(showAllPhotos){
    return (
      <div className="absolute inset-0  min-h-screen bg-white ">
      <div className="p-5 grid gap-4">
      {
        place?.photos?.length > 0 && place.photos.map(p=>(
          <div>
            <img src={p}></img>
          </div>
        ))
      }
      </div>
      </div>
    )
  }

  return (
    <div className="mt-4 bg-gray-300 -mx-8 px-20 py-12">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className=" font-semibold underline"
        target="_blank"
        href={"https://google.com/maps/place/" + place.address}
      >
        {place.address}
      </a>
      <div className=" grid gap-2 grid-cols-[2fr_1fr]">
        <div>
          {place.photos?.[0] && (
            <img
              className="aspect-square object-cover"
              src={place.photos[0]}
            ></img>
          )}
        </div>
        <div className="grid relative ">
          <div>
            {place.photos?.[1] && (
              <img
                className="aspect-square object-cover"
                src={place.photos[1]}
              ></img>
            )}
          </div>
          <div className=" overflow-hidden">
            {place.photos?.[2] && (
              <img
                className="aspect-square object-cover relative top-2"
                src={place.photos[2]}
              ></img>
            )}
          <button onClick={()=>setShowAllPhotos(true)} className="absolute right-1 bottom-1 px-1 py-1 rounded bg-slate-100 ">Show more photos</button>
          </div>
        </div>
      </div>
      {/* <h1>{place.description}</h1> */}
      {/* <button className=" absolute right-14 px- py- bg-red-500">Show more photos</button> */}
    </div>
  );
};
