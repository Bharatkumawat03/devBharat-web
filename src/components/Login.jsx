import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId,setEmailId] = useState("test@gmail.com");
  const [password,setPassword] = useState("Testt@77");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login",{
        emailId,
        password
      },{withCredentials:true});
      dispatch(addUser(res.data));
      return navigate('/feed');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                placeholder="abc@mail.com"
                value={emailId}
                onChange={(e)=>setEmailId(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                placeholder="Qwerty@123"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="card-actions justify-end">
            <button onClick={handleLogin} className="btn btn-primary" >Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
