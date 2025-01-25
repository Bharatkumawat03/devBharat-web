import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser, selectIsLoggedIn } from "../utils/userSlice";
import Sidebar from "./SideBar";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
   const isLoggedIn = useSelector(selectIsLoggedIn);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="min-h-screen flex ">
        {/* <div className="hidden lg:block w-1/5 "> */}
        <div className={`hidden w-1/5 ${isLoggedIn ? 'lg:block' : 'hidden'}`}>
        <Sidebar />
        </div>
        <div className={`w-screen ${isLoggedIn ? 'lg:w-4/5' : 'w-screen'}`}>
        <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Body;
