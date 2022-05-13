import React from "react";
import { Outlet, Navigate } from "react-router-dom";

// here the privateRouter componenet will prevent the user from redirect to the homepage without login
// here the outlet will allow to render the homepage only, even if we close the tab and open homepage we get same homepage data else return to signup page
const PrivateRoutes = () => {
  const userInfo = localStorage.getItem("data");

  return userInfo ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
