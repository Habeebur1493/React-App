import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const login = async () => {
    let result = await fetch("https://reqres.in/api/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    console.log(result);

    if (result.token) {
      localStorage.setItem("user", JSON.stringify(email));
      localStorage.setItem("token", JSON.stringify(result.token));
      navigate("/Home");
      } else{
        alert("Please enter correct details")
      }
  }

  return (
      <div className="w-full h-screen flex justify-center items-center bg-amber-300 ">
        <div className="w-[50%] h-[50%] p-5 bg-gray-200 flex-col flex items-center gap-3 rounded-xl">
          <h1 className="text-4xl font semibold mt-5 mb-5">Welcome Back</h1>

          <div className="w-full flex justify-center items-center flex-col gap-3">
            <div className="w-full flex justify-center items-center p-2 rounded-xl gap-2">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="bg-gray-300 w-[60%] outline-none p-4 rounded-xl text-2xl"
              />
            </div>
            <div className="w-full flex justify-center items-center bg- gray-800 p-2 rounded-xl gap-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="bg-gray-300 w-[60%] outline-none p-4 rounded-xl text-2xl"
              />
            </div>
            <button
              onClick={login}
              className="w-[15%] p-5 bg-blue-600 text-white text-2xl rounded-xl mt-5 cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </div>
  );
};

export default Login;
