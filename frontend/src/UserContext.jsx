import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  {
    //console.log(user, "user12");
  }
  let token = localStorage.getItem("data");
setTimeout(() => {
    if(user){
        setReady(true)
    }
}, 1000);
  useEffect(() => {
    if (!user) {
      (async () => {
        let fedata = await axios.get(
          `${import.meta.env.VITE_SERVER_DOMAIN}/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        //console.log(fedata.data.data, "asd");
        setUser(fedata.data.data);
        setReady(true);
      })();
    }
  }, []);
  //console.log(ready, "rrrrr");

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
