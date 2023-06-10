import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
//import{MdDoubleArrow} from '/react-icons/md'

import { IndexPage } from "./pages/IndexPage";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Layout } from "./Layout";
import { Register } from "./pages/Register";
import { UserContextProvider } from "./UserContext";
import { AccountPage } from "./pages/AccountPage";
import { AllPlaces } from "./pages/AllPlaces";
import { PlacesPage } from "./pages/PlacesPage";
import { PlacesForm } from "./pages/PlacesForm";
import { SinglePage } from "./pages/SinglePage";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<AccountPage />} />
            {/* <Route path="/account/:subpage?" element={<AccountPage />} />
            <Route path="/account/:subpage/:action?" element={<AccountPage />} /> */}
            {/* <Route path="/account/places/:id" element={<PlacesPage/>} /> */}
            <Route path="/account/places" element={<PlacesPage />} />
            <Route path="/account/places/new" element={<PlacesForm />} />
            <Route path="/account/places/:id" element={<PlacesForm />} />
          <Route path="/place/:id" element={<SinglePage />} />
          {/* <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} /> */}

          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
