import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Sellerroutes() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.roleName === "ROLE_SELLER" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default Sellerroutes;
