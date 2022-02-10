import React, { useEffect, useState } from "react";
import useAuth from "../useAuth";
import { useNavigate } from "react-router-dom";

export default function Callback() {
  const code = new URLSearchParams(window.location.search).get("code");
  console.log("code is", code);
  const navigate = useNavigate();
  //const accessToken = useAuth(code);
  useEffect(() => {
    //localStorage.setItem("accessToken", accessToken);
    navigate("/dashboard", { state: { code: code } });
  }, []);

  return <div></div>;
}
