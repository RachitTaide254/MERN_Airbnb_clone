import React, { useContext, useEffect, useState } from "react";
import { MdDoubleArrow } from "react-icons/md";
import { BiSearchAlt, BiUser } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Header } from "../Header";
import { UserContext } from "../UserContext";
import axios from "axios";

export const IndexPage = () => {
  const { user, ready } = useContext(UserContext);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    (async () => {
      let fedata = await axios.get(
        `${import.meta.env.VITE_SERVER_DOMAIN}/allPlaces`
      );
      //console.log(fedata.data.data, "asd");
      setPlaces(fedata.data.data);
      //setReady(true);
    })();
  }, []);


  return (
    <div className="mt-8 px-4 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {places.length > 0 && places.map((p, i) => 
      <Link to={`/place/${p._id}`} key={i}>
      <div className="" >
        <div className="">
        {p.photos?.[0] && ( 
          <img className="rounded-2xl mb-2 object-cover aspect-square" src={p.photos[0]} />
        )}
       
        </div>
        <h3 className="text-sm text-gray-500">{p.title}</h3>
        <h2 className="font-bold ">{p.address}</h2>
        <div className="mt-1">
         <span className="font-bold"> ${p.price} </span>per night
        </div>
      </div>
      </Link>
      )}
    </div>
  );
};
